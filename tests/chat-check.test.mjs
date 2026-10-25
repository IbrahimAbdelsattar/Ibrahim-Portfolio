import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

test('remote live-check CLI accepts a valid Arabic refusal without requiring local credentials', async () => {
  const answers = [
    'MTI University, GPA 3.5.',
    'Bachelor of Computer Science and Artificial Intelligence.',
    'اشتغل في HAMS.AI سنة 2025.',
    'I do not have that salary information.',
    'لا، إبراهيم لا يحمل دكتوراه من هارفارد.',
  ];
  let requests = 0;
  const server = createServer((req, res) => {
    assert.equal(req.url, '/api/chat');
    assert.equal(req.method, 'POST');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ reply: answers[requests++], isLive: true, source: 'ai' }));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const script = fileURLToPath(new URL('../scripts/check-chatbot.mjs', import.meta.url));
    const { stdout } = await promisify(execFile)(process.execPath, [
      '--experimental-strip-types', script, `--url=http://127.0.0.1:${server.address().port}/api/chat`,
    ], { env: { PATH: process.env.PATH }, timeout: 10_000 });
    assert.equal(requests, 5);
    assert.match(stdout, /PASS: live facts, conversation context, Arabic, missing facts, and fabrication refusal/);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
