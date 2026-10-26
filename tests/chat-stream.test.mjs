import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { fetchChat } from '../api/chat.ts';
import { sendChatMessage } from '../src/services/chatService.ts';
import { readSseData } from '../src/lib/sse.ts';
import { buildAssistantContext } from '../src/data/ibrahimKnowledge.ts';

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });
const config = { OPENROUTER_API_KEY: 'server-test-key', OPENROUTER_MODEL: 'nvidia/nemotron-3.5-super-vl:free' };
const encoder = new TextEncoder();
const event = data => `data: ${JSON.stringify(data)}\r\n\r\n`;
const delta = text => event({ choices: [{ delta: { content: text } }] });
const responseFor = stream => new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } });
const post = body => new Request('https://portfolio.example/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const textStream = text => new ReadableStream({ start(c) { c.enqueue(encoder.encode(text)); c.close(); } });
const wire = upstream => { globalThis.fetch = (url, options) => url === '/api/chat'
  ? fetchChat(post(JSON.parse(options.body)), config) : upstream(url, options); };

test('visible Arabic text travels from provider through API to client before generation finishes', { timeout: 5000 }, async () => {
  let source;
  const upstream = new ReadableStream({ start(c) { source = c; } });
  let payload;
  wire(async (url, options) => {
    assert.equal(url, 'https://openrouter.ai/api/v1/chat/completions');
    payload = JSON.parse(options.body);
    return responseFor(upstream);
  });
  let firstText;
  const first = new Promise(resolve => { firstText = resolve; });
  const updates = [];
  let finished = false;
  const answer = sendChatMessage('عرفني على إبراهيم', [], undefined, text => { updates.push(text); firstText(); })
    .then(result => { finished = true; return result; });
  // Split every UTF-8 byte, include CRLF/comments and non-visible reasoning.
  const beginning = ': heartbeat\r\n\r\n' + event({ choices: [{ delta: { reasoning: 'must-not-leak' } }] }) + delta('أهلاً ');
  for (const byte of encoder.encode(beginning)) source.enqueue(Uint8Array.of(byte));
  await first;
  assert.equal(finished, false);
  assert.equal(updates[0], 'أهلاً');
  assert.equal(payload.stream, true);
  assert.deepEqual(payload.provider, { sort: 'latency' });
  assert.deepEqual(payload.reasoning, { enabled: false });
  source.enqueue(encoder.encode(delta('**إبراهيم**\nhttps://example.com/project') + event({ choices: [{ delta: {}, finish_reason: 'stop' }] }) + 'data: [DONE]\r\n\r\n'));
  source.close();
  const result = await answer;
  assert.equal(result.text, 'أهلاً **إبراهيم**\nhttps://example.com/project');
  assert.equal(result.isLive, true);
  assert.doesNotMatch(JSON.stringify(updates), /must-not-leak/);
});

test('errors, truncated or empty streams cannot become successful AI answers', async () => {
  for (const raw of [
    delta('Partial answer'),
    'data: [DONE]\n\n',
    delta('Partial answer') + event({ error: { message: 'provider-secret-sentinel' } }),
    'data: invalid JSON\n\n',
  ]) {
    wire(async () => responseFor(textStream(raw)));
    await assert.rejects(sendChatMessage('Hello'), error => !error.message.includes('provider-secret-sentinel'));
  }
});

test('transient OpenRouter rejections use bounded retries before any answer text is delivered', async () => {
  let calls = 0;
  wire(async () => ++calls === 1 ? new Response('Busy', { status: 502 })
    : responseFor(textStream(delta('Recovered answer') + 'data: [DONE]\n\n')));
  assert.equal((await sendChatMessage('Hello')).text, 'Recovered answer');
  assert.equal(calls, 2);
  calls = 0;
  wire(async () => { calls++; return new Response('Busy', { status: 503 }); });
  await assert.rejects(sendChatMessage('Hello'));
  assert.equal(calls, 4, 'Busy providers must not cause an unbounded retry loop');
});

test('cancelling an in-flight stream stops the provider and releases the reader', { timeout: 5000 }, async () => {
  let source, providerSignal, cancelled = false;
  const upstream = new ReadableStream({ start(c) { source = c; }, cancel() { cancelled = true; } });
  wire(async (_, options) => { providerSignal = options.signal; return responseFor(upstream); });
  const controller = new AbortController();
  let firstText;
  const first = new Promise(resolve => { firstText = resolve; });
  // Include the same client signal on the API Request, as the HTTP runtime does.
  const clientFetch = globalThis.fetch;
  globalThis.fetch = (url, options) => url === '/api/chat'
    ? fetchChat(new Request('https://portfolio.example/api/chat', options), config) : clientFetch(url, options);
  const answer = sendChatMessage('Hello', [], controller.signal, () => firstText());
  const rejected = assert.rejects(answer);
  source.enqueue(encoder.encode(delta('First text')));
  await first;
  controller.abort();
  await rejected;
  assert.equal(providerSignal.aborted, true);
  assert.equal(cancelled, true);
});

test('SSE decoder handles multiline events and rejects oversized pending frames', async () => {
  const values = [];
  for await (const value of readSseData(textStream(': ping\r\ndata: {"type":\r\ndata: "done"}\r\n\r\n'))) values.push(JSON.parse(value));
  assert.deepEqual(values, [{ type: 'done' }]);
  await assert.rejects(async () => { for await (const value of readSseData(textStream('data: ' + 'x'.repeat(65000)))) void value; }, /too large/);
});

test('compact context retains profile facts, named project evidence, and upstream attribution', () => {
  const query = 'What university does Ibrahim attend and what is his GPA?';
  const full = buildAssistantContext(query);
  const compact = buildAssistantContext(query, [], true);
  assert.ok(compact.length < full.length / 2);
  assert.match(compact, /MTI University/);
  assert.match(compact, /3\.5/);
  assert.equal(JSON.parse(compact).repositoryCounts.total, 60);
  const project = JSON.parse(buildAssistantContext('Tell me about OpenClaw', [], true)).relevantProjects[0];
  assert.equal(project.sourceKind, 'fork');
  assert.match(project.upstreamUrl, /^https:\/\/github.com\//);
  assert.equal(JSON.parse(buildAssistantContext('List all repositories', [], true)).repositoryDirectory.length, 60);
});

test('a follow-up survives several provider 502s without changing its conversation or model', async () => {
  const bodies = [];
  wire(async (_, options) => {
    bodies.push(JSON.parse(options.body));
    return bodies.length < 4 ? new Response('NVIDIA temporary failure', { status: 502 })
      : responseFor(textStream(delta('More about his projects.') + 'data: [DONE]\n\n'));
  });
  const result = await sendChatMessage('what more', [
    { id: 'q', sender: 'user', text: 'Tell me about Ibrahim' },
    { id: 'a', sender: 'bot', text: 'He is an AI engineer.' },
  ]);
  assert.equal(result.text, 'More about his projects.');
  assert.equal(bodies.length, 4);
  assert.ok(bodies.every(body => JSON.stringify(body) === JSON.stringify(bodies[0])));
  assert.equal(bodies[0].model, config.OPENROUTER_MODEL);
  assert.deepEqual(bodies[0].messages.slice(-3), [
    { role: 'user', content: 'Tell me about Ibrahim' },
    { role: 'assistant', content: 'He is an AI engineer.' },
    { role: 'user', content: 'what more' },
  ]);
});

test('upstream rate limits stay 429 with Retry-After and are not blindly retried', async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return Response.json({ error: { code: 429, message: 'private-upstream-sentinel' } }, {
    status: 429, headers: { 'Retry-After': '60' },
  }); };
  const response = await fetchChat(post({ message: 'Hello', stream: true }), config);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '60');
  const body = await response.json();
  assert.equal(body.code, 'PROVIDER_RATE_LIMITED');
  assert.equal(calls, 1);
  assert.ok(!JSON.stringify(body).includes('private-upstream-sentinel'));
});

test('an explicitly configured free fallback recovers a rejected primary with the same conversation', async () => {
  const bodies = [];
  globalThis.fetch = async (_, options) => {
    const body = JSON.parse(options.body);bodies.push(body);
    return body.model === config.OPENROUTER_MODEL ? Response.json({ error: { code: 429 } }, { status: 429 })
      : responseFor(textStream(delta('Fallback answer') + 'data: [DONE]\n\n'));
  };
  const response = await fetchChat(post({ message: 'what more', history: [{ role: 'user', content: 'Tell me about Ibrahim' }], stream: true }),
    { ...config, OPENROUTER_FALLBACK_MODEL: 'openrouter/free' });
  assert.equal(response.status, 200);
  let result='';for await(const raw of readSseData(response.body)){const event=JSON.parse(raw);if(event.type==='delta')result+=event.text;}
  assert.equal(result, 'Fallback answer');
  assert.deepEqual(bodies.map(b=>b.model), [config.OPENROUTER_MODEL, 'openrouter/free']);
  assert.deepEqual(bodies[0].messages, bodies[1].messages);
});

test('a paid fallback is rejected and failed credentials never trigger model fallback', async () => {
  let calls=0;
  globalThis.fetch=async()=>{calls++;return new Response('Invalid key',{status:401});};
  const invalid=await fetchChat(post({message:'Hello',stream:true}),{...config,OPENROUTER_FALLBACK_MODEL:'paid/model'});
  assert.equal(invalid.status,503);assert.equal(calls,0);
  const auth=await fetchChat(post({message:'Hello',stream:true}),{...config,OPENROUTER_FALLBACK_MODEL:'openrouter/free'});
  assert.equal(auth.status,502);assert.equal(calls,1);
});

test('requests from the same IP have no local quota and accept larger questions and previous replies', async () => {
  let calls = 0;
  globalThis.fetch = async (_, options) => {
    calls++;
    const payload = JSON.parse(options.body);
    assert.equal(payload.max_tokens, 4096);
    assert.equal(payload.messages.at(-1).content.length, 3000);
    assert.equal(payload.messages.at(-2).content.length, 8000);
    return Response.json({ choices: [{ message: { content: 'A complete reply.' } }] });
  };
  for (let i = 0; i < 35; i++) {
    const request = post({ message: 'x'.repeat(3000), history: [{ role: 'assistant', content: 'y'.repeat(8000) }] });
    request.headers.set('x-forwarded-for', '192.0.2.123');
    const response = await fetchChat(request, config);
    assert.equal(response.status, 200);
    await response.text();
  }
  assert.equal(calls, 35);
});

test('a healthy stream can continue past the former 40/45-second timeouts', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let source, providerSignal, firstText;
  const first = new Promise(resolve => { firstText = resolve; });
  wire(async (_, options) => {
    providerSignal = options.signal;
    return responseFor(new ReadableStream({ start(c) { source = c; } }));
  });
  const answer = sendChatMessage('Hello', [], undefined, () => firstText());
  // Let the asynchronous request reach the provider stream.
  while (!source) await Promise.resolve();
  source.enqueue(encoder.encode(delta('First part. ')));
  await first;
  t.mock.timers.tick(60_000);
  assert.equal(providerSignal.aborted, false);
  source.enqueue(encoder.encode(delta('Still streaming.') + 'data: [DONE]\n\n'));
  source.close();
  assert.equal((await answer).text, 'First part. Still streaming.');
});
