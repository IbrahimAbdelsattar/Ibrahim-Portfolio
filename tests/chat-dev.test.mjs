import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { chatDevPlugin } from '../scripts/chat-dev-plugin.mjs';

test('development serves the real API with server credentials and JSON errors, not the SPA', async () => {
  const originalEnv = { ...process.env };
  const originalFetch = globalThis.fetch;
  Object.assign(process.env, {
    OMNIROUTE_API_URL: 'https://provider.example/v1/chat/completions',
    OMNIROUTE_API_KEY: 'server-test-secret', OMNIROUTE_MODEL: 'configured-test-model',
  });
  const server = await createServer({ configFile: false, plugins: [chatDevPlugin()],
    server: { host: '127.0.0.1', port: 0 }, logLevel: 'error' });
  try {
    await server.listen();
    const address = server.httpServer.address();
    const endpoint = `http://127.0.0.1:${address.port}/api/chat`;
    let providerCalls = 0;
    globalThis.fetch = async (url, options) => {
      assert.equal(url, process.env.OMNIROUTE_API_URL);
      assert.equal(options.headers.Authorization, 'Bearer server-test-secret');
      assert.equal(JSON.parse(options.body).model, 'configured-test-model');
      providerCalls++;
      return new Response(JSON.stringify({ choices: [{ message: { content: 'Live test response' } }] }));
    };
    const response = await originalFetch(endpoint, { method: 'POST',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Hello' }) });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { reply: 'Live test response', isLive: true, source: 'ai' });
    assert.equal(providerCalls, 1);
    assert.equal((await originalFetch(endpoint)).status, 200);
    const malformed = await originalFetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' });
    assert.equal(malformed.status, 400);
    assert.equal((await malformed.json()).reply, undefined);
  } finally {
    globalThis.fetch = originalFetch;
    process.env = originalEnv;
    await server.close();
  }
});

test('development flushes OpenRouter tokens before completion and aborts on disconnect', { timeout: 5000 }, async () => {
  const originalEnv = { ...process.env };
  const originalFetch = globalThis.fetch;
  Object.assign(process.env, { OPENROUTER_API_KEY: 'stream-test-key', OPENROUTER_MODEL: 'nvidia/nemotron-3.5-super-vl:free' });
  const server = await createServer({ configFile: false, plugins: [chatDevPlugin()],
    server: { host: '127.0.0.1', port: 0 }, logLevel: 'error' });
  let providerAborted;
  const aborted = new Promise(resolve => { providerAborted = resolve; });
  let cancelled = false;
  try {
    await server.listen();
    globalThis.fetch = async (url, options) => {
      assert.equal(url, 'https://openrouter.ai/api/v1/chat/completions');
      assert.equal(JSON.parse(options.body).stream, true);
      options.signal.addEventListener('abort', providerAborted, { once: true });
      return new Response(new ReadableStream({
        start(c) { c.enqueue(new TextEncoder().encode('data: {"choices":[{"delta":{"content":"First text"}}]}\n\n')); },
        cancel() { cancelled = true; },
      }), { headers: { 'Content-Type': 'text/event-stream' } });
    };
    const controller = new AbortController();
    const response = await originalFetch(`http://127.0.0.1:${server.httpServer.address().port}/api/chat`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Hello', stream: true }), signal: controller.signal,
    });
    assert.match(response.headers.get('content-type'), /text\/event-stream/);
    const reader = response.body.getReader();
    let first = '';
    while (!first.includes('First text')) first += new TextDecoder().decode((await reader.read()).value);
    assert.match(first, /"type":"delta"/);
    assert.ok(!first.includes('"type":"done"'));
    controller.abort();
    await aborted;
    assert.equal(cancelled, true);
  } finally { globalThis.fetch = originalFetch; process.env = originalEnv; await server.close(); }
});
