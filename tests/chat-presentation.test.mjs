import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStreamingText, stabilizeStreamingMarkdown } from '../src/lib/streamingText.ts';

function frames() {
  let id = 0, time = 0;
  const callbacks = new Map();
  return {
    request(callback) { callbacks.set(++id, callback); return id; },
    cancel(key) { callbacks.delete(key); },
    step(count = 1) {
      for (let i = 0; i < count; i++) {
        time += 16;
        const next = [...callbacks.values()]; callbacks.clear();
        next.forEach(callback => callback(time));
      }
    },
    pending: () => callbacks.size,
  };
}

test('bursty Arabic/emoji text appears progressively before completion with bounded catch-up', async () => {
  const clock = frames(), updates = [];
  const stream = createStreamingText(text => updates.push(text), clock);
  const first = 'أهلاً 👋 أنا مساعد إبراهيم. '.repeat(8);
  stream.update(first);
  clock.step();
  assert(updates[0].length > 0 && updates[0].length < first.length);
  const all = first + 'شوف [المشاريع](https://example.com/projects).';
  const done = stream.complete(all);
  clock.step(60);
  await done;
  assert.equal(updates.at(-1), all);
  assert(updates.length > 5 && updates.length <= 31);
  for (let i = 0; i < updates.length; i++) {
    assert(all.startsWith(updates[i]));
    assert.equal(updates[i].isWellFormed(), true);
    if (i) assert(updates[i].length > updates[i - 1].length);
  }
  assert.equal(clock.pending(), 0);
});

test('stream cancellation releases animation and completion without more renders', async () => {
  const clock = frames(), updates = [];
  const stream = createStreamingText(text => updates.push(text), clock);
  const done = stream.complete('A long reply. '.repeat(100));
  clock.step(2);
  stream.stop();
  const count = updates.length;
  clock.step(100);
  stream.update('Late network event');
  await done;
  assert.equal(updates.length, count);
  assert.equal(clock.pending(), 0);
});

test('incomplete Markdown keeps labels and emphasis stable while streaming', () => {
  assert.equal(stabilizeStreamingMarkdown('Hello **Ibrahim'), 'Hello **Ibrahim**');
  assert.equal(stabilizeStreamingMarkdown('Use `Python'), 'Use `Python`');
  assert.equal(stabilizeStreamingMarkdown('See [المشاريع](https://exam'), 'See المشاريع');
  assert.equal(stabilizeStreamingMarkdown('See [المشا'), 'See المشا');
  const complete = '**Ibrahim** [projects](https://example.com) `Python`';
  assert.equal(stabilizeStreamingMarkdown(complete), complete);
});
