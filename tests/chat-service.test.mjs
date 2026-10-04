import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { sendChatMessage, stripForbiddenCharacters } from '../src/services/chatService.ts';
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });

test('frontend sends only conversation to same-origin API, excluding welcome and error messages', async () => {
  globalThis.fetch = async (url, options) => {
    assert.equal(url, '/api/chat');
    assert.equal(options.headers.Authorization, undefined);
    assert.deepEqual(JSON.parse(options.body), { message: 'Follow up', history: [{ role: 'user', content: 'First question' }] });
    return new Response(JSON.stringify({ reply: 'Real model answer', isLive: true }));
  };
  const result = await sendChatMessage('Follow up', [
    { id: 'welcome', sender: 'bot', text: 'Welcome' },
    { id: '1', sender: 'user', text: 'First question' },
    { id: '2', sender: 'bot', text: 'Unavailable', isError: true },
  ]);
  assert.equal(result.text, 'Real model answer');
});
test('frontend rejects provider errors, HTML rewrites, empty responses, and non-live responses', async () => {
  for (const response of [
    new Response('{}', { status: 502 }), new Response('<html>App</html>'),
    new Response(JSON.stringify({ reply: '', isLive: true })),
    new Response(JSON.stringify({ reply: 'Canned answer', isLive: false })),
  ]) {
    globalThis.fetch = async () => response;
    await assert.rejects(sendChatMessage('Hi'));
  }
});
test('preserves Arabic, Markdown, and links while stripping control characters', () => {
  assert.equal(stripForbiddenCharacters('\u0000 **أهلاً**\r\nhttps://example.com/a-b \u007f'), '**أهلاً**\nhttps://example.com/a-b');
});

test('network failures and timeouts reject without using offline answers', async () => {
  for (const error of [new TypeError('Network unavailable'), new DOMException('Aborted', 'AbortError')]) {
    let calls = 0;
    globalThis.fetch = async () => { calls++; throw error; };
    await assert.rejects(sendChatMessage('Tell me about projects'));
    assert.equal(calls, 1);
  }
});

test('keeps the last eight valid conversation messages and validates input before fetching', async () => {
  globalThis.fetch = async (_, options) => {
    const body = JSON.parse(options.body);
    assert.equal(body.message, 'Follow up');
    assert.equal(body.history.length, 8);
    assert.equal(body.history[0].content, 'Message 2');
    return new Response(JSON.stringify({ reply: 'Answer', isLive: true }));
  };
  await sendChatMessage(' Follow up ', Array.from({ length: 10 }, (_, i) =>
    ({ id: String(i), sender: 'user', text: `Message ${i}` })));
  globalThis.fetch = () => { throw new Error('Should not fetch'); };
  await assert.rejects(sendChatMessage(' '), /1 to 2000/);
  await assert.rejects(sendChatMessage('x'.repeat(2001)), /1 to 2000/);
});
