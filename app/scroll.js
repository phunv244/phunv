import Lenis from 'lenis';

// One rAF loop drives the smooth scroll, the 3D world and the slide depth effect, so all three read the
// same scroll value in the same frame and never drift apart
export const frame = { y: 0, v: 0, vh: 1, t: 0, dt: 0, slides: [] };
const subs = new Set(), late = new Set();
let lenis = null;

export const getLenis = () => lenis;
// late: runs after everything else, e.g. DOM that follows positions the 3D world just computed
export function onFrame(fn, after = false) {
  const set = after ? late : subs;
  set.add(fn);
  return () => set.delete(fn);
}

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (v) => v * v * (3 - 2 * v);

export function startScroll() {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Wheel and keyboard glide; touch stays native (Lenis leaves it alone by default)
  if (!still) lenis = new Lenis({ lerp: .09, anchors: true, prevent: (node) => !!node.closest?.('.gx-lightbox') });

  // Slide boxes in document coordinates; offsetTop is page-relative because no ancestor is positioned
  const measure = () => {
    frame.vh = innerHeight;
    frame.slides = [...document.querySelectorAll('[data-slide]')].map((el) => ({
      el, id: el.id, top: el.offsetTop, h: el.offsetHeight, depth: el.querySelector('[data-depth]'),
    }));
  };
  measure();
  const ro = new ResizeObserver(measure);
  frame.slides.forEach((s) => ro.observe(s.el));
  addEventListener('resize', measure);

  let raf, last = performance.now(), lastY = scrollY;
  const tick = (now) => {
    raf = requestAnimationFrame(tick);
    lenis?.raf(now);
    const dt = Math.min(.1, (now - last) / 1000) || 1 / 60;
    last = now;
    const y = lenis ? lenis.animatedScroll : scrollY;
    frame.v += ((y - lastY) / dt - frame.v) * Math.min(1, dt * 8);
    lastY = y;
    frame.y = y;
    frame.t = now / 1000;
    frame.dt = dt;
    if (!still) depth(frame);
    subs.forEach((fn) => fn(frame));
    late.forEach((fn) => fn(frame));
  };
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    removeEventListener('resize', measure);
    lenis?.destroy();
    lenis = null;
    frame.slides.forEach((s) => s.depth && Object.assign(s.depth.style, { transform: '', opacity: '', willChange: '' }));
  };
}

// Slides ride a slow drum: content rises out of the depth tilted toward you, stands upright while it fills
// the screen, then tips back and sinks away as it leaves. Pinned slides use their own top/bottom, so the
// sticky stage only moves while it is actually entering or leaving
function depth({ y, vh, slides }) {
  for (const s of slides) {
    const el = s.depth;
    if (!el) continue;
    // Snap the last pixel: box sizes are whole pixels, the smooth scroll is not
    const enter = clamp01((y + vh - s.top) / vh + .002);
    const exit = clamp01((y + vh - s.top - s.h) / vh - .002);
    // Off screen or at rest: drop the transform so text renders crisp and the layer can be released
    if (enter === 0 || exit === 1 || (enter === 1 && exit === 0)) {
      if (el.style.transform) Object.assign(el.style, { transform: '', opacity: '', willChange: '' });
      continue;
    }
    const i = 1 - smooth(enter), o = smooth(exit);
    el.style.willChange = 'transform, opacity';
    el.style.transform = `perspective(1400px) translate3d(0, ${(i * 6 - o * 4).toFixed(3)}vh, ${(-(i * 380 + o * 300)).toFixed(1)}px) rotateX(${(o * 11 - i * 13).toFixed(3)}deg)`;
    el.style.opacity = (smooth(clamp01(enter / .75)) * (1 - smooth(clamp01((exit - .1) / .75)))).toFixed(3);
  }
}
