'use client';
import { useEffect, useRef } from 'react';

// DNA-style helix for the Experience slide. One node per milestone, bottom → top; the camera
// climbs and orbits the helix as the pinned section scrolls (`track` = the tall section element)
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

const RADIUS = 1.6, HEIGHT = 12, TURNS = 1.75; // fewer turns = gentler orbit between milestones
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
  scene.fog = new THREE.Fog('#1a1512', 6, 20); // far turns fade into the page background
  const camera = new THREE.PerspectiveCamera(45, 1, .1, 100);

  const angleAt = (t) => t * TURNS * Math.PI * 2;
  const at = (t, phase = 0) => {
    const a = angleAt(t) + phase;
    return new THREE.Vector3(Math.cos(a) * RADIUS, t * HEIGHT - HEIGHT / 2, Math.sin(a) * RADIUS);
  };

  // Two strands, half a turn apart
  const strand = (phase, color, opacity) => {
    const curve = new THREE.CatmullRomCurve3(Array.from({ length: 160 }, (_, i) => at(i / 159, phase)));
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, 480, .022, 6),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity }),
    );
  };
  scene.add(strand(0, FG, .6), strand(Math.PI, '#8a837c', .35));

  // Base-pair rungs between the strands
  const rungs = [];
  for (let i = 0; i <= 54; i++) rungs.push(at(i / 54), at(i / 54, Math.PI));
  scene.add(new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(rungs),
    new THREE.LineBasicMaterial({ color: FG, transparent: true, opacity: .14 }),
  ));

  // Milestones sit on the bright strand, spread from near the bottom to near the top
  const nodeT = (i) => .1 + (i / Math.max(1, count - 1)) * .8;
  const nodes = Array.from({ length: count }, (_, i) => {
    const g = new THREE.Group();
    g.position.copy(at(nodeT(i)));
    const core = new THREE.Mesh(new THREE.SphereGeometry(.11, 24, 16), new THREE.MeshBasicMaterial({ color: MUTED }));
    const halo = new THREE.Mesh(
      new THREE.RingGeometry(.19, .2, 48),
      new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0, side: THREE.DoubleSide }),
    );
    g.add(core, halo);
    scene.add(g);
    return { g, core, halo };
  });

  // Dust drifting around the helix for depth
  const dustN = small ? 160 : 420;
  const dust = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    const a = Math.random() * Math.PI * 2, r = 2 + Math.random() * 4;
    dust.set([Math.cos(a) * r, (Math.random() - .5) * HEIGHT * 1.2, Math.sin(a) * r], i * 3);
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
    narrow = camera.aspect < 1; // portrait: node centred above the text instead of beside it
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(canvas);

  // Scroll state of the section: climb 0 → 1 while pinned (first → last milestone), plus how far the
  // stage has scrolled in (enter 0 → 1) and back out past the last milestone (exit 0 → 1)
  const read = () => {
    const r = track.current.getBoundingClientRect(), vh = innerHeight;
    const range = r.height - vh;
    const clamp = (v) => Math.min(1, Math.max(0, v));
    return {
      climb: range > 0 ? clamp(-r.top / range) : 0,
      enter: clamp(1 - r.top / vh),
      exit: clamp((vh - r.bottom) / vh),
    };
  };
  const smooth = (v) => v * v * (3 - 2 * v);

  const target = new THREE.Vector3(), out = new THREE.Vector3(), side = new THREE.Vector3(), look = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const tint = { on: new THREE.Color(ACCENT), past: new THREE.Color(FG), next: new THREE.Color(MUTED) };
  const cur = read();
  let raf, last = performance.now();

  const tick = (now) => {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(.1, (now - last) / 1000);
    last = now;
    if (!visible) return;

    // Frame-rate independent easing toward the scroll state: snap jumps, the camera glides
    const goal = read(), k = still ? 1 : 1 - Math.exp(-dt * 3);
    for (const key in cur) cur[key] += (goal[key] - cur[key]) * k;
    const s = cur.climb;
    const t = nodeT(0) + s * (nodeT(count - 1) - nodeT(0));

    // Fly-in / fly-out: before the first milestone the camera waits far below and away, after the last
    // it pulls far back and up, so the helix shrinks into the fog and drops out of frame (reversed on the way back)
    const away = smooth(1 - cur.enter), gone = smooth(cur.exit);
    const off = away + gone;

    // Camera sits outside the helix facing the current point. Over the climb it rises from below
    // (looking up at what's ahead) to above (looking down at the path so far) and pulls back for the
    // bigger picture, so each milestone gets its own angle
    const a = angleAt(t) + (s - .5) * .7 + (gone - away) * 1.1;
    target.copy(at(t));
    out.set(Math.cos(a), 0, Math.sin(a));
    const dist = (narrow ? 6.4 : 5.6) + s * 2.2 + off * off * 16;
    camera.position.copy(target).addScaledVector(out, dist).addScaledVector(up, -1.6 + s * 3.4 + (gone - away) * 9);
    // Desktop: aim left of the node so it lands right of centre, clear of the text column
    side.crossVectors(up, out).normalize();
    look.copy(target)
      .addScaledVector(side, narrow ? 0 : -(1.7 + s * .6))
      .addScaledVector(up, (narrow ? -1.3 : 0) + (gone - away) * 7);
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
