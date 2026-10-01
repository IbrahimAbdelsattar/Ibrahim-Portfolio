import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Load the actual TypeScript catalog without introducing a test-only runtime.
const loadTS = async (path) => {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
};
const { projects, projectStats, getProjectBySlug } = await loadTS('../src/data/projects.ts');
const inventory = JSON.parse(await readFile(new URL('./repositories.json', import.meta.url)));
const existingRoutes = JSON.parse(await readFile(new URL('./existing-routes.json', import.meta.url)));

test('every owned repository is represented exactly once', () => {
  assert.equal(new Set(projects.map(p => p.repository)).size, projects.length);
  assert.deepEqual(projects.map(p => p.repository).sort(), inventory.map(r => r.name).sort());
});
test('existing case-study URLs remain available and all slugs are unique', () => {
  assert.equal(new Set(projects.map(p => p.id)).size, projects.length);
  for (const slug of existingRoutes) assert.ok(getProjectBySlug(slug), slug);
  for (const p of projects) assert.match(p.id, /^[a-z0-9-]+$/);
});
test('private sources stay private and public links resolve to the correct repository', () => {
  for (const repo of inventory) {
    const p = projects.find(p => p.repository === repo.name);
    if (repo.private) { assert.equal(p.sourcePrivate, true, repo.name); assert.ok(!p.githubUrl, repo.name); }
    else assert.equal(p.githubUrl, `https://github.com/IbrahimAbdelsattar/${repo.name}`);
  }
});
test('every fork carries upstream attribution', () => {
  for (const repo of inventory) {
    const p = projects.find(p => p.repository === repo.name);
    assert.equal(p.sourceKind, repo.fork ? 'fork' : 'project', repo.name);
    if (repo.fork) { assert.match(p.upstreamUrl, /^https:\/\/github.com\//); assert.notEqual(p.upstreamUrl, p.githubUrl); assert.equal(p.tier, 'archive'); }
  }
});
test('public counters reflect the reviewed inventory', () => {
  assert.equal(projectStats.total, 60);
  assert.equal(projectStats.publicRepos, inventory.filter(r => !r.private).length);
  assert.equal(projectStats.forks, inventory.filter(r => r.fork).length);
});
test('all detail entries contain a usable summary and technology list', () => {
  for (const p of projects) {
    assert.ok(p.title && p.tagline && p.description, p.repository);
    assert.ok(p.technologies.length, p.repository);
    assert.ok(!JSON.stringify(p).includes('undefined'), p.repository);
  }
});
