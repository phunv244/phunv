'use client';
import { useEffect, useRef } from 'react';
import { onFrame } from './scroll';
import { EXPERIENCE, PROJECTS } from './data';

// One continuous 3D space behind every slide after the hero. The camera sinks with the page (the plane at
// z = 0 moves exactly as fast as the text, nearer dust faster, farther dust slower), and a single cloud of
// gold particles travels along, reshaping itself for each slide:
//   hero: scattered dust → About: dotted globe → Work: architecture pipeline → Experience: DNA helix →
//   Skills: four orbits → Side projects: galaxy → All projects: curved wall → Contact: portal ring
export default function World() {
  const el = useRef(null);
  useEffect(() => {
    let dispose, dead = false;
    import('three').then((THREE) => { if (!dead) dispose = setup(THREE, el.current); });
    return () => { dead = true; dispose?.(); };
  }, []);
  return <div className="world" aria-hidden="true"><canvas ref={el} /></div>;
}

const FOV = 40, CAM_Z = 10;
const STAGES = 8; // one per [data-slide], hero included
const FEATURED = PROJECTS.filter((p) => p.featured).length;
const MILESTONES = EXPERIENCE.length;
// DNA: one full turn per milestone gap, so every milestone orb sits on the front of the strand
const L = 18, R = 1.5, GAP = 4, TWIST = (Math.PI * 2) / GAP, FRONT = Math.PI / 2 + .35;
const CREAM = '#e9dfb8', GOLD = '#e3a94e', GLOW = '#ffd890', DIM = '#6b5a3c';

// Where the cloud sits on screen per stage: [x, y, scale, brightness]. Wide = text on the left, cloud on
// the right; narrow (portrait) = cloud peeking in at the top right, dimmer, behind the text (DNA stays centred)
const WIDE = [
  [0, 0, 1.4, .0],
  [2.9, 1.15, .8, .7],
  [2.6, -.15, .95, .85],
  [3.1, 0, 1, 1],
  [3.4, 1.7, .78, .6],
  [5.4, 0, .9, .4],
  [4, 1.1, .7, .65],
  [3.9, .3, .85, .95],
];
const NARROW = [
  [0, 0, 1.4, 0],
  [1.3, 2, .55, .4],
  [1.4, 1.6, .5, .4],
  [.15, 1.2, .8, 1],
  [1.3, 2.1, .5, .4],
  [1.2, 1.8, .55, .35],
  [1.3, 2, .45, .4],
  [1.1, 1.9, .55, .6],
];

// Five flow nodes (top → bottom) per featured case; the pipeline reshapes as the cases change
const PIPES = [
  [[-.9, 2.6, .3], [.9, 1.3, -.4], [-.6, 0, .5], [.8, -1.3, -.3], [-.4, -2.6, .3]],
  [[0, 2.7, 0], [-1.3, 1.2, .6], [1.3, 1.2, -.6], [0, -.6, 0], [0, -2.5, .2]],
  [[-1.6, 2, -.4], [-.5, 1, .7], [.6, 0, -.5], [1.4, -1.2, .6], [.2, -2.6, -.2]],
  [[1.2, 2.5, .2], [-.2, 1.6, -.7], [-1.2, .1, .3], [.3, -1, .8], [.9, -2.6, -.4]],
];

const PARTICLE_VERT = /* glsl */ `
uniform float uTime, uA, uB, uMix, uPx, uBright, uTurn, uHelix;
uniform vec3 uNodes[5];
attribute vec4 aR;
attribute vec3 aD;
varying vec3 vColor;
varying float vAlpha;

const float PI = 3.14159265, TAU = 6.2831853;
const float L = ${L.toFixed(2)}, R = ${R.toFixed(2)}, TW = ${TWIST.toFixed(5)};

vec3 rotY(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c * p.x + s * p.z, p.y, c * p.z - s * p.x); }
vec3 rotX(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z); }
vec3 rotZ(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c * p.x - s * p.y, s * p.x + c * p.y, p.z); }
vec3 strand(float u, float phase) { float a = u * TW + phase + uHelix; return vec3(cos(a) * R, u, sin(a) * R); }

// Every shape is computed from the particle's random seeds, so morphing is just mixing two of them.
// size: point size multiplier (> 1.5 = highlight bead), alpha: shape-specific fade
vec3 shape(float s, out float size, out float alpha) {
  size = 1.; alpha = 1.;
  float t = uTime;

  if (s < .5) { alpha = .4; return position; }

  if (s < 1.5) { // dotted globe: latitude rings, meridians, faint core
    vec3 p;
    if (aR.x < .55) {
      float phi = (floor(aR.y * 9.) + 1.) / 10. * PI, th = aR.z * TAU;
      p = vec3(sin(phi) * cos(th), cos(phi), sin(phi) * sin(th));
    } else if (aR.x < .85) {
      float th = floor(aR.y * 12.) / 12. * TAU, phi = aR.z * PI;
      p = vec3(sin(phi) * cos(th), cos(phi), sin(phi) * sin(th));
    } else {
      p = aD * pow(aR.z, .4) * .75; alpha = .45;
    }
    if (aR.w > .985) size = 3.4;
    return rotX(rotY(p * 2.4, t * .08), .38);
  }

  if (s < 2.5) { // architecture pipeline: node orbs, data flowing down the links, orbit rings
    vec3 p;
    if (aR.x < .5) {
      int i = int(aR.y * 5.);
      p = uNodes[i] + aD * (aR.z < .7 ? .42 : .42 * aR.z * aR.z);
      if (aR.w > .97) size = 3.;
    } else if (aR.x < .82) {
      int i = int(aR.y * 4.);
      float f = fract(aR.z + t * (.08 + aR.w * .1));
      p = mix(uNodes[i], uNodes[i + 1], f) + aD * .05;
      alpha = .85;
    } else {
      int i = int(aR.y * 5.);
      float a = aR.z * TAU + t * .5;
      p = uNodes[i] + vec3(cos(a), 0., sin(a)) * .78 + aD * .02;
      alpha = .45;
    }
    return rotY(p, uTurn);
  }

  if (s < 3.5) { // DNA: cream strand, gold strand, rungs ending in glowing beads; fades at both ends
    float u = (aR.y - .5) * L;
    vec3 p;
    if (aR.x < .42) p = strand(u, 0.);
    else if (aR.x < .6) { p = strand(u, PI); alpha = .9; }
    else {
      float q = floor(u / .5) * .5 + .25;
      if (aR.x > .95) { p = strand(q, PI); size = 3.2; }
      else { p = mix(strand(q, 0.), strand(q, PI), aR.z); alpha = .7; }
    }
    alpha *= 1. - smoothstep(L * .26, L * .5, abs(p.y));
    return p;
  }

  if (s < 4.5) { // four orbits, one per skill group, five bright beads (skills) on each
    float i = floor(aR.y * 4.);
    float sp = (.12 + i * .035) * (mod(i, 2.) < .5 ? 1. : -1.);
    float a = aR.z * TAU + t * sp;
    if (aR.x > .965) { a = floor(aR.z * 5.) / 5. * TAU + t * sp; size = 3.4; }
    vec3 p = vec3(cos(a), 0., sin(a)) * (1.8 + i * .5) + aD * .035;
    p = rotZ(rotX(p, .32 + i * .1), (i - 1.5) * .16);
    if (aR.x < .07) { p = aD * aR.z * aR.z * .5; alpha = .9; }
    return p;
  }

  if (s < 5.5) { // galaxy: dense core, three arms, inner stars turn faster
    vec3 p;
    if (aR.x < .14) { p = aD * pow(aR.z, 1.5) * .7; p.y *= .5; alpha = .9; }
    else {
      float r = .35 + pow(aR.z, .8) * 3.9;
      float a = floor(aR.y * 3.) / 3. * TAU + r * 1.05 + (aR.w - .5) * .9 / (r * .4 + .5) + t * .16 / (r + .6);
      p = vec3(cos(a) * r, aD.y * .2 * (1. - r / 4.6), sin(a) * r) + aD * .1 * r / 4.;
      if (aR.x > .975) size = 2.6;
    }
    return rotZ(rotX(p, -1.), .25);
  }

  if (s < 6.5) { // curved wall: one outlined card per project, like the archive gallery
    float n = ${PROJECTS.length}.;
    float cell = floor(aR.y * n), cols = ceil(n / 3.);
    float col = mod(cell, cols), row = floor(cell / cols);
    const float W = 1.2, G = .2, RC = 6.;
    vec2 l;
    if (aR.x < .72) {
      float e = aR.z * 4., f = fract(e) - .5;
      l = e < 1. ? vec2(f, -.5) : e < 2. ? vec2(.5, f) : e < 3. ? vec2(-f, .5) : vec2(-.5, -f);
    } else { l = vec2(aR.z, aR.w) - .5; alpha = .3; }
    if (aR.x > .985) { l = vec2(step(.5, aR.z), step(.5, aR.w)) - .5; size = 2.4; }
    l *= W;
    float th = ((col - (cols - 1.) * .5) * (W + G) + l.x) / RC + sin(t * .2) * .05;
    return vec3(sin(th) * RC, (1. - row) * (W + G) + l.y, (1. - cos(th)) * RC);
  }

  // portal: bright ring, thin outer ring, streams spiralling in, soft core
  vec3 p;
  if (aR.x < .5) { float a = aR.z * TAU + t * .06; p = vec3(cos(a), sin(a), 0.) * 2.5 + aD * .09; if (aR.w > .98) size = 3.; }
  else if (aR.x < .62) { float a = aR.z * TAU - t * .04; p = vec3(cos(a), sin(a), 0.) * 3.05 + aD * .02; alpha = .55; }
  else if (aR.x < .9) {
    float f = fract(aR.w + t * .12), r = 2.5 + (1. - f) * (1. - f) * 6.5, a = aR.z * TAU + f * 1.2;
    p = vec3(cos(a) * r, sin(a) * r, (1. - f) * -2.5);
    alpha = f * .8;
  } else { p = aD * aR.z * aR.z * .9; alpha = .8; }
  return rotY(rotX(p, .2), -.45);
}

void main() {
  float sa, sb, aa, ab;
  vec3 a = shape(uA, sa, aa), b = shape(uB, sb, ab);
  // Staggered per particle so the cloud flows from one shape to the next instead of popping
  float m = clamp((uMix - aR.w * .3) / .7, 0., 1.);
  m = m * m * (3. - 2. * m);
  float fly = sin(m * PI);
  vec3 p = mix(a, b, m) + aD * fly * .9;
  p = rotY(p, fly * (aR.x - .5) * 1.4);
  p += sin(vec3(uTime * .6 + aR.x * 40., uTime * .5 + aR.y * 40., uTime * .7 + aR.z * 40.)) * .025;

  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;
  float size = mix(sa, sb, m);
  gl_PointSize = min(64., .05 * (.6 + fract(aR.x * 13.7) * .8) * size * uPx / -mv.z);

  vec3 cream = vec3(.913, .875, .722), gold = vec3(.89, .663, .306), glow = vec3(1., .847, .565);
  vColor = mix(mix(gold, cream, fract(aR.y * 7.3)), glow, step(1.5, size));
  vAlpha = mix(aa, ab, m) * uBright * (.45 + .55 * fract(aR.z * 5.1)) * smoothstep(30., 9., -mv.z);
}
`;

const POINT_FRAG = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = 1. - length(gl_PointCoord - .5) * 2.;
  if (d <= 0.) discard;
  gl_FragColor = vec4(vColor, d * d * vAlpha);
}
`;

// Dust is world-fixed and wraps vertically, so the camera can sink forever through it
const DUST_VERT = /* glsl */ `
uniform float uCamY, uTime, uPx, uTan, uSpeed;
attribute vec4 aR;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float dist = ${CAM_Z}. - position.z;
  float H = dist * uTan * 2.6;
  vec3 p = vec3(position.x * H * 2.6 + sin(uTime * .1 + aR.x * 6.) * .3, uCamY + (fract(position.y - uCamY / H) - .5) * H, position.z);
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = min(48., .045 * (.5 + aR.y) * uPx / -mv.z * (1. + uSpeed * .6));
  vColor = mix(vec3(.913, .875, .722), vec3(.89, .663, .306), aR.w);
  vAlpha = (.18 + .4 * aR.z) * (.6 + .4 * sin(uTime * (.5 + aR.x) + aR.y * 30.))
         * smoothstep(48., 14., dist) * smoothstep(.6, 3., dist) * (1. + uSpeed * .8);
}
`;

const RIBBON_VERT = /* glsl */ `
varying vec2 vUv;
varying float vY;
void main() {
  vUv = uv;
  vY = position.y;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}
`;
const RIBBON_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vUv;
varying float vY;
void main() {
  // Soft band across the ribbon, brighter leading edge; fades out toward both ends of the column
  float v = vUv.y;
  float band = v < .25 ? v / .25 * .95 : v < .6 ? mix(.95, .45, (v - .25) / .35) : mix(.45, 0., (v - .6) / .4);
  float ends = 1. - smoothstep(${(L * .26).toFixed(2)}, ${(L * .5).toFixed(2)}, abs(vY));
  gl_FragColor = vec4(uColor, band * ends * uOpacity);
}
`;

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (v) => v * v * (3 - 2 * v);
const lerp = (a, b, k) => a + (b - a) * k;
// Scroll fraction inside a pinned slide → step index that rests on each step and glides between them
const stepped = (p, n) => {
  const c = clamp01(p) * (n - 1), i = Math.min(n - 2, Math.floor(c));
  return n < 2 ? 0 : i + smooth(clamp01((c - i - .2) / .6));
};

function setup(THREE, canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  } catch (err) {
    console.warn('WebGL is not available:', err);
    return;
  }
  const small = matchMedia('(max-width: 800px)').matches;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 1.75));
  renderer.setClearColor('#1a1512');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, .1, 120);
  const tan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));

  // Soft round sprite for the milestone orbs and the halo
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
  const additive = { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending };

  // ---- The travelling cloud ----
  const entity = new THREE.Group();
  scene.add(entity);

  const N = small ? 6000 : 12000;
  const pos = new Float32Array(N * 3), rnd = new Float32Array(N * 4), dir = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    // Scattered start: a wide shell around the cloud, mostly in front of the far fog
    const d = new THREE.Vector3(Math.random() - .5, Math.random() - .5, Math.random() - .5).normalize();
    dir.set([d.x, d.y, d.z], i * 3);
    const r = 5 + Math.random() * 9;
    pos.set([d.x * r * 1.6, d.y * r, Math.min(6, d.z * r)], i * 3);
    rnd.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aR', new THREE.BufferAttribute(rnd, 4));
  geo.setAttribute('aD', new THREE.BufferAttribute(dir, 3));
  const uniforms = {
    uTime: { value: 0 }, uA: { value: 0 }, uB: { value: 1 }, uMix: { value: 0 }, uPx: { value: 1 },
    uBright: { value: 1 }, uTurn: { value: 0 }, uHelix: { value: FRONT },
    uNodes: { value: PIPES[0].map((p) => new THREE.Vector3(...p)) },
  };
  const cloud = new THREE.Points(geo, new THREE.ShaderMaterial({ uniforms, vertexShader: PARTICLE_VERT, fragmentShader: POINT_FRAG, ...additive }));
  cloud.frustumCulled = false;
  entity.add(cloud);

  // DNA ribbons + milestone orbs, only while the cloud is a helix
  const dna = new THREE.Group();
  entity.add(dna);
  const ribbon = (phase, width, color, opacity) => {
    const segs = small ? 500 : 900;
    const p = new Float32Array((segs + 1) * 6), uv = new Float32Array((segs + 1) * 4), index = [];
    for (let i = 0; i <= segs; i++) {
      const u = (i / segs - .5) * L, a = u * TWIST + phase;
      const x = Math.cos(a) * R, z = Math.sin(a) * R;
      p.set([x, u - width / 2, z, x, u + width / 2, z], i * 6);
      uv.set([i / segs, 0, i / segs, 1], i * 4);
      if (i < segs) { const v = i * 2; index.push(v, v + 1, v + 2, v + 1, v + 3, v + 2); }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setIndex(index);
    const m = new THREE.Mesh(g, new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color(color) }, uOpacity: { value: 0 } },
      vertexShader: RIBBON_VERT, fragmentShader: RIBBON_FRAG, side: THREE.DoubleSide, ...additive,
    }));
    m.userData.base = opacity;
    m.frustumCulled = false;
    return m;
  };
  const ribbons = [ribbon(0, .34, CREAM, .45), ribbon(Math.PI, .16, GOLD, .5)];
  dna.add(...ribbons);
  const orbs = Array.from({ length: MILESTONES }, () => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: sprite, color: DIM, ...additive }));
    dna.add(s);
    return s;
  });
  const tint = { on: new THREE.Color(GLOW), past: new THREE.Color(CREAM), next: new THREE.Color(DIM) };

  // Warm halo behind the cloud: cheap atmosphere
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: sprite, color: '#8a5a2a', opacity: .12, ...additive }));
  halo.position.z = -2;
  halo.scale.setScalar(11);
  entity.add(halo);

  // ---- Dust ----
  const DN = small ? 1400 : 3000;
  const dpos = new Float32Array(DN * 3), drnd = new Float32Array(DN * 4);
  for (let i = 0; i < DN; i++) {
    dpos.set([Math.random() - .5, Math.random(), 7 - Math.random() * 42], i * 3);
    drnd.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
  }
  const dgeo = new THREE.BufferGeometry();
  dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
  dgeo.setAttribute('aR', new THREE.BufferAttribute(drnd, 4));
  const dustU = { uCamY: { value: 0 }, uTime: { value: 0 }, uPx: { value: 1 }, uTan: { value: tan }, uSpeed: { value: 0 } };
  const dust = new THREE.Points(dgeo, new THREE.ShaderMaterial({ uniforms: dustU, vertexShader: DUST_VERT, fragmentShader: POINT_FRAG, ...additive }));
  dust.frustumCulled = false;
  scene.add(dust);

  let aspect = 1;
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    aspect = w / h;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    // Pixels per world unit at distance 1: turns world-sized points into screen-sized ones
    uniforms.uPx.value = dustU.uPx.value = renderer.getDrawingBufferSize(new THREE.Vector2()).y / (2 * tan);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // Pointer parallax (fine pointers only): the camera leans a little toward the cursor
  const mouse = { x: 0, y: 0 }, lean = { x: 0, y: 0 };
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const onMove = (e) => { mouse.x = e.clientX / innerWidth * 2 - 1; mouse.y = e.clientY / innerHeight * 2 - 1; };
  if (fine && !still) addEventListener('pointermove', onMove, { passive: true });

  // Eased state, so jumps (anchor links, resizes) glide instead of cutting
  const cur = { stage: 0, x: 0, y: 0, s: 1.4, b: 0, turn: 0, climb: 0, tilt: 0, speed: 0 };
  const nodes = PIPES[0].map((p) => new THREE.Vector3(...p));
  const a = new THREE.Vector3(), b = new THREE.Vector3(), Y = new THREE.Vector3(0, 1, 0);
  let first = true;

  const tick = (f) => {
    const { y, vh, slides } = f;
    const t = still ? 0 : f.t;
    if (slides.length < 2) return;

    // Stage: rests on a slide while it fills the screen (or while it is pinned), flows to the next in between
    let stage = 0;
    for (let i = 0; i < slides.length; i++) {
      const s = slides[i], rest = s.top + Math.max(0, s.h - vh);
      if (y >= s.top) stage = y <= rest ? i : i + clamp01((y - rest) / Math.max(1, (slides[i + 1]?.top ?? rest) - rest));
    }
    stage = Math.min(STAGES - 1, stage);
    const pinned = (id) => {
      const s = slides.find((x) => x.id === id);
      return s ? (y - s.top) / Math.max(1, s.h - vh) : 0;
    };

    const k = first || still ? 1 : 1 - Math.exp(-f.dt * 6);
    first = false;
    cur.stage = lerp(cur.stage, stage, k);
    cur.turn = lerp(cur.turn, stepped(pinned('work'), FEATURED), k);
    cur.climb = lerp(cur.climb, stepped(pinned('experience'), MILESTONES), k);
    cur.speed = lerp(cur.speed, clamp01(Math.abs(f.v) / 4000), 1 - Math.exp(-f.dt * 4));
    cur.tilt = lerp(cur.tilt, still ? 0 : Math.max(-.2, Math.min(.2, f.v * .00005)), 1 - Math.exp(-f.dt * 3));

    // Nothing to draw while the hero still covers the screen
    if (y < 1 && cur.stage < .01) return;

    const A = Math.min(STAGES - 2, Math.floor(cur.stage)), m = cur.stage - A;
    const ease = smooth(clamp01((m - .1) / .8));
    uniforms.uA.value = A;
    uniforms.uB.value = A + 1;
    uniforms.uMix.value = clamp01((m - .1) / .8);
    uniforms.uTime.value = dustU.uTime.value = t;

    // Layout for this point between two slides
    const narrow = aspect < 1;
    const table = narrow ? NARROW : WIDE;
    const fit = narrow ? Math.min(1.5, Math.max(1, aspect / .5)) : Math.min(1, aspect / 1.6);
    const spread = narrow ? 1 : Math.min(1.15, aspect / 1.78);
    const [x0, y0, s0, b0] = table[A], [x1, y1, s1, b1] = table[A + 1];
    const camY = -y * (2 * CAM_Z * tan) / vh;

    lean.x = lerp(lean.x, mouse.x, 1 - Math.exp(-f.dt * 2));
    lean.y = lerp(lean.y, mouse.y, 1 - Math.exp(-f.dt * 2));
    camera.position.set(lean.x * .45, camY - lean.y * .3, CAM_Z);
    camera.lookAt(0, camY, 0);
    const fov = FOV + cur.speed * 3;
    if (Math.abs(camera.fov - fov) > .01) { camera.fov = fov; camera.updateProjectionMatrix(); }

    entity.position.set(lerp(x0, x1, ease) * spread, camY + lerp(y0, y1, ease), 0);
    entity.scale.setScalar(lerp(s0, s1, ease) * fit);
    entity.rotation.x = cur.tilt;
    uniforms.uBright.value = lerp(b0, b1, ease);

    // Work: the pipeline reshapes per case and turns a quarter per case
    const ci = Math.min(PIPES.length - 2, Math.floor(cur.turn)), cf = cur.turn - ci;
    for (let i = 0; i < 5; i++) nodes[i].lerpVectors(a.set(...PIPES[ci % PIPES.length][i]), b.set(...PIPES[(ci + 1) % PIPES.length][i]), cf);
    uniforms.uNodes.value = nodes;
    uniforms.uTurn.value = cur.turn * Math.PI / 2 + t * .05;

    // Experience: the strand screws upward one turn per milestone, so it seems to carry the orbs up with it
    uniforms.uHelix.value = -cur.climb * GAP * TWIST + FRONT;
    const helixW = clamp01(1 - Math.abs(cur.stage - 3) * 1.6);
    dna.visible = helixW > .001;
    if (dna.visible) {
      for (const r of ribbons) {
        r.rotation.y = -uniforms.uHelix.value;
        r.material.uniforms.uOpacity.value = r.userData.base * helixW * uniforms.uBright.value;
      }
      const act = Math.round(cur.climb);
      orbs.forEach((o, i) => {
        const oy = (cur.climb - i) * GAP;
        o.position.set(Math.cos(FRONT) * R, oy, Math.sin(FRONT) * R);
        const on = i === act;
        o.material.color.lerp(on ? tint.on : i < act ? tint.past : tint.next, k);
        const pulse = on && !still ? 1 + Math.sin(t * 1.9) * .12 : 1;
        o.scale.setScalar(o.scale.x + ((on ? 1.1 : i < act ? .6 : .45) * pulse - o.scale.x) * k);
        o.material.opacity = helixW * (1 - smooth(clamp01((Math.abs(oy) - L * .2) / (L * .2))));
      });
    }
    halo.material.opacity = .12 * uniforms.uBright.value;

    dustU.uCamY.value = camY;
    dustU.uSpeed.value = cur.speed;
    renderer.render(scene, camera);

    // Work, wide screens: hand the node positions (CSS px) to the flow labels so they ride the 3D nodes
    const pipeW = clamp01(1 - Math.abs(cur.stage - 2) * 2.5);
    f.nodes = null;
    if (!narrow && pipeW > 0 && innerWidth > 1024) {
      const { clientWidth: w, clientHeight: h } = canvas;
      const c = a.setFromMatrixPosition(entity.matrixWorld).project(camera), cx = (c.x + 1) / 2 * w;
      f.nodes = { w: pipeW, pts: nodes.map((n) => {
        const p = b.copy(n).applyAxisAngle(Y, uniforms.uTurn.value);
        entity.localToWorld(p).project(camera);
        const x = (p.x + 1) / 2 * w;
        return [x, (1 - p.y) / 2 * h, x < cx];
      }) };
    }
  };

  // Compile shaders and draw once up front so the first scroll out of the hero never stalls
  renderer.compile(scene, camera);
  const off = onFrame(tick);

  return () => {
    off();
    ro.disconnect();
    removeEventListener('pointermove', onMove);
    scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); });
    sprite.dispose();
    renderer.dispose();
  };
}
