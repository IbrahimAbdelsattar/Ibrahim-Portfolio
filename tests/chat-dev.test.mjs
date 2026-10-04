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
