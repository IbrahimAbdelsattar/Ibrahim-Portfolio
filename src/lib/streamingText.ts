interface FrameClock {
  request: (callback: (time: number) => void) => number;
  cancel: (id: number) => void;
}

/** Keep unfinished Markdown from flashing syntax/URLs as characters arrive. */
export function stabilizeStreamingMarkdown(text: string): string {
  let visible = text.replace(/\[([^\]\n]*)\]\([^)\n]*$/, "$1").replace(/\[([^\]\n]*)$/, "$1");
  if ((visible.match(/\*\*/g)?.length ?? 0) % 2) visible += "**";
  if ((visible.match(/`/g)?.length ?? 0) % 2) visible += "`";
  return visible;
}

/** Smooth bursty network chunks without waiting for the complete answer. */
export function createStreamingText(
  render: (text: string) => void,
  clock: FrameClock = { request: callback => requestAnimationFrame(callback), cancel: id => cancelAnimationFrame(id) },
) {
  let target: string[] = [];
  let visible = 0;
  let frame: number | undefined;
  let lastTime: number | undefined;
  let lastRender = -Infinity;
  let credit = 0;
  let stopped = false;
  let finish: (() => void) | undefined;

  const tick = (time: number) => {
    frame = undefined;
    if (stopped) return;
    const elapsed = lastTime === undefined ? 16 : Math.min(32, Math.max(0, time - lastTime));
    lastTime = time;
    const pending = target.length - visible;
    // Keep a short buffer to absorb bursts, catching up faster for large chunks.
    credit += Math.max(100, pending / 0.14) * elapsed / 1000;
    const count = Math.min(pending, Math.floor(credit));
    visible += count;
    credit -= count;
    if (count && (time - lastRender >= 32 || visible === target.length)) {
      render(target.slice(0, visible).join(""));
      lastRender = time;
    }
    if (visible < target.length) frame = clock.request(tick);
    else {
      credit = 0;
      lastTime = undefined;
      finish?.(); finish = undefined;
    }
  };
  const update = (text: string) => {
    if (stopped) return;
    // Code points keep emoji/surrogate pairs intact while revealing characters.
    target = Array.from(text);
    if (frame === undefined && visible < target.length) frame = clock.request(tick);
  };
  return {
    update,
    complete(text: string): Promise<void> {
      update(text);
      if (stopped || visible >= target.length) return Promise.resolve();
      return new Promise(resolve => { finish = resolve; });
    },
    stop() {
      stopped = true;
      if (frame !== undefined) clock.cancel(frame);
      frame = undefined;
      finish?.(); finish = undefined;
    },
  };
}
