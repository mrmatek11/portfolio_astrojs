// Kamienny dysk 3D w tle strony głównej.
// Zero zewnętrznych assetów: mapa wysokości (rzeźbienia, runy, rysy) jest
// generowana proceduralnie na canvasie, a geometria to siatka biegunowa
// z displacementem. Ładowane leniwie, z adaptacyjną rozdzielczością.
import {
  ACESFilmicToneMapping,
  AmbientLight,
  BufferGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshStandardMaterial,
  NoColorSpace,
  PerspectiveCamera,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  WebGLRenderer,
} from 'three';

type Options = {
  glyphs: string[];
  reducedMotion?: boolean;
  onReady?: () => void;
};

// ————————————————————————————————————————————————————————————— utils

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TAU = Math.PI * 2;

// Dodatkowe runy do pierścienia z inskrypcjami (układ 144×144 jak glify projektów).
const RUNES = [
  'M40 30 V110 M40 30 L100 60 L40 90',
  'M30 110 L70 30 L110 110',
  'M70 25 V115 M40 55 L70 25 L100 55',
  'M35 35 L105 105 M105 35 L35 105',
  'M40 110 V30 L100 110 V30',
  'M70 25 A45 45 0 1 0 70.1 25 M70 50 V90',
  'M35 40 H105 M70 40 V110 M45 110 H95',
  'M40 30 Q110 70 40 110',
  'M30 70 H110 M70 30 L110 70 L70 110',
  'M45 30 V110 M95 30 V110 M45 70 H95',
];

// ————————————————————————————————————————————————————————————— heightmap

function noiseOctaves(ctx: CanvasRenderingContext2D, S: number, rand: () => number, octaves: [number, number][]) {
  const tmp = document.createElement('canvas');
  const g = tmp.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  for (const [cells, alpha] of octaves) {
    tmp.width = tmp.height = cells;
    const img = g.createImageData(cells, cells);
    for (let i = 0; i < cells * cells; i++) {
      const v = rand() * 255;
      img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
      img.data[i * 4 + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    ctx.globalAlpha = alpha;
    ctx.drawImage(tmp, 0, 0, S, S);
  }
  ctx.globalAlpha = 1;
}

function makeHeightMap(S: number, glyphs: string[], seed = 11) {
  const rand = mulberry32(seed);
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const ctx = cv.getContext('2d')!;
  const C = S / 2;
  const U = S / 2; // promień dysku = 1 → U px
  const px = (f: number) => f * U;
  const k = S / 2048; // skala szczegółów względem rozdzielczości

  // Baza: szary + szum kamienia.
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, S, S);
  noiseOctaves(ctx, S, rand, [
    [5, 0.45],
    [10, 0.35],
    [20, 0.22],
    [40, 0.16],
    [80, 0.1],
    [160, 0.08],
    [S / 4, 0.06],
    [S / 2, 0.05],
  ]);

  // Rzeźbienia rysujemy na trzech przezroczystych warstwach i każdą
  // nakładamy jednym rozmyciem — zamiast filtra przy każdej kresce.
  const layer = () => {
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const g = c.getContext('2d')!;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    return { c, g };
  };
  const soft = layer(); // duże, miękkie formy
  const mid = layer(); // rowki, runy, szprychy, pęknięcia
  const fine = layer(); // rysy i wżery

  const BLACK = (a: number) => `rgba(0,0,0,${a})`;
  const WHITE = (a: number) => `rgba(255,255,255,${a})`;
  const ring = (g: CanvasRenderingContext2D, r: number, w: number, color: string) => {
    g.beginPath();
    g.arc(C, C, px(r), 0, TAU);
    g.lineWidth = px(w);
    g.strokeStyle = color;
    g.stroke();
  };

  // — soft: wklęsła tarcza, podniesiona obręcz
  soft.g.beginPath();
  soft.g.arc(C, C, px(0.7), 0, TAU);
  soft.g.fillStyle = BLACK(0.12);
  soft.g.fill();
  ring(soft.g, 0.965, 0.07, WHITE(0.22));

  // — mid: rowki pierścieni
  ring(mid.g, 0.925, 0.014, BLACK(0.8));
  ring(mid.g, 0.755, 0.012, BLACK(0.8));
  ring(mid.g, 0.715, 0.026, BLACK(0.7));
  ring(mid.g, 0.685, 0.006, BLACK(0.55));
  ring(mid.g, 0.14, 0.008, BLACK(0.7));
  ring(mid.g, 0.055, 0.006, BLACK(0.6));

  // Pierścień inskrypcji: komórki rozdzielone rowkami, w każdej runa.
  const pool = [...glyphs, ...RUNES];
  const cells = 30;
  const seps = new Path2D();
  let a0 = rand() * TAU;
  mid.g.strokeStyle = BLACK(0.85);
  for (let n = 0; n < cells; n++) {
    const a1 = a0 + (TAU / cells) * (0.85 + rand() * 0.3);
    seps.moveTo(C + Math.cos(a1) * px(0.755), C + Math.sin(a1) * px(0.755));
    seps.lineTo(C + Math.cos(a1) * px(0.925), C + Math.sin(a1) * px(0.925));
    // lekko wypukły blok
    soft.g.beginPath();
    soft.g.arc(C, C, px(0.84), a0 + 0.02, a1 - 0.02);
    soft.g.lineWidth = px(0.13);
    soft.g.strokeStyle = WHITE(0.06 + rand() * 0.08);
    soft.g.stroke();
    // runa
    const m = (a0 + a1) / 2;
    const size = px(0.125);
    mid.g.save();
    mid.g.translate(C + Math.cos(m) * px(0.84), C + Math.sin(m) * px(0.84));
    mid.g.rotate(m + Math.PI / 2);
    mid.g.scale(size / 144, size / 144);
    mid.g.translate(-72, -72);
    mid.g.lineWidth = 15;
    mid.g.stroke(new Path2D(pool[Math.floor(rand() * pool.length)]));
    mid.g.restore();
    a0 = a1;
  }
  mid.g.lineWidth = px(0.01);
  mid.g.strokeStyle = BLACK(0.75);
  mid.g.stroke(seps);

  // Szprychy z rozgałęzieniami (figury) w tarczy.
  const spokes = new Path2D();
  const branches = new Path2D();
  for (let n = 0; n < 7; n++) {
    const a = (n / 7) * TAU + (rand() - 0.5) * 0.5;
    const x0 = C + Math.cos(a) * px(0.14);
    const y0 = C + Math.sin(a) * px(0.14);
    const x1 = C + Math.cos(a) * px(0.68);
    const y1 = C + Math.sin(a) * px(0.68);
    spokes.moveTo(x0, y0);
    spokes.lineTo(x1, y1);
    for (let b = 0; b < 3; b++) {
      const t = 0.3 + rand() * 0.6;
      const bx = x0 + (x1 - x0) * t;
      const by = y0 + (y1 - y0) * t;
      const ba = a + (rand() < 0.5 ? -1 : 1) * (0.5 + rand() * 0.5);
      const len = px(0.04 + rand() * 0.08);
      branches.moveTo(bx, by);
      branches.lineTo(bx + Math.cos(ba) * len, by + Math.sin(ba) * len);
    }
  }
  mid.g.strokeStyle = BLACK(0.85);
  mid.g.lineWidth = px(0.012);
  mid.g.stroke(spokes);
  mid.g.lineWidth = px(0.006);
  mid.g.stroke(branches);

  // Duże glify projektów wyryte w tarczy, między szprychami.
  glyphs.forEach((d, n) => {
    const a = (n / glyphs.length) * TAU + 0.45 + rand() * 0.3;
    const r = 0.36 + rand() * 0.14;
    const size = px(0.2 + rand() * 0.06);
    mid.g.save();
    mid.g.translate(C + Math.cos(a) * px(r), C + Math.sin(a) * px(r));
    mid.g.rotate(a + Math.PI / 2 + (rand() - 0.5) * 0.4);
    mid.g.scale(size / 144, size / 144);
    mid.g.translate(-72, -72);
    mid.g.lineWidth = 9;
    mid.g.strokeStyle = BLACK(0.8);
    mid.g.stroke(new Path2D(d));
    mid.g.restore();
  });

  // Pęknięcia od krawędzi do środka.
  const cracks = new Path2D();
  for (let n = 0; n < 6; n++) {
    let a = rand() * TAU;
    let r = 1;
    cracks.moveTo(C + Math.cos(a) * px(r), C + Math.sin(a) * px(r));
    const steps = 20 + Math.floor(rand() * 30);
    for (let s = 0; s < steps; s++) {
      r -= 0.008 + rand() * 0.018;
      a += (rand() - 0.5) * 0.06;
      cracks.lineTo(C + Math.cos(a) * px(r), C + Math.sin(a) * px(r));
    }
  }
  mid.g.lineWidth = Math.max(1, 2.5 * k);
  mid.g.strokeStyle = BLACK(0.7);
  mid.g.stroke(cracks);

  // — soft: wyszczerbienia obręczy
  soft.g.fillStyle = BLACK(0.4);
  for (let n = 0; n < 40; n++) {
    const a = rand() * TAU;
    const r = 0.94 + rand() * 0.06;
    soft.g.beginPath();
    soft.g.arc(C + Math.cos(a) * px(r), C + Math.sin(a) * px(r), px(0.008 + rand() * 0.03), 0, TAU);
    soft.g.globalAlpha = 0.6 + rand() * 0.4;
    soft.g.fill();
  }
  soft.g.globalAlpha = 1;

  // — fine: ślady narzędzi w dwóch kierunkach + wżery; grupowane po jasności.
  const dirs = [rand() * Math.PI, rand() * Math.PI];
  const buckets = [0.15, 0.25, 0.35].map(() => new Path2D());
  for (let n = 0; n < 1400; n++) {
    const r = Math.sqrt(rand()) * 0.98;
    const a = rand() * TAU;
    const x = C + Math.cos(a) * px(r);
    const y = C + Math.sin(a) * px(r);
    const d = dirs[n % 2] + (rand() - 0.5) * 0.5;
    const len = px(0.008 + rand() * 0.05);
    const p = buckets[n % 3];
    p.moveTo(x, y);
    p.lineTo(x + Math.cos(d) * len, y + Math.sin(d) * len);
  }
  fine.g.lineWidth = Math.max(1, 1.8 * k);
  [0.15, 0.25, 0.35].forEach((al, n) => {
    fine.g.strokeStyle = BLACK(al);
    fine.g.stroke(buckets[n]);
  });
  const pits = new Path2D();
  for (let n = 0; n < 500; n++) {
    const r = Math.sqrt(rand()) * 0.99;
    const a = rand() * TAU;
    const x = C + Math.cos(a) * px(r);
    const y = C + Math.sin(a) * px(r);
    const pr = Math.max(0.8, px(0.001 + rand() * 0.003));
    pits.moveTo(x + pr, y);
    pits.arc(x, y, pr, 0, TAU);
  }
  fine.g.fillStyle = BLACK(0.5);
  fine.g.fill(pits);

  // Złożenie warstw — trzy operacje rozmycia łącznie.
  // (Safari ignoruje ctx.filter — wtedy rzeźbienia są po prostu ostrzejsze.)
  const comp = (c: HTMLCanvasElement, blur: number, alpha = 1) => {
    ctx.filter = blur ? `blur(${blur * k}px)` : 'none';
    ctx.globalAlpha = alpha;
    ctx.drawImage(c, 0, 0);
  };
  comp(soft.c, 6);
  comp(mid.c, 1.6);
  comp(mid.c, 0, 0.4); // ostra krawędź rowka na miękkim spadzie
  comp(fine.c, 0.6);
  ctx.filter = 'none';
  ctx.globalAlpha = 1;
  return cv;
}

// Mapa koloru z mapy wysokości: rowki ciemniejsze (brud), wypukłości jaśniejsze.
// Filtr canvas działa na GPU — bez odczytu pikseli do JS.
function makeAlbedo(height: HTMLCanvasElement) {
  const S = height.width;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const ctx = cv.getContext('2d')!;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, S, S);
  ctx.filter = 'contrast(2.1) brightness(0.62)';
  ctx.drawImage(height, 0, 0);
  ctx.filter = 'none';
  return cv;
}

// ————————————————————————————————————————————————————————————— geometry

function edgeFn(seed: number) {
  const rand = mulberry32(seed);
  const waves = Array.from({ length: 6 }, (_, k) => ({ f: 2 + k * 3 + Math.floor(rand() * 3), p: rand() * TAU, a: 0.006 / (k + 1) }));
  return (a: number) => 1 + waves.reduce((s, w) => s + Math.sin(a * w.f + w.p) * w.a, 0);
}

function discTop(nr: number, na: number, edge: (a: number) => number) {
  const pos: number[] = [0, 0, 0];
  const uv: number[] = [0.5, 0.5];
  for (let i = 1; i <= nr; i++) {
    const r = i / nr;
    for (let j = 0; j < na; j++) {
      const a = (j / na) * TAU;
      const R = r * edge(a);
      const x = Math.cos(a) * R;
      const y = Math.sin(a) * R;
      pos.push(x, y, 0);
      uv.push(0.5 + x * 0.5, 0.5 + y * 0.5);
    }
  }
  const idx: number[] = [];
  for (let j = 0; j < na; j++) idx.push(0, 1 + j, 1 + ((j + 1) % na));
  for (let i = 1; i < nr; i++) {
    for (let j = 0; j < na; j++) {
      const a = 1 + (i - 1) * na + j;
      const b = 1 + (i - 1) * na + ((j + 1) % na);
      const c = 1 + i * na + j;
      const d = 1 + i * na + ((j + 1) % na);
      idx.push(a, c, b, b, c, d);
    }
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new Float32BufferAttribute(uv, 2));
  const n = new Float32Array(pos.length);
  for (let i = 2; i < n.length; i += 3) n[i] = 1;
  g.setAttribute('normal', new Float32BufferAttribute(n, 3));
  g.setIndex(idx);
  return g;
}

function discSide(na: number, edge: (a: number) => number, topZ: (a: number) => number, depth: number) {
  const hs = 6;
  const pos: number[] = [];
  const uv: number[] = [];
  const nor: number[] = [];
  for (let k = 0; k <= hs; k++) {
    const t = k / hs;
    for (let j = 0; j <= na; j++) {
      const a = (j / na) * TAU;
      // Krawędź lekko się zwęża i "kruszy" ku dołowi.
      const R = edge(a) * (1 - t * 0.035) - (k === 0 ? 0 : Math.sin(a * 37 + k) * 0.004);
      const z = topZ(a) * (1 - t) - depth * t;
      pos.push(Math.cos(a) * R, Math.sin(a) * R, z);
      uv.push((j / na) * 12, t * 0.6);
      nor.push(Math.cos(a), Math.sin(a), 0.15);
    }
  }
  const idx: number[] = [];
  const row = na + 1;
  for (let k = 0; k < hs; k++) {
    for (let j = 0; j < na; j++) {
      const a = k * row + j;
      const b = a + 1;
      const c = a + row;
      const d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new Float32BufferAttribute(uv, 2));
  g.setAttribute('normal', new Float32BufferAttribute(nor, 3));
  g.setIndex(idx);
  return g;
}

// ————————————————————————————————————————————————————————————— scene

export function mountStoneDisc(canvas: HTMLCanvasElement, opts: Options) {
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;
  const maxDpr = small ? 1.5 : 1.5;
  let dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

  const renderer = new WebGLRenderer({ canvas, antialias: !small, powerPreference: 'high-performance' });
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x0b0b0a, 1);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  scene.background = new Color(0x0b0b0a);
  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 10);

  // Tekstury
  const S = small ? 1024 : 2048;
  const debug = /[?&]debug\b/.test(location.search);
  let tm = performance.now();
  const heightCv = makeHeightMap(S, opts.glyphs);
  if (debug) console.info('[stone] heightmap', Math.round(performance.now() - tm), 'ms');
  tm = performance.now();
  const albedoCv = makeAlbedo(heightCv);
  if (debug) console.info('[stone] albedo', Math.round(performance.now() - tm), 'ms');
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const heightTex = new CanvasTexture(heightCv);
  heightTex.colorSpace = NoColorSpace;
  heightTex.anisotropy = aniso;
  const albedoTex = new CanvasTexture(albedoCv);
  albedoTex.colorSpace = SRGBColorSpace;
  albedoTex.anisotropy = aniso;

  // Tekstura boku — wycinek obręczy z tej samej mapy, powtarzany.
  const sideTex = new CanvasTexture(albedoCv);
  sideTex.colorSpace = SRGBColorSpace;
  sideTex.wrapS = sideTex.wrapT = RepeatWrapping;
  const sideBump = new CanvasTexture(heightCv);
  sideBump.colorSpace = NoColorSpace;
  sideBump.wrapS = sideBump.wrapT = RepeatWrapping;

  const DISP = 0.06;
  const BIAS = -DISP * 0.5;

  const topMat = new MeshStandardMaterial({
    color: 0xa39f98,
    map: albedoTex,
    roughness: 0.9,
    metalness: 0,
    bumpMap: heightTex,
    bumpScale: 4,
    displacementMap: heightTex,
    displacementScale: DISP,
    displacementBias: BIAS,
  });
  const sideMat = new MeshStandardMaterial({
    color: 0x6f6b65,
    map: sideTex,
    roughness: 0.96,
    metalness: 0,
    bumpMap: sideBump,
    bumpScale: 3,
  });

  // Obręcz jest podniesiona (~0.6 na mapie) — bok zaczyna się na tej wysokości.
  const RIM_Z = 0.6 * DISP + BIAS;
  const topZ = () => RIM_Z;

  const edge = edgeFn(7);
  const nr = small ? 110 : 190;
  const na = small ? 420 : 760;
  const top = new Mesh(discTop(nr, na, edge), topMat);
  const side = new Mesh(discSide(small ? 240 : 420, edge, topZ, 0.13), sideMat);

  const spin = new Group();
  spin.add(top, side);
  const tilt = new Group();
  tilt.add(spin);
  scene.add(tilt);

  // Światła: ostre, ślizgające się światło kluczowe podkreśla rzeźbienia.
  const key = new DirectionalLight(0xf4efe6, 0);
  key.position.set(-6, 5, 2.5);
  const rim = new DirectionalLight(0x9fb3c9, 0);
  rim.position.set(6, -3, 2);
  const amb = new AmbientLight(0xffffff, 0.035);
  scene.add(key, rim, amb);

  // Kompozycja zależna od proporcji ekranu.
  const layout = { x: 0, y: 0, s: 1 };
  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const aspect = w / h;
    const viewH = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
    const viewW = viewH * aspect;
    // Dysk jest duży i wychodzi poza kadr — jak monumentalny obiekt.
    if (aspect < 0.9) {
      layout.s = viewW * 0.95;
      layout.x = viewW * 0.18;
      layout.y = viewH * 0.2;
    } else {
      layout.s = Math.max(viewW * 0.36, viewH * 0.86);
      layout.x = -viewW * 0.08;
      layout.y = viewH * 0.1;
    }
    tilt.scale.setScalar(layout.s);
    if (!running) render(performance.now());
  };

  // Stan interakcji
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e: PointerEvent) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  const t0 = performance.now();
  let last = t0;
  let raf = 0;
  let running = false;
  let firstFrame = true;
  // adaptacyjna jakość
  let acc = 0;
  let frames = 0;

  const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

  function render(now: number) {
    const t = (now - t0) / 1000;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    // Wejście: dysk wyłania się z ciemności i dokręca do pozycji.
    const intro = opts.reducedMotion ? 1 : ease(t / 2.8);
    key.intensity = 4.6 * intro;
    rim.intensity = 0.55 * intro;

    pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 2.5);
    pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 2.5);

    if (!opts.reducedMotion) spin.rotation.z -= dt * 0.035;
    tilt.rotation.set(-1.12 + pointer.y * 0.05 + (1 - intro) * 0.25, 0.3 + pointer.x * 0.06, -0.52);
    tilt.position.set(layout.x, layout.y + Math.sin(t * 0.35) * 0.04 * layout.s * 0.3, 0);

    // Światło podąża za kursorem — rzeźbienia "grają" w świetle.
    key.position.set(-6 + pointer.x * 4, 5 - pointer.y * 2.5, 2.5 + pointer.x * 1.2);

    renderer.render(scene, camera);

    if (firstFrame) {
      firstFrame = false;
      opts.onReady?.();
    }

    // Jeśli klatki są zbyt wolne — obniż rozdzielczość renderu.
    acc += dt;
    frames++;
    if (frames === 90) {
      const avg = acc / frames;
      if (avg > 0.024 && dpr > 0.75) {
        dpr = Math.max(0.75, dpr - 0.25);
        renderer.setPixelRatio(dpr);
        resize();
      }
      acc = 0;
      frames = 0;
    }
  }

  spin.rotation.z = 0.6;

  const loop = (now: number) => {
    render(now);
    raf = requestAnimationFrame(loop);
  };
  const start = () => {
    if (running || opts.reducedMotion) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const onVis = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVis);

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  if (opts.reducedMotion) {
    render(performance.now());
  } else {
    start();
  }

  return () => {
    stop();
    ro.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    window.removeEventListener('pointermove', onMove);
    [heightTex, albedoTex, sideTex, sideBump].forEach((t) => t.dispose());
    [topMat, sideMat].forEach((m) => m.dispose());
    [top.geometry, side.geometry].forEach((g) => g.dispose());
    renderer.dispose();
  };
}
