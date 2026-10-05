'use client';
import { useEffect, useRef } from 'react';

// Endless DNA column for the Experience slide. Think of a tall vertical pole: the camera starts looking
// at the empty space left of it, swings right while dollying in as the slide scrolls in, climbs the
// column milestone by milestone (the helix screws round as it climbs), then swings back out on exit.
// `track` = the pinned section element; one node per milestone, bottom → top.
export default function Helix({ count, active, track }) {
  const el = useRef(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  // three.js loads in its own chunk, same as the hero light
  useEffect(() => {
    let dispose, dead = false;
    import('three').then((THREE) => { if (!dead) dispose = setup(THREE, el.current, count, activeRef, track); });
    return () => { dead = true; dispose?.(); };
  }, [count, track]);

  return <canvas ref={el} className="helix" aria-hidden="true" />;
}

const RADIUS = 1.5;
const LENGTH = 140;   // far past the fog both ways, so the column reads as endless
const TWIST = 1.25;   // radians per unit of height: ~1.5 turns on screen at once
const GAP = 2.6;      // height between milestones
const ACCENT = '#d9b99b', FG = '#f2eee9', MUTED = '#5a524b';

function setup(THREE, canvas, count, activeRef, track) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (err) {
    console.warn('WebGL is not available:', err);
    return;
  }
  const small = matchMedia('(max-width: 800px)').matches;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.25 : 1.75));

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#1a1512', 7, 21); // the column dissolves into the page background up and down
  const camera = new THREE.PerspectiveCamera(42, 1, .1, 80);

  const helix = new THREE.Group();
  scene.add(helix);
  const at = (y, phase = 0) => {
    const a = y * TWIST + phase;
    return new THREE.Vector3(Math.cos(a) * RADIUS, y, Math.sin(a) * RADIUS);
  };

  // Two strands, half a turn apart
  const strand = (phase, color, opacity) => {
    const n = 700;
    const curve = new THREE.CatmullRomCurve3(Array.from({ length: n }, (_, i) => at((i / (n - 1) - .5) * LENGTH, phase)));
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, small ? 1400 : 2400, .022, 6),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity }),
    );
  };
  helix.add(strand(0, FG, .6), strand(Math.PI, '#8a837c', .35));

  // Base-pair rungs between the strands
  const rungs = [];
  for (let y = -LENGTH / 2; y <= LENGTH / 2; y += .32) rungs.push(at(y), at(y, Math.PI));
  helix.add(new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(rungs),
    new THREE.LineBasicMaterial({ color: FG, transparent: true, opacity: .14 }),
  ));

  // Milestones on the bright strand, centred on the origin
  const nodeY = (i) => (i - (count - 1) / 2) * GAP;
  const nodes = Array.from({ length: count }, (_, i) => {
    const g = new THREE.Group();
    g.position.copy(at(nodeY(i)));
    const core = new THREE.Mesh(new THREE.SphereGeometry(.11, 24, 16), new THREE.MeshBasicMaterial({ color: MUTED }));
    const halo = new THREE.Mesh(
      new THREE.RingGeometry(.19, .2, 48),
      new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0, side: THREE.DoubleSide }),
    );
    g.add(core, halo);
    helix.add(g);
    return { g, core, halo };
  });

  // Dust along the whole visible stretch of the column
  const dustN = small ? 260 : 700;
  const dust = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    const a = Math.random() * Math.PI * 2, r = 2 + Math.random() * 5;
    dust.set([Math.cos(a) * r, (Math.random() - .5) * 40, Math.sin(a) * r], i * 3);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dust, 3));
  const motes = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: ACCENT, size: .035, transparent: true, opacity: .45 }));
  scene.add(motes);

  let narrow = false;
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    narrow = camera.aspect < 1; // portrait: column centred above the text instead of beside it
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(canvas);

  // Scroll state: climb 0 → 1 while pinned (first → last milestone); enter 0 → 1 as the stage slides in,
  // exit 0 → 1 as it slides out after the last milestone
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const read = () => {
    const r = track.current.getBoundingClientRect(), vh = innerHeight;
    const range = r.height - vh;
    return {
      climb: range > 0 ? clamp01(-r.top / range) : 0,
      enter: clamp01(1 - r.top / vh),
      exit: clamp01((vh - r.bottom) / vh),
    };
  };
  const smooth = (v) => v * v * (3 - 2 * v);

  const look = new THREE.Vector3();
  const tint = { on: new THREE.Color(ACCENT), past: new THREE.Color(FG), next: new THREE.Color(MUTED) };
  const cur = read();
  let raf, last = performance.now();

  const tick = (now) => {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(.1, (now - last) / 1000);
    last = now;
    if (!visible) return;

    // Frame-rate independent easing toward the scroll state: snap jumps, the camera glides
    const goal = read(), k = still ? 1 : 1 - Math.exp(-dt * 2.4);
    for (const key in cur) cur[key] += (goal[key] - cur[key]) * k;

    // 1 = parked: looking at the empty space left of the column, pulled back
    const off = smooth(Math.max(1 - cur.enter, cur.exit));
    // Keep drifting up through the swing-in and swing-out so the climb never stops
    const y = nodeY(0) + cur.climb * (nodeY(count - 1) - nodeY(0)) + (cur.exit - (1 - cur.enter)) * 1.6;

    // Screw the helix so the bright strand at the camera's height always turns toward the viewer
    helix.rotation.y = y * TWIST - Math.PI / 2 - .3;

    // Camera left of the axis (desktop) so the column sits right of centre, clear of the text column;
    // swing (yaw) to the left and dolly back when parked
    const dist = (narrow ? 10.5 : 8.5) + off * 5;
    const yaw = off * 1.1;
    camera.position.set(narrow ? .4 : -2, y - .6, dist); // column shifted off the rail (right) and the text (left)
    look.set(
      camera.position.x - Math.sin(yaw) * dist,
      y + (narrow ? -2.2 : .15),
      camera.position.z - Math.cos(yaw) * dist,
    );
    camera.lookAt(look);

    const act = activeRef.current;
    nodes.forEach((n, i) => {
      const on = i === act;
      n.core.material.color.lerp(on ? tint.on : i < act ? tint.past : tint.next, k);
      const pulse = on && !still ? 1 + Math.sin(now / 420) * .08 : 1;
      n.g.scale.setScalar(n.g.scale.x + ((on ? 1.35 : i < act ? 1 : .8) * pulse - n.g.scale.x) * k);
      n.halo.material.opacity += ((on ? .9 : 0) - n.halo.material.opacity) * k;
      n.halo.lookAt(camera.position);
    });

    if (!still) motes.rotation.y = now / 40000;
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); });
    renderer.dispose();
  };
}
