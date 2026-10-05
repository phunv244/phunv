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
// Gold palette: cream ribbon, amber ribbon, glowing beads
const CREAM = '#e9dfb8', GOLD = '#e3a94e', GLOW = '#ffd890', DIM = '#6b5a3c';

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
  // Everything is additive, so fog toward black = fade to nothing: the column dissolves up and down
  scene.fog = new THREE.Fog('#000000', 7, 21);
  const camera = new THREE.PerspectiveCamera(42, 1, .1, 80);

  const helix = new THREE.Group();
  scene.add(helix);
  const at = (y, phase = 0) => {
    const a = y * TWIST + phase;
    return new THREE.Vector3(Math.cos(a) * RADIUS, y, Math.sin(a) * RADIUS);
  };

  // Soft round sprite: bright core, long falloff. Drives every bead and glow (additive = cheap bloom)
  const sprite = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d'), grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(.18, 'rgba(255,255,255,.9)');
    grd.addColorStop(.45, 'rgba(255,255,255,.25)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();
  // Across-the-band gradient for the ribbons: soft edges, brighter leading edge
  const band = (() => {
    const c = document.createElement('canvas');
    c.width = 4; c.height = 64;
    const g = c.getContext('2d'), grd = g.createLinearGradient(0, 0, 0, 64);
    grd.addColorStop(0, 'rgba(255,255,255,0)');
    grd.addColorStop(.25, 'rgba(255,255,255,.95)');
    grd.addColorStop(.6, 'rgba(255,255,255,.45)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 4, 64);
    return new THREE.CanvasTexture(c);
  })();

  const beads = (points, color, size, opacity) => new THREE.Points(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.PointsMaterial({
      map: sprite, color, size, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending,
    }),
  );

  // Flat ribbon wound round the column: the band is vertical, so it shows its face on the near side
  // and turns edge-on at the sides, like the twisted strand in the reference
  const ribbon = (phase, width, color, opacity) => {
    const segs = small ? 1600 : 2800;
    const pos = new Float32Array((segs + 1) * 6), uv = new Float32Array((segs + 1) * 4), index = [];
    for (let i = 0; i <= segs; i++) {
      const p = at((i / segs - .5) * LENGTH, phase);
      pos.set([p.x, p.y - width / 2, p.z, p.x, p.y + width / 2, p.z], i * 6);
      uv.set([i / segs, 0, i / segs, 1], i * 4);
      if (i < segs) { const v = i * 2; index.push(v, v + 1, v + 2, v + 1, v + 3, v + 2); }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.setIndex(index);
    return new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      map: band, color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
  };
  helix.add(ribbon(0, .34, CREAM, .5), ribbon(Math.PI, .16, GOLD, .55));

  // Beads riding the cream ribbon
  const along = [];
  for (let y = -LENGTH / 2; y <= LENGTH / 2; y += .14) along.push(at(y));
  helix.add(beads(along, CREAM, .07, .9));

  // Base pairs as dotted lines of light, each ending in a glowing bead on the gold strand
  const rungDots = [], rungEnds = [];
  for (let y = -LENGTH / 2; y <= LENGTH / 2; y += .5) {
    const a = at(y), b = at(y, Math.PI);
    for (let j = 1; j < 14; j++) rungDots.push(a.clone().lerp(b, j / 14));
    rungEnds.push(b);
  }
  helix.add(beads(rungDots, GOLD, .09, 1), beads(rungEnds, GLOW, .42, 1));

  // Milestones: big glowing orbs on the cream strand, centred on the origin
  const nodeY = (i) => (i - (count - 1) / 2) * GAP;
  const nodes = Array.from({ length: count }, (_, i) => {
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: sprite, color: DIM, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    glow.position.copy(at(nodeY(i)));
    helix.add(glow);
    return glow;
  });

  // Star dust around the column
  const dustN = small ? 300 : 800;
  const dust = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    const a = Math.random() * Math.PI * 2, r = 2.5 + Math.random() * 7;
    dust.set([Math.cos(a) * r, (Math.random() - .5) * 40, Math.sin(a) * r], i * 3);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dust, 3));
  const motes = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    map: sprite, color: CREAM, size: .05, transparent: true, opacity: .55, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
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
  const tint = { on: new THREE.Color(GLOW), past: new THREE.Color(CREAM), next: new THREE.Color(DIM) };
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
      n.material.color.lerp(on ? tint.on : i < act ? tint.past : tint.next, k);
      const pulse = on && !still ? 1 + Math.sin(now / 520) * .12 : 1;
      n.scale.setScalar(n.scale.x + ((on ? 1 : i < act ? .6 : .45) * pulse - n.scale.x) * k);
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
