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

test('a transient OpenRouter rejection is retried once before any answer text is delivered', async () => {
  let calls = 0;
  wire(async () => ++calls === 1 ? new Response('Busy', { status: 502 })
    : responseFor(textStream(delta('Recovered answer') + 'data: [DONE]\n\n')));
  assert.equal((await sendChatMessage('Hello')).text, 'Recovered answer');
  assert.equal(calls, 2);
  calls = 0;
  wire(async () => { calls++; return new Response('Busy', { status: 503 }); });
  await assert.rejects(sendChatMessage('Hello'));
  assert.equal(calls, 2, 'Busy providers must not cause an unbounded retry loop');
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
