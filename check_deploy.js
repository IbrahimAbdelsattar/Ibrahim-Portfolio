async function check() {
  const r1 = await fetch('https://ibrahim-abdelsattar-ai.vercel.app');
  const t1 = await r1.text();
  const r2 = await fetch('https://temporary-rapid-zinc-e744r3z.vercel.app');
  const t2 = await r2.text();
  console.log('ibrahim-abdelsattar-ai scripts:', t1.match(/assets\/[^"]+\.js/g));
  console.log('temporary-rapid-zinc scripts:', t2.match(/assets\/[^"]+\.js/g));
}
check();
