import{a as ge,f as Fe,t as wt}from"../chunks/Dc8eBwyL.js";import{h as Bt}from"../chunks/DJ4YphiE.js";import{p as vt,x as ct,o as pt,n as de,v as Le,w as Ae,A as ht,B as Ct,g as S,s as we,m as ke,l as ut,z as qt,C as ft,D as Pt,$ as Dt}from"../chunks/BL9fkejt.js";import{o as Ft}from"../chunks/Ckq-xhbe.js";import{p as st,b as kt}from"../chunks/BAf8Y23S.js";import{i as mt}from"../chunks/CDrofdsT.js";import{d as Nt,a as De,s as At}from"../chunks/CwFc2ePr.js";import{s as ye}from"../chunks/Doyp--bU.js";import{s as qe}from"../chunks/opVOIlUi.js";import{i as rt}from"../chunks/B2q2V2cB.js";import{e as Ut}from"../chunks/Buj3XSrE.js";let lt=2*Math.PI,It=[{kind:0,x:.31,y:.34,heading:.35,size:.23,lift:1,seed:.13},{kind:1,x:.69,y:.32,heading:2.7,size:.22,lift:1.1,seed:.91},{kind:2,x:.47,y:.68,heading:-.5,size:.22,lift:.95,seed:.34},{kind:3,x:.21,y:.61,heading:-.9,size:.21,lift:1.05,seed:.72}],Ue=(B,j,v)=>Math.min(v,Math.max(j,B)),jt=(B,j,v)=>{let x=Ue((v-B)/(j-B),0,1);return x*x*(3-2*x)},Rt=B=>Math.atan2(Math.sin(B),Math.cos(B)),dt=B=>-.03+1.55*B/63,Ne=B=>Math.round((B- -.03)/1.55*63),Ke=[{x:.77,y:.3,length:42,width:31,height:18,angle:.35,seed:.21,kind:0},{x:.85,y:.5,length:20,width:15,height:9,angle:-.7,seed:.64,kind:2},{x:.36,y:.66,length:30,width:22,height:13,angle:-.25,seed:.47,kind:1}],Mt=[{x:.05,y:.84,angle:-.55,spread:1.3,count:9,root:20,length:[60,150],width:[4,8]},{x:.9,y:.92,angle:-2.35,spread:1.3,count:7,root:20,length:[60,150],width:[4,8]},{x:.33,y:.03,angle:1.25,spread:1.3,count:6,root:20,length:[60,150],width:[4,8]}],Ot=1+Math.floor(2147483645*Math.random()),Te=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
`,Je=`#version 300 es
out vec2 v_uv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  v_uv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,$e=`
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 w = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1, 0)), w.x),
             mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), w.x), w.y);
}
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
// Simplex noise (Ashima Arts / Stefan Gustavson, MIT) with its analytic gradient.
float snoiseGrad(vec3 v, out vec3 grad) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  vec4 m2 = m * m;
  vec4 m4 = m2 * m2;
  vec4 pdotx = vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3));
  vec4 temp = m2 * m * pdotx;
  grad = -8.0 * (temp.x * x0 + temp.y * x1 + temp.z * x2 + temp.w * x3);
  grad += m4.x * p0 + m4.y * p1 + m4.z * p2 + m4.w * p3;
  grad *= 105.0;
  return 105.0 * dot(m4, pdotx);
}
float snoise(vec3 v) { vec3 g; return snoiseGrad(v, g); }
`,Ht=`${Te}
in vec2 v_uv;
uniform sampler2D u_state;
uniform vec2 u_size;
uniform float u_dt;
uniform float u_stiffness;
uniform vec2 u_damping;
uniform float u_smoothing;
uniform int u_dropCount;
uniform vec4 u_drops[32];
uniform int u_splashCount;
uniform vec4 u_splashes[32];
uniform int u_pushCount;
uniform vec4 u_pushes[16];
out vec4 o;
vec4 at(ivec2 c, ivec2 mx) { return texelFetch(u_state, clamp(c, ivec2(0), mx), 0); }
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  ivec2 mx = textureSize(u_state, 0) - 1;
  vec4 st = texelFetch(u_state, c, 0);
  vec4 sum4 = at(c + ivec2(0, 1), mx) + at(c - ivec2(0, 1), mx) + at(c + ivec2(1, 0), mx) + at(c - ivec2(1, 0), mx);
  vec4 sumD = at(c + ivec2(1, 1), mx) + at(c + ivec2(-1, 1), mx) + at(c + ivec2(1, -1), mx) + at(c + ivec2(-1, -1), mx);
  vec2 lap = (4.0 * sum4.rb + sumD.rb - 20.0 * st.rb) / 6.0;
  vec2 p = vec2(v_uv.x, 1.0 - v_uv.y) * u_size;
  vec2 vel = (st.ga + u_stiffness * u_dt * lap) * u_damping;
  // pushes accelerate the big field, like a body shoving water, so moving fish leave a proper wake
  for (int i = 0; i < u_pushCount; i++) {
    float r = length(p - u_pushes[i].xy) / u_pushes[i].z;
    if (r < 1.0) vel.y += u_pushes[i].w * u_dt * (0.5 + 0.5 * cos(3.14159265 * r));
  }
  // a touch of diffusion wipes out grid-sized noise while barely touching real ripples
  vec2 h = st.rb + u_dt * vel + u_smoothing * lap;
  float edge = min(min(p.x, u_size.x - p.x), min(p.y, u_size.y - p.y));
  float absorb = mix(0.94, 1.0, smoothstep(0.0, 36.0, edge));
  h *= absorb;
  vel *= absorb;
  for (int i = 0; i < u_dropCount; i++) {
    float r = length(p - u_drops[i].xy) / u_drops[i].z;
    if (r < 1.0) h.x += u_drops[i].w * (0.5 + 0.5 * cos(3.14159265 * r));
  }
  for (int i = 0; i < u_splashCount; i++) {
    float r = length(p - u_splashes[i].xy) / u_splashes[i].z;
    if (r < 1.0) h.y += u_splashes[i].w * (0.5 + 0.5 * cos(3.14159265 * r));
  }
  o = vec4(clamp(h.x, -4.0, 4.0), vel.x, clamp(h.y, -6.0, 6.0), vel.y);
}`,Gt=`${Te}${$e}
in vec2 v_uv;
uniform sampler2D u_state;
uniform vec2 u_size;
uniform float u_time;
uniform float u_scale;
// x = height and curvature scale, y = how much the ripples bend the caustic grid
uniform vec2 u_fine;
uniform vec2 u_big;
out vec4 o;
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  ivec2 ts = textureSize(u_state, 0);
  ivec2 mx = ts - 1;
  vec2 texel = u_size / vec2(ts);
  vec4 h = texelFetch(u_state, c, 0);
  vec4 hr = texelFetch(u_state, clamp(c + ivec2(1, 0), ivec2(0), mx), 0);
  vec4 hl = texelFetch(u_state, clamp(c - ivec2(1, 0), ivec2(0), mx), 0);
  vec4 hu = texelFetch(u_state, clamp(c + ivec2(0, 1), ivec2(0), mx), 0);
  vec4 hd = texelFetch(u_state, clamp(c - ivec2(0, 1), ivec2(0), mx), 0);
  vec2 fineSlope = vec2((hr.r - hl.r) / (2.0 * texel.x), (hd.r - hu.r) / (2.0 * texel.y));
  vec2 bigSlope = vec2((hr.b - hl.b) / (2.0 * texel.x), (hd.b - hu.b) / (2.0 * texel.y));
  vec2 bigBend = bigSlope / (1.0 + length(bigSlope) * 1.5);
  vec4 lap = (hr + hl + hu + hd - 4.0 * h) / (texel.x * texel.y);

  vec2 p = vec2(v_uv.x, 1.0 - v_uv.y) * u_size;
  const float angle = 0.7;
  const float aniso = 1.06;
  float ca = cos(angle), sa = sin(angle);
  mat2 M = mat2(ca * u_scale * aniso, -sa * u_scale / aniso, sa * u_scale * aniso, ca * u_scale / aniso);
  vec2 q = M * p;
  float t = u_time;
  vec3 g;
  float swell = snoiseGrad(vec3(q + vec2(t * 0.05, t * 0.032), t * 0.3), g);
  vec2 slope = g.xy;
  swell += 0.42 * snoiseGrad(vec3(q * 1.97 + vec2(-t * 0.045, t * 0.07) + 11.3, t * 0.42), g);
  slope += 0.42 * 1.97 * g.xy;
  swell += 0.15 * snoiseGrad(vec3(q * 4.1 + vec2(t * 0.09, -t * 0.06) - 7.1, t * 0.6), g);
  slope += 0.15 * 4.1 * g.xy;
  slope = transpose(M) * slope;
  o = vec4(swell + h.r * u_fine.x + h.b * u_big.x, slope + fineSlope * u_fine.x * u_fine.y + bigBend * u_big.x * u_big.y, lap.r * u_fine.x + lap.b * u_big.x);
}`,Vt=`#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 a_pos;
uniform sampler2D u_surface;
uniform vec2 u_size;
uniform float u_depth;
out vec2 v_old;
out vec2 v_new;
void main() {
  vec4 s = texture(u_surface, vec2(a_pos.x / u_size.x, 1.0 - a_pos.y / u_size.y));
  vec2 np = a_pos + u_depth * s.yz;
  v_old = a_pos;
  v_new = np;
  gl_Position = vec4(np.x / u_size.x * 2.0 - 1.0, 1.0 - np.y / u_size.y * 2.0, 0.0, 1.0);
}`,Yt=`${Te}
in vec2 v_old;
in vec2 v_new;
out vec4 o;
void main() {
  vec2 ox = dFdx(v_old), oy = dFdy(v_old);
  vec2 nx = dFdx(v_new), ny = dFdy(v_new);
  float oldArea = abs(ox.x * oy.y - ox.y * oy.x);
  float newArea = abs(nx.x * ny.y - nx.y * ny.x);
  float I = min(oldArea / max(newArea, 1e-6), 30.0);
  o = vec4(I, I, I, 1.0);
}`,Wt=`${Te}
in vec2 v_uv;
uniform sampler2D u_tex;
uniform vec2 u_dir;
out vec4 o;
void main() {
  vec4 s = texture(u_tex, v_uv) * 0.2270270270;
  s += texture(u_tex, v_uv + u_dir * 1.3846153846) * 0.3162162162;
  s += texture(u_tex, v_uv - u_dir * 1.3846153846) * 0.3162162162;
  s += texture(u_tex, v_uv + u_dir * 3.2307692308) * 0.0702702703;
  s += texture(u_tex, v_uv - u_dir * 3.2307692308) * 0.0702702703;
  o = s;
}`,Xt=`${Te}${$e}
in vec2 v_uv;
uniform vec2 u_size;
uniform float u_unit;
/** pond px per texel, for anti-aliasing */
uniform float u_pixel;
/** centre x, y in pond px, long axis angle, seed */
uniform vec4 u_stones[${Ke.length}];
/** half length, half width, height in pond px, kind */
uniform vec4 u_stoneSize[${Ke.length}];
/** 0 writes albedo plus how much sunlight reaches the bed (x1.5), 1 writes the bed height */
uniform int u_pass;
uniform float u_heightScale;
out vec4 o;

const int STONE_COUNT = ${Ke.length};
// Sunlight comes from the upper left, the way the fish shadows fall, drifting 0.8px sideways for every px it drops.
const vec2 SUN_DIR = vec2(-0.7914, -0.6115);
const float SUN_SLANT = 0.8;
const vec3 SUN = vec3(-0.4943, -0.3819, 0.7809);

vec3 voronoi(vec2 x) {
  vec2 n = floor(x), f = fract(x);
  float f1 = 8.0, f2 = 8.0;
  vec2 id = vec2(0.0);
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 g = vec2(float(i), float(j));
    vec2 r = g + hash22(n + g) - f;
    float d = dot(r, r);
    if (d < f1) { f2 = f1; f1 = d; id = n + g; }
    else if (d < f2) { f2 = d; }
  }
  return vec3(sqrt(f1), sqrt(f2), hash12(id * 7.13));
}

vec2 stoneLocal(vec2 p, int i) {
  vec2 d = p - u_stones[i].xy;
  float a = u_stones[i].z;
  return vec2(cos(a) * d.x + sin(a) * d.y, -sin(a) * d.x + cos(a) * d.y) / u_stoneSize[i].xy;
}

float stoneReach(int i) { return max(u_stoneSize[i].x, u_stoneSize[i].y) * 1.3; }

// 0 in the middle of a stone, 1 on its outline, which wanders irregularly the way worn river stones do
float stoneRadius(vec2 q, float seed) {
  float t = atan(q.y, q.x + 1e-6);
  float wander = 1.0
    + 0.05 * cos(t + seed * 41.0)
    + 0.07 * cos(2.0 * t + seed * 73.0)
    + 0.045 * cos(3.0 * t + seed * 29.0)
    + 0.025 * cos(4.0 * t + seed * 97.0)
    + 0.012 * cos(6.0 * t + seed * 53.0);
  return length(q) / wander;
}

// a worn dome with its crown pushed a little off centre; rho comes back 0 in the middle to 1 on the outline
float stoneDome(vec2 p, int i, out float rho) {
  vec2 q = stoneLocal(p, i);
  float seed = u_stones[i].w;
  rho = stoneRadius(q, seed);
  if (rho >= 1.0) return 0.0;
  vec2 tilt = vec2(cos(seed * 61.0), sin(seed * 61.0)) * 0.2;
  return u_stoneSize[i].z * pow(1.0 - rho * rho, 0.7) * (1.0 + dot(q, tilt));
}

float bedHeight(vec2 p, int skip) {
  float h = 0.0;
  float rho;
  for (int i = 0; i < STONE_COUNT; i++) {
    if (i == skip || distance(p, u_stones[i].xy) > stoneReach(i)) continue;
    h = max(h, stoneDome(p, i, rho));
  }
  return h;
}

// how much sunlight gets past the stones to a point at height h0; the waves scatter it, so shadows are soft
float sunlight(vec2 p, float h0, int skip) {
  float blocked = -1.0;
  for (int k = 1; k <= 20; k++) {
    float d = float(k) * 1.4 * u_unit;
    blocked = max(blocked, (bedHeight(p + SUN_DIR * d, skip) - h0 - d / SUN_SLANT) / d);
  }
  return 1.0 - smoothstep(-0.4, 0.4, blocked);
}

// sand darkens gently toward the foot of each stone
float crevice(vec2 p) {
  float ao = 1.0;
  float rho;
  for (int i = 0; i < STONE_COUNT; i++) {
    if (distance(p, u_stones[i].xy) > stoneReach(i) + 30.0 * u_unit) continue;
    stoneDome(p, i, rho);
    float gap = max(rho - 1.0, 0.0) * (u_stoneSize[i].x + u_stoneSize[i].y) * 0.5;
    ao *= 1.0 - 0.35 * exp(-gap / (0.5 * u_stoneSize[i].z + u_unit));
  }
  return ao;
}

// the stone's own surface, with broad lumps and shallow dents so light doesn't slide over it like plastic
float stoneSurface(vec2 p, int i) {
  vec2 sp = p / u_unit + u_stones[i].w * 97.0;
  float rho;
  return stoneDome(p, i, rho) * (1.0 + 0.08 * snoise(vec3(sp * 0.04, 1.7)) + 0.025 * snoise(vec3(sp * 0.13, 5.3)));
}

vec3 stoneColor(vec2 p, vec3 n, int i, vec3 sand) {
  float seed = u_stones[i].w;
  float kind = u_stoneSize[i].w;
  vec2 sp = p / u_unit + seed * 97.0;
  // natural pebble colours as seen through the green water
  vec3 c = kind < 0.5 ? vec3(0.42, 0.46, 0.44) : kind < 1.5 ? vec3(0.54, 0.52, 0.39) : vec3(0.26, 0.3, 0.29);
  // broad mottling, a little warmer or cooler in places
  float patches = snoise(vec3(sp * 0.035, seed * 5.0)) * 0.6 + snoise(vec3(sp * 0.08, seed * 9.0)) * 0.3 + snoise(vec3(sp * 0.2, seed * 3.0)) * 0.12;
  float tint = snoise(vec3(sp * 0.05, seed * 13.0));
  c *= (1.0 + 0.16 * patches) * vec3(1.0 + 0.05 * tint, 1.0, 1.0 - 0.05 * tint);
  if (kind > 0.5 && kind < 1.5) {
    // iron stains on the warm stone
    c = mix(c, vec3(0.4, 0.35, 0.24), smoothstep(0.2, 0.7, snoise(vec3(sp * 0.06, seed * 17.0))) * 0.35);
  } else {
    // faint pale veins through the grey and dark stones
    float vein = abs(snoise(vec3(sp * vec2(0.03, 0.012), seed * 31.0)));
    c = mix(c, vec3(0.58, 0.62, 0.58), (1.0 - smoothstep(0.02, 0.06, vein)) * 0.25);
  }
  // faint grain and the odd tiny pit
  c *= 0.96 + 0.08 * vnoise(p * 1.3);
  vec3 g = voronoi(p / 1.6 + seed * 131.0);
  c *= 1.0 - 0.2 * step(0.93, g.z) * smoothstep(0.35, 0.05, g.x);
  // a patchy film of algae and a dusting of silt where the tops face the light
  float film = smoothstep(0.0, 0.7, snoise(vec3(sp * 0.045, seed * 23.0))) * smoothstep(0.5, 0.9, n.z);
  c = mix(c, vec3(0.3, 0.36, 0.22), film * 0.2);
  float silt = smoothstep(0.85, 0.98, n.z) * smoothstep(0.35, 0.8, vnoise(sp * 0.09 + 3.0) * 0.7 + vnoise(p * 0.8) * 0.3);
  return mix(c, sand, silt * 0.25);
}

void main() {
  vec2 p = vec2(v_uv.x, 1.0 - v_uv.y) * u_size;

  // the stone lying on top here, if any
  int top = -1;
  float topRho = 2.0;
  float topH = 0.0;
  bool near = false;
  for (int i = 0; i < STONE_COUNT; i++) {
    float reach = distance(p, u_stones[i].xy);
    if (reach > stoneReach(i) + 32.0 * u_unit) continue;
    near = true;
    if (reach > stoneReach(i)) continue;
    float rho;
    float h = stoneDome(p, i, rho);
    if (rho < 1.05 && (top < 0 || h > topH)) { top = i; topRho = rho; topH = h; }
  }
  if (u_pass == 1) {
    o = vec4(topH / u_heightScale, 0.0, 0.0, 1.0);
    return;
  }

  float big = snoise(vec3(p * 0.0032, 1.3)) * 0.6 + snoise(vec3(p * 0.0075, 7.7)) * 0.3 + snoise(vec3(p * 0.02, 2.2)) * 0.15;
  float blot = snoise(vec3(p * 0.06, 4.4)) * 0.5 + snoise(vec3(p * 0.13, 8.1)) * 0.3;
  vec3 v = voronoi(p / 3.2);
  float pebble = mix(1.0, 0.9 + 0.2 * v.z, smoothstep(0.02, 0.25, v.y - v.x));
  float grain = vnoise(p * 2.3) * 0.6 + hash12(gl_FragCoord.xy) * 0.4;
  vec3 sand = vec3(0.44, 0.55, 0.61);
  vec3 silt = vec3(0.26, 0.37, 0.46);
  vec3 c = mix(silt, sand, smoothstep(-0.55, 0.55, big));
  c *= 0.93 + 0.1 * blot;
  c *= pebble;
  c *= 0.92 + 0.16 * grain;
  // individual sand grains with darker gaps and the odd bright one, kept subtle
  vec3 sandGrain = voronoi(p / 1.4 + 57.0);
  float grains = mix(0.82, 1.12, smoothstep(0.05, 0.95, sandGrain.z)) * mix(0.72, 1.0, smoothstep(0.0, 0.3, sandGrain.y - sandGrain.x));
  grains = mix(grains, 1.35, step(0.94, sandGrain.z) * 0.5);
  c *= mix(1.0, grains, 0.5);

  vec3 col = c;
  float sun = 1.0;
  if (near) {
    col *= crevice(p);
    sun = sunlight(p, 0.0, -1);
  }
  if (top >= 0) {
    float e = 0.5;
    vec2 g = vec2(
      stoneSurface(p + vec2(e, 0.0), top) - stoneSurface(p - vec2(e, 0.0), top),
      stoneSurface(p + vec2(0.0, e), top) - stoneSurface(p - vec2(0.0, e), top)
    ) / (2.0 * e);
    g /= max(1.0, length(g) / 3.0);
    vec3 n = normalize(vec3(-g, 1.0));
    // light scattered by the waves wraps a little way round, and other stones can still shade this one
    float lambert = mix(max(dot(n, SUN), 0.0) / SUN.z, n.z, 0.2);
    float stoneSun = lambert * sunlight(p, topH, top);
    float ao = mix(0.6, 1.0, smoothstep(1.0, 0.5, topRho));
    vec3 stone = stoneColor(p, n, top, c) * ao;
    // a slightly ragged foot, so it sits down in the sand
    float lip = (vnoise(p * 0.5 / u_unit + u_stones[top].w * 9.0) - 0.5) * 1.6 * u_unit;
    float edge = (topRho - 1.0) * (u_stoneSize[top].x + u_stoneSize[top].y) * 0.5 + lip;
    float cover = 1.0 - smoothstep(-0.75 * u_pixel, 0.75 * u_pixel, edge);
    col = mix(col, stone, cover);
    sun = mix(sun, stoneSun, cover);
  }
  o = vec4(col, clamp(sun / 1.5, 0.0, 1.0));
}`,zt=`#version 300 es
precision highp float;
in vec2 a_pos;
in vec2 a_local;
in vec2 a_tan;
in vec4 a_fish;
in vec2 a_motion;
uniform vec2 u_size;
uniform vec2 u_offset;
out vec2 v_local;
out vec2 v_tan;
out vec4 v_fish;
out vec2 v_motion;
out vec2 v_p;
void main() {
  vec2 p = a_pos + u_offset * a_fish.w;
  v_local = a_local;
  v_tan = a_tan;
  v_fish = a_fish;
  v_motion = a_motion;
  v_p = p;
  gl_Position = vec4(p.x / u_size.x * 2.0 - 1.0, 1.0 - p.y / u_size.y * 2.0, 0.0, 1.0);
}`,Tt=`
uniform float u_time;
uniform float u_species;  // 0 koi, 1 betta, 2 ranchu, 3 jellyfish
bool isBetta() { return abs(u_species - 1.0) < 0.5; }
bool isRanch() { return abs(u_species - 2.0) < 0.5; }
bool isJelly() { return u_species > 2.5; }
// 1 for a betta, 0 otherwise: the head details keep their koi placement on the other species
float bettaMix() { return isBetta() ? 1.0 : 0.0; }
float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

// Four bodies on one profile. Koi: rounded head, widest behind the gills, long gentle taper.
// Betta: small head, deep shoulder, a very thin tail stalk. Ranchu: barrel body, blunt snout, pinched peduncle.
// Jellyfish: no fish at all - a bell that pulses and meets the water at its rim.
float bodyHW(float u) {
  float koiHead = sqrt(max(0.0, 1.0 - pow(max(0.3 - u, 0.0) / 0.3, 2.0)));
  float koiT = clamp((u - 0.3) / 0.7, 0.0, 1.0);
  float koi = (0.05 + 0.085 * (1.0 - pow(koiT, 1.4))) * koiHead * step(0.0, u);
  if (isJelly()) {
    // a dome that swells from the top and tucks back in at the mouth, breathing as it swims
    float b = clamp((u - 0.1) / 0.5, 0.0, 1.0);
    float prof = sqrt(max(0.0, 1.0 - pow(1.0 - b, 2.2))) * (1.0 - 0.28 * smoothstep(0.7, 1.0, b));
    return 0.31 * prof * (1.0 + 0.07 * sin(u_time * 1.9)) * step(0.0, u) * (1.0 - step(0.6, u));
  }
  if (isRanch()) {
    // a round little egg on legs: depth ~0.7 of body length, smooth all the way, a chubby crown
    float rHead = sqrt(max(0.0, 1.0 - pow(max(0.18 - u, 0.0) / 0.2, 2.0)));   // a rounded dome, not a bevel
    float rT = clamp((u - 0.18) / 0.82, 0.0, 1.0);
    float body = 0.05 + 0.26 * pow(max(0.0, 1.0 - pow((rT - 0.46) / 0.8, 2.0)), 0.62);
    float hood = 0.015 * exp(-pow((u - 0.15) / 0.16, 2.0));    // just enough crown to read as a hood
    return (body + hood) * rHead * step(0.0, u) * (1.0 - 0.82 * smoothstep(0.66, 0.98, u));
  }
  float bHead = sqrt(max(0.0, 1.0 - pow(max(0.18 - u, 0.0) / 0.18, 3.0)));
  float bT = clamp((u - 0.2) / 0.8, 0.0, 1.0);
  float betta = (0.032 + 0.105 * pow(max(0.0, 1.0 - bT), 0.8) * (0.42 + 0.58 * smoothstep(0.0, 0.28, bT))) * bHead * step(0.0, u);
  if (isBetta()) return betta;
  return koi;
}

struct Fin {
  float web;     // translucent webbing between rays
  float ray;     // the bony strands
  float t;       // 0 at the base .. 1 at the longest tip
  float across;  // 0..1 across the fan
};

// Ray length across a fin: x = length at across 0, y = at across 1, z = how deep the fork dips in the middle.
float rayLength(float x, vec3 shape, float id) {
  float c = abs(2.0 * x - 1.0);
  float len = mix(shape.x, shape.y, x) - shape.z * (1.0 - pow(c, 0.9));
  return len * (1.0 - 0.2 * pow(c, 12.0)) * (0.92 + 0.12 * hash11(id));
}

// A fan of fin rays growing from one point. The webbing stops short of the ray tips and dips between
// them, so the edge frays into strands. bend sweeps the rays back as they grow.
Fin rayedFin(vec2 q, vec2 base, float dir, float spread, float len, float count, vec3 shape, float bend, float L, float id) {
  Fin f = Fin(0.0, 0.0, 0.0, 0.0);
  vec2 d = q - base;
  float r = length(d);
  float rn = r / len;
  if (rn > 1.2 || r < 1e-5) return f;
  float ang = atan(d.y, d.x) - dir;
  ang = atan(sin(ang), cos(ang)) + bend * rn * rn;
  float across = ang / spread + 0.5;
  if (across < -0.06 || across > 1.06) return f;
  float k = clamp(across, 0.0, 1.0) * (count - 1.0);
  float i0 = floor(k);
  float i1 = min(i0 + 1.0, count - 1.0);
  float fk = k - i0;
  float l0 = rayLength(i0 / (count - 1.0), shape, id + i0);
  float l1 = rayLength(i1 / (count - 1.0), shape, id + i1);
  float nearest = fk < 0.5 ? i0 : i1;
  float rayLen = fk < 0.5 ? l0 : l1;
  float soft = 2.5 / (len * L);
  float sides = smoothstep(-0.06, 0.0, across) * (1.0 - smoothstep(1.0, 1.06, across));

  float webLen = mix(l0, l1, fk) * (1.0 - 0.03 * sin(3.14159 * fk));
  f.web = (1.0 - smoothstep(webLen - soft * 2.0, webLen + soft, rn)) * sides;

  float gapPx = max(r * L * spread / (count - 1.0), 1e-3);
  float distPx = abs(k - nearest) * gapPx;
  float widthPx = mix(1.5, 0.9, clamp(rn / rayLen, 0.0, 1.0)) * clamp(L / 110.0, 0.8, 1.6);
  float onRay = 1.0 - smoothstep(widthPx * 0.5 - 0.6, widthPx * 0.5 + 1.2, distPx);
  f.ray = onRay * (1.0 - smoothstep(rayLen - soft, rayLen + soft * 0.5, rn)) * sides;
  f.t = rn;
  f.across = across;
  return f;
}

// i: 0/1 pectorals, 2/3 the long ventral streamers; even = the +s side.
Fin pairedFin(vec2 q, int i, float fold, float phase, float L, float seed) {
  float sg = (i % 2 == 0) ? 1.0 : -1.0;
  bool pect = i < 2;
  float flap = sin(phase + (pect ? 0.0 : 1.3) + sg * 0.4);
  if (isJelly()) return Fin(0.0, 0.0, 0.0, 0.0);
  if (isRanch()) {
    // short round paddles, held close against the barrel
    float au = pect ? 0.24 : 0.5;
    vec2 base = vec2(au, sg * bodyHW(au) * (pect ? 0.82 : 0.6));
    float dir = sg * (pect ? 1.05 + 0.1 * flap : 0.58 + 0.05 * flap) * (1.0 - 0.5 * fold);
    return rayedFin(q, base, dir, (pect ? 0.68 : 0.4) * (1.0 - 0.4 * fold), pect ? 0.2 : 0.14, pect ? 11.0 : 8.0, vec3(1.0, 0.86, 0.0), sg * 0.25, L, seed * 50.0 + float(i) * 7.0);
  }
  if (isBetta()) {
    // long ventral streamers under the chin, narrow paddles at the gills
    float au = pect ? 0.26 : 0.2;
    vec2 base = vec2(au, sg * bodyHW(au) * (pect ? 0.75 : 0.5));
    float dir = sg * (pect ? 1.15 + 0.14 * flap : 0.85 + 0.08 * flap) * (1.0 - (pect ? 0.5 : 0.3) * fold);
    float spread = (pect ? 0.52 + 0.1 * flap : 0.2) * (1.0 - 0.35 * fold);
    vec3 shape = vec3(1.0, 0.72, 0.0);
    return rayedFin(q, base, dir, spread, pect ? 0.15 : 0.38, pect ? 9.0 : 5.0, shape, sg * 0.35, L, seed * 50.0 + float(i) * 7.0);
  }
  // broad koi paddles; the leading rays, nearest the head, are the longest
  float au = pect ? 0.22 : 0.53;
  vec2 base = vec2(au, sg * bodyHW(au) * (pect ? 0.78 : 0.55));
  float dir = sg * (pect ? 0.98 + 0.14 * flap : 0.55 + 0.06 * flap) * (1.0 - (pect ? 0.55 : 0.4) * fold);
  float spread = (pect ? 0.84 + 0.1 * flap : 0.46) * (1.0 - 0.45 * fold);
  vec3 shape = sg > 0.0 ? vec3(0.7, 1.0, 0.0) : vec3(1.0, 0.7, 0.0);
  return rayedFin(q, base, dir, spread, pect ? 0.25 : 0.16, pect ? 13.0 : 9.0, shape, sg * 0.3, L, seed * 50.0 + float(i) * 7.0);
}

// Jellyfish only: a skirt of thin tentacles hanging from the rim of the bell mouth, each on its own phase.
Fin tentacles(vec2 q, float seed, float L) {
  Fin f = Fin(0.0, 0.0, 0.0, 0.0);
  for (int i = 0; i < 13; i++) {
    float ci = float(i) / 6.0 - 1.0;
    vec2 base = vec2(0.56, ci * 0.18);   // the rim runs across the mouth, not from one point
    vec2 d = q - base;
    float r = length(d);
    if (r > 1.0) continue;
    float ang = ci * 0.3 + 0.22 * sin(r * 5.0 - u_time * 1.9 + float(i) * 1.7) * smoothstep(0.0, 0.3, r);
    float lateralPx = abs(d.x * sin(ang) - d.y * cos(ang)) * L;
    float lenI = (0.42 - 0.16 * abs(ci)) * (0.9 + 0.18 * hash11(float(i) * 3.7 + seed * 11.0));
    float w = mix(2.6, 1.2, clamp(r / lenI, 0.0, 1.0)) * clamp(L / 110.0, 0.8, 1.6);
    float on = (1.0 - smoothstep(w * 0.5 - 0.4, w * 0.5 + 1.2, lateralPx)) * (1.0 - smoothstep(lenI - 0.04, lenI + 0.03, r));
    f.ray = max(f.ray, on);
    f.web = max(f.web, on * 0.2);
    f.t = max(f.t, on * r / lenI);
    f.across = float(i) / 12.0;
  }
  return f;
}

// Koi: forked tail about half a body length, the rays rippling like cloth as it sweeps.
// Betta: halfmoon caudal, a near-semicircular fan that is half the silhouette.
// Ranchu: a short wide double-lobed fan. Jellyfish: the tentacle skirt instead of a tail.
Fin tailFin(vec2 q, float beat, float seed, float L) {
  if (isJelly()) return tentacles(q, seed, L);
  if (isRanch()) {
    // two lobes off one base: the double tail of a ranchu, gap and all
    vec2 base = vec2(0.9, 0.0);
    float flutter = sin(beat * 1.5 + seed * 9.0) * 0.08;
    Fin a = rayedFin(q, base, flutter - 0.55, 0.75, 0.26, 14.0, vec3(1.0, 0.84, 0.1), 0.0, L, seed * 90.0);
    Fin b = rayedFin(q, base, flutter + 0.55, 0.75, 0.26, 14.0, vec3(1.0, 0.84, 0.1), 0.0, L, seed * 90.0 + 7.0);
    Fin f = Fin(0.0, 0.0, 0.0, 0.0);
    f.ray = max(a.ray, b.ray);
    f.web = max(a.web, b.web);
    f.t = max(a.t, b.t);
    f.across = a.across;
    return f;
  }
  if (isBetta()) {
    vec2 base = vec2(0.97, 0.0);
    float rn = length(q - base) / 0.46;
    float flutter = sin(beat * 1.2 - rn * 3.0 + seed * 9.0) * 0.07 * rn;
    return rayedFin(q, base, flutter, 3.5, 0.52, 48.0, vec3(1.0, 1.0, 0.0), 0.0, L, seed * 90.0);
  }
  vec2 base = vec2(0.955, 0.0);
  float rn = length(q - base) / 0.5;
  float flutter = sin(beat * 1.6 - rn * 4.0 + seed * 9.0) * 0.12 * rn;
  return rayedFin(q, base, flutter, 1.2, 0.5, 28.0, vec3(1.0, 1.0, 0.4), 0.0, L, seed * 90.0);
}

// Koi: mostly folded along the back, leaning a little to one side and slowly changing sides.
// Betta: a tall sail swept back, trailing rearward until it meets the caudal.
Fin dorsalFin(vec2 q, float seed, float L) {
  // a ranchu carries no dorsal fin at all, and a jellyfish has no fin to place
  if (isRanch() || isJelly()) return Fin(0.0, 0.0, 0.0, 0.0);
  if (isBetta()) {
    float sway = sin(u_time * 0.5 + seed * 12.0) * 0.7 + sin(u_time * 1.4 + seed * 3.0) * 0.3;
    float base0 = 0.55;
    vec2 base = vec2(base0, bodyHW(base0) * 0.9);
    return rayedFin(q, base, 0.9 + 0.08 * sway, 2.0, 0.5 + 0.04 * sway, 24.0, vec3(0.95, 0.5, 0.0), 0.7, L, seed * 70.0);
  }
  float lean = sin(u_time * 0.45 + seed * 12.0) * 0.8 + sin(u_time * 1.3 + seed * 3.0) * 0.2;
  float sg = lean >= 0.0 ? 1.0 : -1.0;
  float back = 0.04;
  float front = 0.1 + 0.4 * abs(lean);
  vec3 shape = sg > 0.0 ? vec3(1.0, 0.55, 0.0) : vec3(0.55, 1.0, 0.0);
  return rayedFin(q, vec2(0.33, 0.0), sg * (back + front) * 0.5, max(front - back, 0.02), 0.44, 14.0, shape, sg * 0.25, L, seed * 70.0);
}

// Betta only: a long anal fin hanging from the belly, its trailing edge reaching toward the tail.
// Koi have none, so the empty fin lets every caller skip it.
Fin analFin(vec2 q, float seed, float L) {
  if (!isBetta()) return Fin(0.0, 0.0, 0.0, 0.0);
  float sway = sin(u_time * 0.6 + seed * 7.0) * 0.6;
  float base0 = 0.62;
  vec2 base = vec2(base0, -bodyHW(base0) * 0.85);
  return rayedFin(q, base, -0.85 + 0.06 * sway, 2.0, 0.5 + 0.03 * sway, 26.0, vec3(0.95, 0.45, 0.0), -0.7, L, seed * 61.0);
}

vec4 over(vec4 top, vec4 bot) { return top + bot * (1.0 - top.a); }
`,Jt=`${Te}${$e}${Tt}
in vec2 v_local;
in vec2 v_tan;
in vec4 v_fish;
in vec2 v_motion;
in vec2 v_p;
uniform sampler2D u_caustic;
uniform vec2 u_size;
uniform vec3 u_ambient;
uniform vec3 u_sun;
uniform float u_fishLight;
uniform float u_pixel;
out vec4 o;
vec3 lin(vec3 c) { return pow(c, vec3(2.2)); }

const float SCALES_PER_LENGTH = 26.0;

// betta and ranchu scales are finer than a koi's
float scalesPerLength() {
  if (isRanch()) return 30.0;
  return isBetta() ? 34.0 : SCALES_PER_LENGTH;
}

// One of the overlapping scales; the one nearest the head sits on top.
struct Scale {
  float r;      // 0 at the centre .. 1 at the edge
  float back;   // positive on the exposed side, facing the tail
  float rnd;
  float rnd2;
  vec2 center;  // in fish space, so markings can follow scale outlines
};

Scale scaleAt(vec2 q) {
  const vec2 cs = vec2(0.78, 0.9);
  float spl = scalesPerLength();
  vec2 pp = q * spl;
  vec2 base = floor(pp / cs);
  Scale sc = Scale(1.0, 0.0, 0.0, 0.0, q);
  float bestX = 1e9;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 id = base + vec2(float(i), float(j));
    vec2 jitter = (hash22(id * 3.1 + 1.7) - 0.5) * vec2(0.14, 0.1);
    vec2 c = vec2((id.x + mod(id.y, 2.0) * 0.5 + 0.5) * cs.x, (id.y + 0.5) * cs.y) + jitter;
    vec2 d = pp - c;
    float r = length(d) / (0.62 * (0.94 + 0.12 * hash12(id + 9.1)));
    if (r < 1.0 && c.x < bestX) {
      bestX = c.x;
      sc = Scale(r, d.x / 0.6, hash12(id + 0.37), hash12(id * 1.91 + 5.3), c / spl);
    }
  }
  return sc;
}

// Koi: 0 orange, 1 metallic gold with black spots, 2 orange and white, 3 light calico.
// Betta: 0 royal blue with a magenta fringe, 1 copper dragon, 2 crimson, 3 turquoise butterfly.
// Ranchu: 0 red-orange, 1 tancho (white with a red cap), 2 red and white, 3 chocolate.
// Jellyfish: 0 moon blue, 1 violet, 2 rose, 3 lagoon teal.
struct Skin {
  vec3 color;
  vec3 sheen;
  float metal;
  vec3 finBase;
  vec3 finTip;
};

float markings(vec2 p, float seed) {
  return vnoise(p * vec2(6.0, 14.0) + seed * 37.0) * 0.65 + vnoise(p * vec2(13.0, 30.0) + seed * 11.0 + 4.1) * 0.35;
}

Skin koiSkin(int kind, vec2 q, float nz, float seed, Scale sc, float L) {
  float u = q.x;
  float back = smoothstep(0.0, 0.85, nz);
  float scaled = smoothstep(0.23, 0.3, u) * (1.0 - smoothstep(0.92, 1.0, u));
  // markings are organic, with just a hint of following the scale outlines on the body
  float field = mix(markings(q, seed), markings(sc.center, seed), scaled * 0.22);
  float head = 1.0 - smoothstep(0.1, 0.3, u);
  // reticulation: pigment in the middle, a pale rim on the exposed edge, a fine line where it tucks under
  float aa = SCALES_PER_LENGTH * u_pixel / (0.6 * L);
  float visible = scaled * (0.45 + 0.55 * smoothstep(0.25, 0.7, vnoise(q * vec2(7.0, 18.0) + seed * 13.0)));
  float rim = smoothstep(0.4 - aa, 0.85 + aa, sc.r) * smoothstep(-0.4, 0.3, sc.back) * visible;
  float edge = smoothstep(0.8 - aa, 1.0 + aa, sc.r) * smoothstep(-0.25, 0.35, sc.back) * visible;
  float grain = vnoise(q * vec2(60.0, 110.0) + seed * 5.0);

  Skin k;
  if (kind == 1) {
    // metallic gold: deep bronze down the flanks to warm gold along the back
    // (pushed toward orange because the green pond light pulls yellows toward olive)
    vec3 gold = mix(lin(vec3(0.4, 0.17, 0.02)), lin(vec3(0.98, 0.6, 0.13)), back);
    gold = mix(gold, lin(vec3(1.0, 0.7, 0.24)), head * 0.4 * back);
    // glossy black spots scattered over the body, edges following the scales, only the odd one on the head
    float sumiField = mix(markings(q + 5.7, seed), markings(sc.center + 5.7, seed), scaled * 0.45);
    float sumi = smoothstep(0.52, 0.58, sumiField - head * 0.12);
    vec3 c = mix(gold, lin(vec3(0.05, 0.05, 0.06)), sumi);
    // metallic scales: every scale edged with light
    c = mix(c, c * vec3(1.18, 1.12, 1.05), rim * 0.45);
    c *= 1.0 - edge * 0.12;
    k.color = c * (0.95 + 0.1 * grain);
    // black takes a cool, dim shine, so the spots stay glossy black instead of being washed gold
    k.sheen = mix(lin(vec3(1.0, 0.88, 0.62)), lin(vec3(0.4, 0.42, 0.46)), sumi);
    k.metal = 2.2;
    k.finBase = vec3(0.96, 0.66, 0.24);
    k.finTip = vec3(1.0, 0.9, 0.7);
  } else if (kind == 3) {
    // light calico: pale blue-lavender with white and bright orange patches and a scatter of fine speckles
    vec3 blue = mix(lin(vec3(0.5, 0.58, 0.72)), lin(vec3(0.72, 0.78, 0.88)), back);
    vec3 white = mix(lin(vec3(0.82, 0.8, 0.78)), lin(vec3(0.97, 0.95, 0.92)), back);
    vec3 orange = mix(lin(vec3(0.82, 0.28, 0.08)), lin(vec3(0.98, 0.5, 0.18)), back);
    float whiteMask = smoothstep(0.46, 0.6, markings(q + 7.3, seed));
    float orangeMask = smoothstep(0.52, 0.64, field);
    vec3 c = mix(mix(blue, white, whiteMask), orange, orangeMask);
    float speck = smoothstep(0.78, 0.86, vnoise(q * vec2(40.0, 90.0) + seed * 31.0)) * (1.0 - orangeMask * 0.6);
    c = mix(c, lin(vec3(0.12, 0.12, 0.18)), speck * 0.7);
    c = mix(c, c * 1.1, rim * 0.3);
    c *= 1.0 - edge * 0.1;
    k.color = c * (0.94 + 0.12 * grain);
    k.sheen = lin(vec3(0.9, 0.94, 1.0));
    k.metal = 0.5;
    k.finBase = vec3(0.78, 0.8, 0.88);
    k.finTip = vec3(0.96, 0.95, 0.94);
  } else {
    bool whiteKoi = kind == 2;
    vec3 orange = whiteKoi ? mix(lin(vec3(0.72, 0.16, 0.06)), lin(vec3(0.93, 0.32, 0.12)), back)
                           : mix(lin(vec3(0.8, 0.3, 0.1)), lin(vec3(0.97, 0.5, 0.22)), back);
    orange *= 0.84 + 0.26 * grain;
    vec3 cream = mix(lin(vec3(0.84, 0.66, 0.58)), lin(vec3(0.97, 0.9, 0.84)), back);
    float white = smoothstep(whiteKoi ? 0.44 : 0.64, whiteKoi ? 0.58 : 0.78, field + head * 0.08);
    vec3 c = mix(orange, cream, white);
    c = mix(c, c * vec3(1.12, 1.06, 1.0), rim * 0.35);
    c *= 1.0 - edge * 0.08;
    // a few dark scales around the shoulders
    float sumi = step(0.95, sc.rnd) * smoothstep(0.9, 0.3, sc.r) * scaled * (1.0 - smoothstep(0.5, 0.7, u)) * (1.0 - white);
    k.color = mix(c, lin(vec3(0.2, 0.1, 0.07)), sumi * 0.7);
    k.sheen = lin(vec3(1.0, 0.76, 0.42));
    k.metal = 0.8;
    k.finBase = whiteKoi ? vec3(0.95, 0.72, 0.62) : vec3(0.96, 0.54, 0.34);
    k.finTip = vec3(1.0, 0.9, 0.84);
  }
  return k;
}

Skin bettaSkin(int kind, vec2 q, float nz, float seed, Scale sc, float L) {
  float u = q.x;
  float back = smoothstep(0.0, 0.85, nz);
  float scaled = smoothstep(0.04, 0.18, u) * (1.0 - smoothstep(0.92, 1.0, u));
  float aa = scalesPerLength() * u_pixel / (0.6 * L);
  float visible = scaled * (0.3 + 0.7 * smoothstep(0.25, 0.7, vnoise(q * vec2(7.0, 18.0) + seed * 13.0)));
  float rim = smoothstep(0.4 - aa, 0.85 + aa, sc.r) * smoothstep(-0.4, 0.3, sc.back) * visible;
  float edge = smoothstep(0.8 - aa, 1.0 + aa, sc.r) * smoothstep(-0.25, 0.35, sc.back) * visible;
  float grain = vnoise(q * vec2(60.0, 110.0) + seed * 5.0);
  float band = vnoise(vec2(u * 7.0, q.y * 5.0) + seed * 3.1);
  float head = 1.0 - smoothstep(0.06, 0.22, u);

  Skin k;
  vec3 c;
  if (kind == 1) {
    vec3 copper = mix(lin(vec3(0.28, 0.12, 0.04)), lin(vec3(0.86, 0.52, 0.18)), back);
    c = mix(copper, lin(vec3(0.95, 0.72, 0.34)), head * 0.35 * back);
    c = mix(c, lin(vec3(0.1, 0.06, 0.03)), smoothstep(0.6, 0.78, band) * 0.5 * back);
    c = mix(c, c * vec3(1.2, 1.14, 1.02), rim * 0.5);
    k.sheen = lin(vec3(1.0, 0.82, 0.5));
    k.metal = 2.6;
    k.finBase = vec3(0.82, 0.42, 0.12);
    k.finTip = vec3(1.0, 0.82, 0.46);
  } else if (kind == 3) {
    vec3 teal = mix(lin(vec3(0.04, 0.36, 0.4)), lin(vec3(0.16, 0.72, 0.72)), back);
    c = mix(teal, lin(vec3(0.62, 0.95, 0.9)), band * 0.28 * back);
    c = mix(c, c * vec3(1.15, 1.1, 1.0), rim * 0.35);
    k.sheen = lin(vec3(0.72, 0.96, 0.94));
    k.metal = 1.6;
    k.finBase = vec3(0.16, 0.6, 0.62);
    k.finTip = vec3(0.95, 0.97, 0.96);
  } else if (kind == 2) {
    vec3 red = mix(lin(vec3(0.5, 0.03, 0.03)), lin(vec3(0.86, 0.14, 0.1)), back);
    c = mix(red, lin(vec3(0.98, 0.34, 0.2)), head * 0.3 * back);
    c = mix(c, lin(vec3(0.34, 0.02, 0.03)), smoothstep(0.62, 0.8, band) * 0.45 * back);
    c = mix(c, c * vec3(1.12, 1.02, 1.0), rim * 0.3);
    k.sheen = lin(vec3(1.0, 0.52, 0.42));
    k.metal = 1.1;
    k.finBase = vec3(0.78, 0.1, 0.08);
    k.finTip = vec3(1.0, 0.42, 0.3);
  } else {
    vec3 blue = mix(lin(vec3(0.05, 0.08, 0.36)), lin(vec3(0.18, 0.3, 0.8)), back);
    c = mix(blue, lin(vec3(0.44, 0.24, 0.82)), band * 0.32 * back);
    c = mix(c, c * vec3(1.16, 1.1, 1.05), rim * 0.4);
    k.sheen = lin(vec3(0.68, 0.72, 1.0));
    k.metal = 1.8;
    k.finBase = vec3(0.34, 0.12, 0.62);
    k.finTip = vec3(0.94, 0.42, 0.66);
  }
  c *= 1.0 - edge * 0.12;
  k.color = c * (0.94 + 0.12 * grain);
  return k;
}

// A ranchu is a barrel with a blunt snout and a hood over the cranium. Its scales are coarse and flat,
// so the reticulation reads weaker than on a koi.
Skin ranchSkin(int kind, vec2 q, float nz, float seed, Scale sc, float L) {
  float u = q.x;
  float back = smoothstep(0.0, 0.85, nz);
  float scaled = smoothstep(0.2, 0.28, u) * (1.0 - smoothstep(0.84, 1.0, u));
  float field = mix(markings(q, seed), markings(sc.center, seed), scaled * 0.22);
  float head = 1.0 - smoothstep(0.1, 0.26, u);
  float aa = scalesPerLength() * u_pixel / (0.6 * L);
  float visible = scaled * (0.45 + 0.55 * smoothstep(0.25, 0.7, vnoise(q * vec2(7.0, 18.0) + seed * 13.0)));
  float rim = smoothstep(0.4 - aa, 0.85 + aa, sc.r) * smoothstep(-0.4, 0.3, sc.back) * visible;
  float edge = smoothstep(0.8 - aa, 1.0 + aa, sc.r) * smoothstep(-0.25, 0.35, sc.back) * visible;
  float grain = vnoise(q * vec2(60.0, 110.0) + seed * 5.0);
  // the hood: soft lumps over the cranium, the thing that makes a ranchu a ranchu
  float hood = head * smoothstep(0.25, 0.65, vnoise(q * vec2(15.0, 24.0) + seed * 21.0));

  // the tiger ranchu: silvery white flanks, smoky grey shading to the tail, one vivid orange-red cap
  float rear = smoothstep(0.46, 0.92, u + (field - 0.5) * 0.16);
  vec3 white = mix(lin(vec3(0.5, 0.52, 0.55)), lin(vec3(0.95, 0.95, 0.94)), back);
  vec3 grey = lin(vec3(0.18, 0.19, 0.22));
  vec3 body = mix(white, grey, rear * (0.62 + 0.25 * sc.rnd));
  float capEnd = 0.2 + 0.04 * sc.rnd;
  body = mix(body, lin(vec3(0.97, 0.66, 0.55)), (1.0 - smoothstep(capEnd + 0.01, capEnd + 0.08, u)) * 0.45);   // peach cheeks
  float capAmt = 1.0 - smoothstep(capEnd - 0.03, capEnd + 0.03, u + hood * 0.05);
  body = mix(body, lin(vec3(0.93, 0.28, 0.05)), capAmt);                                                  // red crown
  // the wen sits proud of the body: a lit top over the cap and a bright rim where it meets the flank
  body = mix(body, body * 1.35 + vec3(0.05, 0.02, 0.0), capAmt * smoothstep(0.35, 0.85, nz) * 0.22);
  body *= 0.88 + 0.26 * exp(-pow((u - capEnd - 0.04) / 0.05, 2.0));          // a soft rim where the cap meets the flank
  Skin k;
  vec3 c = body;
  c = mix(c, c * vec3(1.1, 1.05, 1.0), rim * 0.35);
  c *= 1.0 - edge * 0.1;
  k.color = c * (0.95 + 0.1 * grain);
  k.sheen = lin(vec3(1.0, 0.95, 0.9));
  k.metal = 1.1;
  k.finBase = vec3(0.62, 0.63, 0.66);   // translucent grey-white fins, darker at the base
  k.finTip = vec3(0.94, 0.95, 0.96);
  return k;
}

// A jellyfish is glass: the bell stays see-through, takes the water's colour and shines along its rim.
Skin jellySkin(int kind, vec2 q, float nz, float seed, Scale sc, float L) {
  float back = smoothstep(0.0, 0.9, nz);
  float grain = vnoise(q * vec2(40.0, 80.0) + seed * 5.0);
  vec3 hue = kind == 1 ? vec3(0.52, 0.36, 0.86)
    : kind == 2 ? vec3(0.88, 0.52, 0.7)
    : kind == 3 ? vec3(0.34, 0.72, 0.74)
    : vec3(0.5, 0.7, 0.94);
  Skin k;
  k.color = mix(lin(hue * 0.3), lin(hue), back) * (0.94 + 0.12 * grain);
  // the mouth is a lit rim, dark just inside it, with the pale organs showing through the bell
  float mouth = smoothstep(0.47, 0.53, q.x) * (1.0 - smoothstep(0.55, 0.59, q.x));
  k.color = k.color * (1.0 - mouth * 0.35) + vec3(0.26, 0.3, 0.33) * mouth;
  float gonad = exp(-pow(length(vec2(q.x - 0.36, abs(q.y) - 0.07)) / 0.06, 2.0));
  k.color = mix(k.color, k.color * 1.6 + vec3(0.16, 0.18, 0.2), gonad * 0.7);
  k.sheen = lin(mix(vec3(0.92, 0.96, 1.0), hue, 0.45));
  k.metal = 0.4;
  k.finBase = hue * 0.95;
  k.finTip = vec3(0.94, 0.97, 1.0);
  return k;
}

Skin skin(int kind, vec2 q, float nz, float seed, Scale sc, float L) {
  if (isJelly()) return jellySkin(kind, q, nz, seed, sc, L);
  if (isRanch()) return ranchSkin(kind, q, nz, seed, sc, L);
  if (isBetta()) return bettaSkin(kind, q, nz, seed, sc, L);
  return koiSkin(kind, q, nz, seed, sc, L);
}

// Fins read as soft translucent veils: the webbing carries the colour and fades toward a feathered edge,
// and the rays only show as faint streaks inside it.
vec4 shadeFin(Skin k, Fin f, float seed, vec3 sunC, float opacity) {
  if (f.web + f.ray <= 0.0) return vec4(0.0);
  float veil = 0.9 + 0.1 * vnoise(vec2(f.t * 9.0, f.across * 14.0) + seed * 17.0);
  float a = f.web * mix(mix(0.66, 0.98, bettaMix()), mix(0.2, 0.78, bettaMix()), smoothstep(0.0, 1.0, f.t)) * veil;
  a += f.ray * f.web * 0.1 * (1.0 - f.t * 0.6);
  // a jellyfish's skirt is glass, so it stays translucent the whole way out
  a *= isJelly() ? 0.62 : 1.0;
  vec3 c = mix(k.finBase, k.finTip, smoothstep(0.05, 1.0, f.t));
  c *= 1.0 - f.ray * 0.08;
  float rim = smoothstep(0.78, 0.94, f.t) * (1.0 - smoothstep(0.94, 1.0, f.t)) * (bettaMix() + (isJelly() ? 1.6 : 0.0));
  c = mix(c, vec3(1.0), clamp(rim, 0.0, 1.0) * 0.5);
  a = clamp(a + rim * 0.4, 0.0, 1.0) * opacity;
  float tipGlow = f.ray * smoothstep(0.5, 1.0, f.t);
  return vec4((lin(c) * (u_ambient * 1.3 + sunC * 1.05) + sunC * tipGlow * 0.4) * a, a);
}

void main() {
  float u = v_local.x;
  float s = v_local.y;
  int kind = int(floor(v_fish.x));
  float seed = fract(v_fish.x);
  float L = v_fish.y;
  float aa = 1.3 / L;
  vec2 q = vec2(u, s);
  vec2 lat = vec2(-v_tan.y, v_tan.x);

  // sunlight on the fish follows the caustics, softened because the fish swims above the bed
  vec2 cuv = vec2(v_p.x / u_size.x, 1.0 - v_p.y / u_size.y);
  vec2 px = 2.5 / u_size;
  float C = texture(u_caustic, cuv).r * 0.4
    + (texture(u_caustic, cuv + vec2(px.x, 0.0)).r + texture(u_caustic, cuv - vec2(px.x, 0.0)).r
     + texture(u_caustic, cuv + vec2(0.0, px.y)).r + texture(u_caustic, cuv - vec2(0.0, px.y)).r) * 0.15;
  vec3 sunC = u_sun * u_fishLight * mix(0.55, 1.35, clamp(C * 0.45, 0.0, 1.0));

  float hw = bodyHW(u);
  float nx = clamp(s / max(hw, 1e-4), -1.0, 1.0);
  float nz = sqrt(max(0.0, 1.0 - nx * nx));
  Scale sc = scaleAt(q);
  Skin k = skin(kind, q, nz, seed, sc, L);

  vec4 acc = over(shadeFin(k, tailFin(q, v_fish.z, seed, L), seed, sunC, 1.0), vec4(0.0));
  for (int i = 3; i >= 0; i--) {
    acc = over(shadeFin(k, pairedFin(q, i, v_motion.x, v_motion.y, L, seed), seed + float(i), sunC, 1.0), acc);
  }

  // the eyes sit right on the sides of the head and bulge past its outline
  float eyeU = mix(0.115, 0.135, bettaMix());
  vec2 eyeC = vec2(eyeU, sign(s) * (bodyHW(eyeU) + mix(0.002, 0.001, bettaMix())));
  // a jellyfish has no eyes at all: shove them outside the skeleton so they never draw
  float eyeD = length(q - eyeC) - mix(0.02, 0.0115, bettaMix()) + (isJelly() ? 1.0 : 0.0);
  float face = isJelly() ? 0.0 : 1.0;   // a bell has no snout, gills or crown either
  float bodyD = min(max(abs(s) - hw, -u), eyeD);
  float bodyA = (1.0 - smoothstep(-aa, aa, bodyD)) * (1.0 - smoothstep(0.96, 1.03, u)) * (isJelly() ? 0.72 : 1.0);
  if (bodyA > 0.0) {
    float snout = 1.0 - smoothstep(0.0, 0.14, u);
    float tailward = smoothstep(0.5, 1.0, u);
    vec3 N = normalize(vec3(lat * nx * 0.95 + v_tan * (snout * 0.8 - tailward * 0.15) * nz, nz + 0.12));
    vec3 Ld = normalize(vec3(-0.42, -0.52, 0.74));
    vec3 Hv = normalize(Ld + vec3(0.0, 0.0, 1.0));
    float dif = max(dot(N, Ld), 0.0);
    float spec = pow(max(dot(N, Hv), 0.0), 36.0);

    vec3 col = k.color * (u_ambient * 1.25 + sunC * (0.3 + 0.7 * dif));
    // flanks fall away into shadow, but light glows through the thin edges
    col *= mix(0.7, 1.0, smoothstep(0.0, 0.55, nz));
    col += k.color * sunC * 0.12 * pow(1.0 - nz, 2.0);
    float sheen = pow(max(dot(N, Hv), 0.0), 7.0);
    col += mix(k.color, k.sheen, 0.6) * sunC * sheen * 0.16 * max(1.0, k.metal * 0.65);
    // metallic skin mirrors the bright water above in a broad band along the back
    col += mix(k.color, k.sheen, 0.5) * sunC * pow(max(dot(N, Hv), 0.0), 3.0) * 0.35 * max(k.metal - 1.2, 0.0);

    // each scale is a tiny tilted mirror, so glints shift as the fish turns
    float scaleRegion = smoothstep(0.22, 0.3, u) * (1.0 - smoothstep(0.9, 1.0, u)) * smoothstep(0.0, 0.35, nz);
    vec2 tilt = (v_tan * -(0.35 + 0.35 * sc.rnd2) + lat * (sc.rnd - 0.5) * 0.9) * 0.55;
    float glint = pow(max(dot(normalize(N + vec3(tilt, 0.0)), Hv), 0.0), 24.0);
    float patchN = smoothstep(0.25, 0.75, vnoise(vec2(u * 7.0, s * 22.0) + seed * 7.0 + vec2(u_time * 0.02, 0.0)));
    float rimGlow = smoothstep(0.5, 0.85, sc.r) * step(0.0, sc.back);
    col += k.sheen * scaleRegion * glint * (0.4 + 0.6 * patchN) * (0.45 + 0.9 * rimGlow) * sunC * 0.6 * k.metal;

    // smooth glossy head, gill covers behind it
    float gill = exp(-pow((u - mix(0.265, 0.205, bettaMix()) - 0.07 * nx * nx) / 0.006, 2.0)) * smoothstep(0.15, 0.6, abs(nx));
    col *= 1.0 - gill * 0.22 * face;
    // the gill cover crease sits further forward on a betta than on a koi
    col *= 1.0 - smoothstep(mix(0.265, 0.2, bettaMix()), mix(0.31, 0.245, bettaMix()), u)
      * (1.0 - smoothstep(mix(0.31, 0.245, bettaMix()), mix(0.4, 0.32, bettaMix()), u)) * 0.1 * abs(nx) * face;
    float crown = exp(-pow(s / (hw * 0.5 + 1e-4), 2.0)) * exp(-pow((u - mix(0.12, 0.08, bettaMix())) / mix(0.07, 0.05, bettaMix()), 2.0)) * face;
    col += mix(k.color, k.sheen, 0.5) * crown * 0.28 * sunC;
    float ridge = exp(-pow(s / max(hw * 0.22, 1e-4), 2.0)) * smoothstep(0.25, 0.45, u) * (1.0 - smoothstep(0.8, 1.0, u));
    col += k.sheen * ridge * 0.1 * sunC * k.metal;
    col += vec3(1.0, 0.92, 0.8) * spec * 0.24 * u_fishLight;

    vec3 headLight = u_ambient * 1.3 + sunC;

    // lips: a pale rim right at the snout with a faint crease just behind it
    float front = 1.0 - smoothstep(0.03, 0.08, u);
    float inside = -max(abs(s) - hw, -u);
    col = mix(col, lin(vec3(0.97, 0.9, 0.82)) * headLight, (1.0 - smoothstep(0.0, 0.01, inside)) * front * 0.45 * face);
    col *= 1.0 - exp(-pow((inside - 0.017) / 0.004, 2.0)) * front * 0.25 * face;

    // two nostrils on top, between the eyes and the snout
    float nostril = 1.0 - smoothstep(0.0, 1.0, length((q - vec2(mix(0.062, 0.07, bettaMix()), sign(s) * mix(0.03, 0.018, bettaMix())))
      / vec2(mix(0.012, 0.01, bettaMix()), mix(0.009, 0.007, bettaMix()))));
    col *= 1.0 - nostril * 0.55 * face;

    // eyes: a pale rim around a dark pupil that looks outward, with a wet highlight
    float eye = 1.0 - smoothstep(-aa, aa, eyeD);
    vec2 pupilC = eyeC + vec2(mix(-0.002, -0.0014, bettaMix()), sign(s) * mix(0.006, 0.0041, bettaMix()));
    float pupil = 1.0 - smoothstep(-aa, aa, length(q - pupilC) - mix(0.012, 0.0062, bettaMix()));
    vec3 eyeRim = mix(k.color, lin(vec3(0.9, 0.86, 0.78)), 0.55) * headLight;
    col = mix(col, mix(eyeRim, lin(vec3(0.03, 0.025, 0.02)) * headLight, pupil), eye);
    float eyeHi = 1.0 - smoothstep(0.0, mix(0.0045, 0.0028, bettaMix()),
      length(q - pupilC - vec2(mix(-0.004, -0.0027, bettaMix()), -sign(s) * mix(0.004, 0.0027, bettaMix()))));
    col += vec3(0.5, 0.48, 0.44) * eyeHi * pupil * u_fishLight;

    // the bell of a jellyfish goes glassy and bright where its wall turns away from us
    col += (k.sheen * 0.7 + u_ambient) * pow(1.0 - nz, 2.5) * (isJelly() ? 0.85 : 0.0) * sunC;

    acc = over(vec4(col * bodyA, bodyA), acc);
  }

  // barbels: short pale whiskers at the corners of a koi's mouth
  float whisker = 0.0;
  for (int i = 0; i < 2; i++) {
    float sg = i == 0 ? 1.0 : -1.0;
    vec2 root = vec2(0.03, sg * bodyHW(0.03) * 0.92);
    vec2 dir = normalize(vec2(0.45, sg));
    vec2 d = q - root;
    float along = clamp(dot(d, dir), 0.0, 0.05);
    float offPx = length(d - dir * along) * L;
    float width = mix(0.9, 0.35, along / 0.05);
    whisker = max(whisker, (1.0 - smoothstep(width * 0.5, width * 0.5 + 0.6, offPx)) * (1.0 - smoothstep(0.035, 0.05, along)));
  }
  whisker *= 1.0 - max(bettaMix(), step(1.5, u_species));   // barbels belong to the koi alone
  if (whisker > 0.0) {
    float wa = whisker * 0.65;
    acc = over(vec4(lin(vec3(0.95, 0.9, 0.82)) * (u_ambient * 1.3 + sunC) * wa, wa), acc);
  }

  acc = over(shadeFin(k, analFin(q, seed, L), seed + 12.0, sunC, 0.92), acc);
  acc = over(shadeFin(k, dorsalFin(q, seed, L), seed + 9.0, sunC, 0.9), acc);
  o = acc;
}`,Kt=`${Te}${Tt}
in vec2 v_local;
in vec2 v_tan;
in vec4 v_fish;
in vec2 v_motion;
in vec2 v_p;
out vec4 o;
float finShadow(Fin f, float web, float ray) {
  return max(f.web * web * mix(1.0, 0.4, clamp(f.t, 0.0, 1.0)), f.ray * ray);
}
void main() {
  float u = v_local.x;
  float s = v_local.y;
  float L = v_fish.y;
  float seed = fract(v_fish.x);
  float aa = 1.2 / L;
  vec2 q = vec2(u, s);
  float a = (1.0 - smoothstep(-aa, aa, max(abs(s) - bodyHW(u), -u))) * (1.0 - smoothstep(0.95, 1.04, u));
  a = max(a, finShadow(tailFin(q, v_fish.z, seed, L), 0.6, 0.5));
  for (int i = 0; i < 4; i++) {
    a = max(a, finShadow(pairedFin(q, i, v_motion.x, v_motion.y, L, seed), 0.35, 0.45));
  }
  a = max(a, finShadow(analFin(q, seed, L), 0.3, 0.4));
  a = max(a, finShadow(dorsalFin(q, seed, L), 0.3, 0.4));
  o = vec4(a, 0.0, 0.0, a);
}`,$t=`#version 300 es
precision highp float;
in vec2 a_pos;
in vec3 a_leaf;
uniform vec2 u_size;
out vec3 v_leaf;
void main() {
  v_leaf = a_leaf;
  gl_Position = vec4(a_pos.x / u_size.x * 2.0 - 1.0, 1.0 - a_pos.y / u_size.y * 2.0, 0.0, 1.0);
}`,Qt=`${Te}${$e}
in vec3 v_leaf;
out vec4 o;
void main() {
  float t = v_leaf.x;
  float side = v_leaf.y;
  float seed = v_leaf.z;
  // deep green at the base to a slightly sunnier green at the tip, with a paler midrib and fine veins
  vec3 c = mix(vec3(0.05, 0.15, 0.08), vec3(0.2, 0.32, 0.12), smoothstep(0.05, 1.0, t));
  c *= 0.85 + 0.3 * hash12(vec2(seed * 91.0, 3.7));
  c = mix(c, c * 1.4, exp(-pow(side / 0.2, 2.0)) * 0.35);
  c *= 0.92 + 0.08 * sin(side * 14.0 + seed * 20.0);
  float a = (1.0 - smoothstep(0.7, 1.0, abs(side))) * mix(0.97, 0.8, t);
  o = vec4(c * a, a);
}`,Zt=`${Te}${$e}
in vec2 v_uv;
uniform sampler2D u_floor;
uniform sampler2D u_surface;
uniform sampler2D u_caustic;
uniform sampler2D u_shadow;
uniform sampler2D u_fish;
uniform sampler2D u_plants;
uniform sampler2D u_relief;
uniform float u_heightScale;
uniform vec2 u_size;
uniform float u_time;
uniform vec3 u_ambient;
uniform vec3 u_sun;
uniform float u_viewRefraction;
uniform float u_dispersion;
uniform float u_ringContrast;
uniform float u_exposure;
uniform float u_green;    // 0 = blue water, 1 = green water
uniform float u_lily;     // lily pads on the surface
uniform float u_leaves;   // loose leaves floating on the surface
uniform vec3 u_pointer;   // pointer in pond px, z = how strongly the cursor is on the water
out vec4 o;
vec2 uvOf(vec2 p) { return vec2(p.x / u_size.x, 1.0 - p.y / u_size.y); }
vec3 aces(vec3 x) { return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }

// Things floating on the surface are never seen through the water, so they are composited over the
// finished scene instead of being refracted. They still take the same light, and bob with the ripples.
vec4 lilyPads(vec2 p, float strength, inout float shade) {
  vec4 acc = vec4(0.0);
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float rnd = hash12(vec2(fi + 1.7, 4.1));
    float padR = u_size.y * (0.050 + 0.028 * rnd);
    // pads keep to the edges, where fish are less likely to swim under them
    vec2 c = vec2(u_size.x * (0.13 + 0.2 * hash12(vec2(fi, 2.3)) + 0.5 * step(1.5, fi)), u_size.y * (0.15 + 0.66 * hash12(vec2(fi, 8.7))));
    c.y += sin(u_time * 0.5 + fi * 2.1) * 0.006 * u_size.y;
    float rot = 0.9 + fi * 2.2 + sin(u_time * 0.13 + fi) * 0.06;
    // the cursor presses the water, so a nearby pad drifts away and turns; passing ripples lean it
    vec2 away = c - u_pointer.xy;
    float near = u_pointer.z * (1.0 - smoothstep(0.0, u_size.y * 0.28, length(away)));
    c += away / (length(away) + 1e-5) * near * padR * 0.6 + texture(u_surface, uvOf(c)).yz * 2.5;
    rot += near * 0.8;
    vec2 d = p - c;
    float cs = cos(rot), sn = sin(rot);
    vec2 dl = vec2(d.x * cs + d.y * sn, -d.x * sn + d.y * cs);
    float rr = length(dl) / padR;
    float ang = atan(dl.y, dl.x);
    float notch = smoothstep(0.10, 0.20, abs(ang - 2.3));      // the slit that runs from the rim to the centre
    float mask = (1.0 - smoothstep(0.93, 1.0, rr)) * notch;
    // a soft ring of shade just outside the rim is what makes the pad read as lying on the water
    shade = max(shade, smoothstep(0.96, 1.06, rr) * (1.0 - smoothstep(1.06, 1.32, rr)));
    if (mask <= 0.0) continue;
    float vein = smoothstep(0.82, 0.98, abs(sin(ang * 9.0 + rnd * 6.0))) * smoothstep(0.12, 0.85, rr);
    vec3 base = mix(vec3(0.05, 0.14, 0.06), vec3(0.17, 0.30, 0.11), smoothstep(0.1, 1.0, rr));
    base = mix(base, vec3(0.26, 0.34, 0.14), vein * 0.5);
    vec3 c0 = base * (u_ambient * 2.4 + u_sun * 0.85);
    c0 += u_sun * 0.12 * smoothstep(0.82, 1.0, rr) + u_sun * near * 0.18 * smoothstep(0.4, 1.0, rr);            // the wet rim catches the light
    acc = acc * (1.0 - mask) + vec4(c0, 1.0) * mask;
  }
  return acc * strength;
}

vec4 floatingLeaves(vec2 p, float strength, inout float shade) {
  vec4 acc = vec4(0.0);
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float rnd = hash12(vec2(fi, 6.1));
    vec2 c = vec2(u_size.x * (0.08 + 0.84 * hash12(vec2(fi, 1.3))), u_size.y * (0.1 + 0.8 * hash12(vec2(fi, 9.4))));
    c += vec2(sin(u_time * 0.12 + fi * 1.7), cos(u_time * 0.09 + fi * 2.3)) * u_size * 0.02;
    float len = u_size.y * (0.022 + 0.014 * rnd);
    float wid = len * 0.45;
    float rot = fi * 1.9 + sin(u_time * 0.1 + fi) * 0.5;
    // leaves are lighter than pads, so the cursor and the ripples move them further
    vec2 away = c - u_pointer.xy;
    float near = u_pointer.z * (1.0 - smoothstep(0.0, u_size.y * 0.2, length(away)));
    c += away / (length(away) + 1e-5) * near * len * 2.2 + texture(u_surface, uvOf(c)).yz * 3.0;
    rot += near * 2.2;
    vec2 d = p - c;
    float cs = cos(rot), sn = sin(rot);
    vec2 dl = vec2(d.x * cs + d.y * sn, -d.x * sn + d.y * cs);
    float rr = length(vec2(dl.x / len, dl.y / wid));
    float mask = 1.0 - smoothstep(0.9, 1.0, rr);
    shade = max(shade, smoothstep(0.92, 1.02, rr) * (1.0 - smoothstep(1.02, 1.24, rr)));
    if (mask <= 0.0) continue;
    vec3 base = mix(vec3(0.09, 0.2, 0.07), vec3(0.3, 0.42, 0.14), 0.5 + 0.5 * rnd);
    base = mix(base, base * 0.55, exp(-pow(dl.y / (wid * 0.16), 2.0)));   // the midrib
    vec3 c0 = base * (u_ambient * 2.6 + u_sun * 0.8);
    c0 += u_sun * 0.1 * smoothstep(0.7, 1.0, rr) + u_sun * near * 0.24 * smoothstep(0.4, 1.0, rr);
    acc = acc * (1.0 - mask) + vec4(c0, 1.0) * mask;
  }
  return acc * strength;
}
void main() {
  vec2 p = vec2(v_uv.x, 1.0 - v_uv.y) * u_size;
  vec4 S = texture(u_surface, v_uv);
  vec2 pf = p - S.yz * u_viewRefraction;
  vec4 bed = texture(u_floor, uvOf(pf));
  vec3 albedo = pow(bed.rgb, vec3(2.2));
  float sunlit = bed.a * 1.5;
  // sunlight and fish shadows land on a raised stone before they would have reached the bed around it
  vec2 pl = pf + vec2(0.6331, 0.4892) * texture(u_relief, uvOf(pf)).r * u_heightScale;
  // seaweed lies on the bed, so it takes the same caustics and fish shadows
  vec4 plant = texture(u_plants, uvOf(pf));
  albedo = mix(albedo, pow(plant.rgb / max(plant.a, 1e-3), vec3(2.2)), plant.a);

  vec2 split = S.yz * u_dispersion;
  vec3 C = vec3(
    texture(u_caustic, uvOf(pl + split)).r,
    texture(u_caustic, uvOf(pl)).g,
    texture(u_caustic, uvOf(pl - split)).b
  );
  C = pow(max(C, 0.0), vec3(1.5)) * 0.8;
  C *= exp(1.2 * tanh(-u_ringContrast * S.w / 1.2));

  float shadow = texture(u_shadow, uvOf(pl)).r * 0.95;
  vec3 light = u_ambient * (1.0 - 0.65 * shadow) + u_sun * C * sunlit * (1.0 - 0.97 * shadow);
  vec3 col = albedo * light;

  // fish are seen through the moving surface, which bends them ever so slightly
  vec2 shimmer = vec2(
    sin(p.y * 0.21 + u_time * 1.9 + sin(p.x * 0.05 + u_time * 0.7) * 1.5),
    sin(p.x * 0.19 - u_time * 1.6 + sin(p.y * 0.06 - u_time * 0.5) * 1.5)
  ) * 0.12;
  vec2 fp = p - S.yz * u_viewRefraction * 0.3 + shimmer;
  vec2 soften = vec2(0.55) / u_size;
  vec4 fish = texture(u_fish, uvOf(fp)) * 0.4
    + (texture(u_fish, uvOf(fp) + vec2(soften.x, 0.0)) + texture(u_fish, uvOf(fp) - vec2(soften.x, 0.0))
     + texture(u_fish, uvOf(fp) + vec2(0.0, soften.y)) + texture(u_fish, uvOf(fp) - vec2(0.0, soften.y))) * 0.15;
  col = col * (1.0 - fish.a) + fish.rgb;

  // green water takes the warm light out of everything seen through it
  col *= mix(vec3(1.0), vec3(0.88, 1.03, 0.9), u_green * 0.75);

  if (u_lily + u_leaves > 0.001) {
    vec4 dec = vec4(0.0);
    float shade = 0.0;
    if (u_leaves > 0.001) { vec4 l = floatingLeaves(p, u_leaves, shade); dec = dec * (1.0 - l.a) + l; }
    if (u_lily > 0.001) { vec4 l = lilyPads(p, u_lily, shade); dec = dec * (1.0 - l.a) + l; }
    col *= 1.0 - shade * 0.3 * max(u_lily, u_leaves);
    col = col * (1.0 - dec.a) + dec.rgb;
  }

  col = pow(aces(col * u_exposure), vec3(1.0 / 2.2));
  col += (hash12(gl_FragCoord.xy + fract(u_time * 7.13) * 311.0) - 0.5) * 0.028;
  o = vec4(col, 1.0);
}`,ea=`${Te}${$e}
in vec2 v_uv;
uniform sampler2D u_scene;
uniform vec2 u_size;
uniform float u_unit;
uniform float u_feather;
uniform float u_blur;
/** film grain strength, grain size in device px, and which frame of grain to show */
uniform float u_grain;
uniform float u_grainSize;
uniform float u_grainFrame;
out vec4 o;
// soft clumps of grain, zero mean, roughly -1..1
float grainAt(vec2 x) {
  return (vnoise(x) * 0.65 + vnoise(x * 2.03 + 19.7) * 0.35 - 0.5) * 2.0;
}
void main() {
  vec2 p = vec2(v_uv.x, 1.0 - v_uv.y) * u_size;
  // distance in from a very rounded outline that wanders inward here and there, so the pond dissolves into the page
  // instead of ending in a frame; it never reaches past the canvas, so nothing gets cut off at the border
  vec2 halfSize = u_size * 0.5;
  float corner = u_feather * 1.8;
  vec2 q = abs(p - halfSize) - (halfSize - corner);
  float inside = corner - length(max(q, 0.0)) - min(max(q.x, q.y), 0.0);
  vec2 wp = p / u_unit;
  float wander = snoise(vec3(wp * 0.007, 3.1)) * 0.65 + snoise(vec3(wp * 0.018, 8.3)) * 0.35;
  inside -= clamp(wander * 0.5 + 0.5, 0.0, 1.0) * u_feather * 0.25;

  vec3 col = texture(u_scene, v_uv).rgb;
  float radius = (1.0 - smoothstep(0.0, u_feather * 0.9, inside)) * u_blur;
  if (radius > 0.25 && inside > 0.0) {
    vec3 sum = col;
    for (int i = 0; i < 16; i++) {
      float fi = float(i) + 0.5;
      float a = fi * 2.39996;
      vec2 offset = vec2(cos(a), -sin(a)) * sqrt(fi / 16.0) * radius / u_size;
      sum += texture(u_scene, v_uv + offset).rgb;
    }
    col = sum / 17.0;
  }
  // mild film grain over everything, re-rolled every film frame, with a touch of colour and strongest in the midtones
  vec2 gp = gl_FragCoord.xy / u_grainSize + hash22(vec2(u_grainFrame, 7.0)) * 512.0;
  vec3 grain = grainAt(gp) * 0.8 + vec3(grainAt(gp + 41.3), grainAt(gp + 83.1), grainAt(gp + 127.9)) * 0.2;
  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  col = max(col + grain * u_grain * mix(0.55, 1.0, 4.0 * luma * (1.0 - luma)), 0.0);

  // a long, gentle tail so there's no visible line where the water ends
  float alpha = pow(smoothstep(0.0, 1.0, clamp(inside / u_feather, 0.0, 1.0)), 1.3);
  o = vec4(col * alpha, alpha);
}`,Et=[.9,.92,.66],St=["a_pos","a_local","a_tan","a_fish","a_motion"];function Lt(B,j){let v,x,E,C,_,c,H,g,D,G,e=B.getContext("webgl2",{alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:"high-performance"});if(!e||!e.getExtension("EXT_color_buffer_float"))return null;let k=[];function V(n,s,o=[]){let r=e.createProgram();for(let[m,T]of[[e.VERTEX_SHADER,n],[e.FRAGMENT_SHADER,s]]){let A=e.createShader(m);if(e.shaderSource(A,T),e.compileShader(A),!e.getShaderParameter(A,e.COMPILE_STATUS)&&!e.isContextLost())throw Error(e.getShaderInfoLog(A)??"Pond shader failed to compile");e.attachShader(r,A),e.deleteShader(A)}if(o.forEach((m,T)=>e.bindAttribLocation(r,T,m)),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS)&&!e.isContextLost())throw Error(e.getProgramInfoLog(r)??"Pond program failed to link");k.push(r);let h=new Map;return{program:r,u:m=>(h.has(m)||h.set(m,e.getUniformLocation(r,m)),h.get(m))}}try{v=V(Je,Ht),x=V(Je,Gt),E=V(Vt,Yt,["a_pos"]),C=V(Je,Wt),_=V(Je,Xt),c=V(zt,Jt,St),H=V(zt,Kt,St),g=V(Je,Zt),D=V(Je,ea),G=V($t,Qt,["a_pos","a_leaf"])}catch(n){return console.error(n),k.forEach(s=>e.deleteProgram(s)),null}let me=e.createVertexArray(),ce=new Float32Array(64*j*108),F=e.createVertexArray(),U=e.createBuffer(),X=e.createBuffer();e.bindVertexArray(F),e.bindBuffer(e.ARRAY_BUFFER,U),e.bufferData(e.ARRAY_BUFFER,ce.byteLength,e.DYNAMIC_DRAW),[2,2,2,4,2].reduce((n,s,o)=>(e.enableVertexAttribArray(o),e.vertexAttribPointer(o,s,e.FLOAT,!1,48,4*n),n+s),0);let J=[];for(let n=0;n<j;n++){let s=64*n*9;for(let o=0;o<63;o++)for(let r=0;r<8;r++){let h=s+9*o+r;J.push(h,h+9,h+1,h+1,h+9,h+9+1)}}e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,X),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(J),e.STATIC_DRAW),e.bindVertexArray(null);let Y=new Float32Array(128),ae=0,ue=new Float32Array(128),fe=0,K=new Float32Array(64),I=0,w=null;const xe=[.028,.062,.09],Be=[.03,.066,.056],Re={species:0,green:0,leaves:0,lily:0},re={species:0,green:0,leaves:0,lily:0},Ie=[0,0,0],je=[0,0,0];let Ve=0;function Q(n,s,o){let r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),o?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,n,s,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,n,s,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let h=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,h),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),{tex:r,fb:h,w:n,h:s}}function Qe(n){e.deleteTexture(n.tex),e.deleteFramebuffer(n.fb)}function he(n){e.bindFramebuffer(e.FRAMEBUFFER,n?n.fb:null),e.viewport(0,0,n?n.w:e.drawingBufferWidth,n?n.h:e.drawingBufferHeight)}function Z(n,s,o,r){e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,o),e.uniform1i(n.u(s),r)}function Me(){e.bindVertexArray(me),e.drawArrays(e.TRIANGLES,0,3)}function Ye(n,s,o){e.useProgram(C.program),he(s),Z(C,"u_tex",n.tex,0),e.uniform2f(C.u("u_dir"),o/n.w,0),Me(),he(n),Z(C,"u_tex",s.tex,0),e.uniform2f(C.u("u_dir"),0,o/n.h),Me()}function Ze(){if(!w)return;let{rippleA:n,rippleB:s,surface:o,caustic:r,causticBlur:h,floor:m,relief:T,plants:A,fish:W,shadow:$,shadowBlur:ee,scene:ie}=w;[n,s,o,r,h,m,T,A,W,$,ee,ie].forEach(Qe),e.deleteVertexArray(w.gridVao),e.deleteVertexArray(w.seaweedVao),w.seaweedBuffers.forEach(_e=>e.deleteBuffer(_e)),w.gridBuffers.forEach(_e=>e.deleteBuffer(_e)),w=null}function et(n){let s;if(!w)return;let{width:o,height:r}=w;e.disable(e.BLEND);let h=o/540;e.useProgram(_.program),e.uniform2f(_.u("u_size"),o,r),e.uniform1f(_.u("u_unit"),h),e.uniform1f(_.u("u_heightScale"),40*h);let m=(s=o/540,{placement:new Float32Array(Ke.flatMap(T=>[T.x*o,T.y*r,T.angle,T.seed])),size:new Float32Array(Ke.flatMap(T=>[T.length*s,T.width*s,T.height*s,T.kind]))});for(let[T,A]of(e.uniform4fv(_.u("u_stones[0]"),m.placement),e.uniform4fv(_.u("u_stoneSize[0]"),m.size),n))he(T),e.uniform1i(_.u("u_pass"),A),e.uniform1f(_.u("u_pixel"),o/T.w),Me()}return{fishVertices:ce,resize:function(n,s,o){let r,h,m,T,A=Math.max(1,Math.round(n)),W=Math.max(1,Math.round(s)),$=Math.max(1,Math.round(n*o)),ee=Math.max(1,Math.round(s*o));if(w&&w.width===A&&w.height===W){if(B.width===$&&B.height===ee)return;[w.floor,w.plants,w.fish,w.scene].forEach(Qe),B.width=$,B.height=ee,w.floor=Q($,ee,!1),w.plants=Q($,ee,!1),w.fish=Q($,ee,!0),w.scene=Q($,ee,!1),et([[w.floor,0]]);return}Ze(),B.width=$,B.height=ee;let ie=Math.ceil((A+96)/2)+1,_e=Math.ceil((W+96)/2)+1,a=new Float32Array(ie*_e*2);for(let l=0;l<_e;l++)for(let f=0;f<ie;f++)a[(l*ie+f)*2]=-48+2*f,a[(l*ie+f)*2+1]=-48+2*l;let i=new Uint32Array((ie-1)*(_e-1)*6),t=0;for(let l=0;l<_e-1;l++)for(let f=0;f<ie-1;f++){let M=l*ie+f;i[t++]=M,i[t++]=M+ie,i[t++]=M+1,i[t++]=M+1,i[t++]=M+ie,i[t++]=M+ie+1}let u=e.createVertexArray(),p=e.createBuffer(),b=e.createBuffer();e.bindVertexArray(u),e.bindBuffer(e.ARRAY_BUFFER,p),e.bufferData(e.ARRAY_BUFFER,a,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,b),e.bufferData(e.ELEMENT_ARRAY_BUFFER,i,e.STATIC_DRAW),e.bindVertexArray(null),et([[(w={width:A,height:W,unit:A/540,rippleA:Q(A,W,!0),rippleB:Q(A,W,!0),surface:Q(A,W,!0),caustic:Q(A,W,!0),causticBlur:Q(A,W,!0),floor:Q($,ee,!1),relief:Q(A,W,!1),plants:Q($,ee,!1),fish:Q($,ee,!0),shadow:Q(Math.ceil(A/2),Math.ceil(W/2),!1),shadowBlur:Q(Math.ceil(A/2),Math.ceil(W/2),!1),scene:Q($,ee,!1),gridVao:u,gridBuffers:[p,b],gridIndexCount:i.length,...(r=(function(l,f){let M=l/540,y=Ot,z=()=>(y=16807*y%2147483647)/2147483647,d=[...Mt];for(let q=0;d.length<Mt.length+7&&q<400;q++){let te=z(),N=z(),le=Math.min(te*l,(1-te)*l,N*f,(1-N)*f);!(le<50*M)&&!(le>110*M)&&(d.some(P=>Math.hypot((P.x-te)*l,(P.y-N)*f)<60*M)||Ke.some(P=>Math.hypot((P.x-te)*l,(P.y-N)*f)<(P.length+25)*M)||d.push({x:te,y:N,angle:.55+(z()-.5)*.6,spread:1.3,count:4+Math.floor(3*z()),root:6,length:[16,38],width:[4,6.5]}))}let R=d.flatMap(q=>Array.from({length:q.count},()=>({x:q.x*l+(z()-.5)*q.root*M,y:q.y*f+(z()-.5)*q.root*M,angle:q.angle+(z()-.5)*q.spread,length:(q.length[0]+z()*(q.length[1]-q.length[0]))*M,width:(q.width[0]+z()*(q.width[1]-q.width[0]))*M,curl:(z()-.5)*1.2,seed:z()}))),ne=new Float32Array(14*R.length*10),O=new Uint16Array(13*R.length*6),se=0;function oe(q){let te=0;for(let N of R){let le=N.length/13,P=N.x,ze=N.y;for(let Ce=0;Ce<14;Ce++){let be=Ce/13,tt=.28*Math.sin(.8*q+17*N.seed-2.4*be)*be+.05*Math.sin(1.9*q+5*N.seed-4.5*be)*be,Oe=N.angle+N.curl*be+tt;Ce>0&&(P+=Math.cos(Oe)*le,ze+=Math.sin(Oe)*le);let ot=.5*N.width*Math.pow(Math.sin(Math.PI*Math.min(1,.15+.85*be)),.6),L=-Math.sin(Oe)*ot,ve=Math.cos(Oe)*ot;for(let Ee of[-1,1])ne[te++]=P+L*Ee,ne[te++]=ze+ve*Ee,ne[te++]=be,ne[te++]=Ee,ne[te++]=N.seed}}}return R.forEach((q,te)=>{let N=14*te*2;for(let le=0;le<13;le++){let P=N+2*le;O.set([P,P+2,P+1,P+1,P+2,P+3],se),se+=6}}),oe(0),{vertices:ne,indices:O,write:oe}})(A,W),h=e.createVertexArray(),m=e.createBuffer(),T=e.createBuffer(),e.bindVertexArray(h),e.bindBuffer(e.ARRAY_BUFFER,m),e.bufferData(e.ARRAY_BUFFER,r.vertices,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,20,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,3,e.FLOAT,!1,20,8),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,T),e.bufferData(e.ELEMENT_ARRAY_BUFFER,r.indices,e.STATIC_DRAW),e.bindVertexArray(null),{seaweed:r,seaweedVao:h,seaweedBuffers:[m,T]})}).floor,0],[w.relief,1]])},drop:function(n,s,o,r){!(ae>=32)&&(Y.set([n,s,o,r],4*ae),ae++)},splash:function(n,s,o,r){return!(fe>=32)&&(ue.set([n,s,o,r],4*fe),fe++,!0)},splashRoom:function(){return 32-fe},push:function(n,s,o,r){return!(I>=16)&&(K.set([n,s,o,r],4*I),I++,!0)},pushRoom:function(){return 16-I},stepRipples:function(n){w&&(e.disable(e.BLEND),he(w.rippleB),e.useProgram(v.program),Z(v,"u_state",w.rippleA.tex,0),e.uniform2f(v.u("u_size"),w.width,w.height),e.uniform1f(v.u("u_dt"),n),e.uniform1f(v.u("u_stiffness"),22500),e.uniform2f(v.u("u_damping"),.06**n,.2**n),e.uniform1f(v.u("u_smoothing"),3*n),e.uniform1i(v.u("u_dropCount"),ae),e.uniform4fv(v.u("u_drops[0]"),Y),e.uniform1i(v.u("u_splashCount"),fe),e.uniform4fv(v.u("u_splashes[0]"),ue),e.uniform1i(v.u("u_pushCount"),I),e.uniform4fv(v.u("u_pushes[0]"),K),Me(),ae=0,fe=0,I=0,[w.rippleA,w.rippleB]=[w.rippleB,w.rippleA])},setLook:function(n,s){Re[n]=s},setPointer:function(n,s,o){Ie[0]=n,Ie[1]=s,Ie[2]=o?1:0},render:function(n){if(!w||e.isContextLost())return;let s=w,o=s.unit,r=Ve?Math.min(.1,n-Ve):.016;Ve=n;for(let m in re)m=="species"?re[m]=Re[m]:re[m]+=(Re[m]-re[m])*Math.min(1,5*r);for(let m=0;m<3;m++)je[m]+=(Ie[m]-je[m])*Math.min(1,9*r);let h=[xe[0]+(Be[0]-xe[0])*re.green,xe[1]+(Be[1]-xe[1])*re.green,xe[2]+(Be[2]-xe[2])*re.green];e.disable(e.BLEND),he(s.surface),e.useProgram(x.program),Z(x,"u_state",s.rippleA.tex,0),e.uniform2f(x.u("u_size"),s.width,s.height),e.uniform1f(x.u("u_time"),n),e.uniform1f(x.u("u_scale"),.0042/o),e.uniform2f(x.u("u_fine"),.05,.35),e.uniform2f(x.u("u_big"),.13,.55),Me(),he(s.caustic),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.useProgram(E.program),Z(E,"u_surface",s.surface.tex,0),e.uniform2f(E.u("u_size"),s.width,s.height),e.uniform1f(E.u("u_depth"),560*o*o),e.bindVertexArray(s.gridVao),e.drawElements(e.TRIANGLES,s.gridIndexCount,e.UNSIGNED_INT,0),e.disable(e.BLEND),Ye(s.caustic,s.causticBlur,1.3),e.useProgram(H.program),he(s.shadow),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.bindVertexArray(F),e.bindBuffer(e.ARRAY_BUFFER,U),e.bufferSubData(e.ARRAY_BUFFER,0,ce),e.uniform2f(H.u("u_size"),s.width,s.height),e.uniform1f(H.u("u_time"),n),e.uniform2f(H.u("u_offset"),22*o,17*o),e.uniform1f(H.u("u_species"),re.species),e.drawElements(e.TRIANGLES,3024*j,e.UNSIGNED_SHORT,0),e.disable(e.BLEND),Ye(s.shadow,s.shadowBlur,1.2),Ye(s.shadow,s.shadowBlur,1.2),he(s.fish),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(c.program),Z(c,"u_caustic",s.caustic.tex,0),e.uniform2f(c.u("u_size"),s.width,s.height),e.uniform2f(c.u("u_offset"),0,0),e.uniform1f(c.u("u_time"),n),e.uniform3fv(c.u("u_ambient"),h),e.uniform3fv(c.u("u_sun"),Et),e.uniform1f(c.u("u_species"),re.species),e.uniform1f(c.u("u_fishLight"),.62),e.uniform1f(c.u("u_pixel"),s.width/s.fish.w),e.bindVertexArray(F),e.drawElements(e.TRIANGLES,3024*j,e.UNSIGNED_SHORT,0),e.disable(e.BLEND),s.seaweed.write(n),he(s.plants),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(G.program),e.uniform2f(G.u("u_size"),s.width,s.height),e.bindVertexArray(s.seaweedVao),e.bindBuffer(e.ARRAY_BUFFER,s.seaweedBuffers[0]),e.bufferSubData(e.ARRAY_BUFFER,0,s.seaweed.vertices),e.drawElements(e.TRIANGLES,s.seaweed.indices.length,e.UNSIGNED_SHORT,0),e.disable(e.BLEND),he(s.scene),e.useProgram(g.program),Z(g,"u_floor",s.floor.tex,0),Z(g,"u_surface",s.surface.tex,1),Z(g,"u_caustic",s.caustic.tex,2),Z(g,"u_shadow",s.shadow.tex,3),Z(g,"u_fish",s.fish.tex,4),Z(g,"u_plants",s.plants.tex,5),Z(g,"u_relief",s.relief.tex,6),e.uniform1f(g.u("u_heightScale"),40*o),e.uniform2f(g.u("u_size"),s.width,s.height),e.uniform1f(g.u("u_time"),n),e.uniform3fv(g.u("u_ambient"),h),e.uniform3fv(g.u("u_sun"),Et),e.uniform1f(g.u("u_green"),re.green),e.uniform1f(g.u("u_lily"),re.lily),e.uniform1f(g.u("u_leaves"),re.leaves),e.uniform3fv(g.u("u_pointer"),je),e.uniform1f(g.u("u_viewRefraction"),120*o*o),e.uniform1f(g.u("u_dispersion"),60*o*o),e.uniform1f(g.u("u_ringContrast"),150),e.uniform1f(g.u("u_exposure"),1.3),Me(),he(null),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(D.program),Z(D,"u_scene",s.scene.tex,0),e.uniform2f(D.u("u_size"),s.width,s.height),e.uniform1f(D.u("u_unit"),o),e.uniform1f(D.u("u_feather"),30*o),e.uniform1f(D.u("u_blur"),0*o),e.uniform1f(D.u("u_grain"),.07),e.uniform1f(D.u("u_grainSize"),1.2*(e.drawingBufferWidth/s.width)),e.uniform1f(D.u("u_grainFrame"),Math.floor(24*n)%1024),Me()},dispose:function(){Ze(),k.forEach(n=>e.deleteProgram(n)),e.deleteVertexArray(me),e.deleteVertexArray(F),e.deleteBuffer(U),e.deleteBuffer(X)}}}function ta(B,j){let v=B,x=j;if(!v||!x)return{setSpecies(){},setWater(){},setDecor(){},ripple(){},destroy(){}};let E=v.clientWidth,C=v.clientHeight,_=(function(o,r){let h=o,m=r,T=[],A=It.map(a=>{let i=a.size*o,t={kind:a.kind,seed:a.seed,size:a.size,length:i,lift:a.lift,x:a.x*o,y:a.y*r,prevHeadX:a.x*o,prevHeadY:a.y*r,heading:a.heading,turn:0,speed:0,cruise:i*(.2+.1*a.seed),goalX:a.x*o,goalY:a.y*r,goalUntil:0,fear:0,fleeAngle:0,beat:a.seed*lt,flickSide:1,flicked:!1,finPhase:20*a.seed,fold:0,swim:.4,spine:new Float32Array(44),trail:new Float32Array(320),trailCount:160,rows:new Float32Array(256)};t.speed=t.cruise;for(let u=0;u<160;u++)t.trail[2*u]=t.x-Math.cos(t.heading)*i*.02*u,t.trail[2*u+1]=t.y-Math.sin(t.heading)*i*.02*u;return $(t),ee(t),t}),W=[...A].sort((a,i)=>a.lift-i.lift);function $(a){let{spine:i,trail:t}=a,u=1.52*a.length/21;i[0]=a.x,i[1]=a.y;let p=a.x,b=a.y,l=u,f=1;for(let d=0;f<22&&d<a.trailCount;){let R=Math.hypot(t[2*d]-p,t[2*d+1]-b);R>=l?(p+=(t[2*d]-p)*l/R,b+=(t[2*d+1]-b)*l/R,i[2*f]=p,i[2*f+1]=b,f++,l=u):(l-=R,p=t[2*d],b=t[2*d+1],d++)}let M=f>=2?i[(f-1)*2]-i[(f-2)*2]:-Math.cos(a.heading),y=f>=2?i[(f-1)*2+1]-i[(f-2)*2+1]:-Math.sin(a.heading),z=Math.hypot(M,y)||1;for(M/=z,y/=z;f<22;f++)i[2*f]=i[(f-1)*2]+M*u,i[2*f+1]=i[(f-1)*2+1]+y*u}function ee(a){let{spine:i,rows:t,length:u}=a,p=Math.cos(a.heading),b=Math.sin(a.heading);for(let l=0;l<64;l++){let f,M,y,z,d=dt(l);if(d<=0)f=a.x-p*d*u,M=a.y-b*d*u,y=p,z=b;else{let ne=21*Math.min(d/1.52,1),O=Math.min(Math.floor(ne),20),se=ne-O;f=i[2*O]+(i[(O+1)*2]-i[2*O])*se,M=i[2*O+1]+(i[(O+1)*2+1]-i[2*O+1])*se;let oe=Math.hypot(y=i[2*O]-i[(O+1)*2],z=i[2*O+1]-i[(O+1)*2+1])||1;y/=oe,z/=oe}let R=u*(.008+.07*Math.pow(jt(.15,1.52,d),1.5))*a.swim*Math.sin(a.beat-5.2*d);t[4*l]=f-z*R,t[4*l+1]=M+y*R}for(let l=0;l<64;l++){let f=Math.max(l-1,0),M=Math.min(l+1,63),y=t[4*f]-t[4*M],z=t[4*f+1]-t[4*M+1],d=Math.hypot(y,z)||1;t[4*l+2]=y/d,t[4*l+3]=z/d}}function ie(a,i,t,u){let p=4*Ne(.45),b=a.rows[p]-i,l=a.rows[p+1]-t;if(4>Math.hypot(b,l)){let f=.5>Math.random()?1:-1;b=-Math.sin(a.heading)*f,l=Math.cos(a.heading)*f}a.fleeAngle=Math.atan2(l,b)+(Math.random()-.5)*.8,a.fear=Math.max(a.fear,u)}function _e(a,i,t,u,p){for(let b of A){if(b===p)continue;let l=Math.hypot(b.x-a,b.y-i);l<t&&ie(b,a,i,u*(1-l/t))}}return{count:A.length,update:function(a,i){for(let t of A){let u=t.length,p=4*Ne(.12);t.prevHeadX=t.rows[p],t.prevHeadY=t.rows[p+1],(i>t.goalUntil||Math.hypot(t.goalX-t.x,t.goalY-t.y)<.8*u)&&(function(L,ve){let Ee=-1/0;for(let at=0;at<6;at++){let He=h*(.12+.76*Math.random()),pe=m*(.12+.76*Math.random()),We=Math.hypot(He-L.x,pe-L.y);if(We<1.2*L.length)continue;let Ge=1/0;for(let Se of A)Se!==L&&(Ge=Math.min(Ge,Math.hypot(He-Se.x,pe-Se.y),Math.hypot(He-Se.goalX,pe-Se.goalY)));let Pe=Math.min(Ge,2.5*L.length)-.15*We;Pe>Ee&&(Ee=Pe,L.goalX=He,L.goalY=pe)}L.goalUntil=ve+8+10*Math.random()})(t,i);let b=Math.cos(t.heading),l=Math.sin(t.heading),f=Math.hypot(t.goalX-t.x,t.goalY-t.y)||1,M=(t.goalX-t.x)/f,y=(t.goalY-t.y)/f,z=.18*Math.sin(.4*i+17*t.seed)+.05*Math.sin(1.1*i+5*t.seed),d=M-y*z,R=y+M*z,ne=t.x+b*u*.8,O=t.y+l*u*.8,se=-.15*u,oe=L=>Math.max(L,0)/u,q=oe(se-ne)-oe(ne-(h-se)),te=oe(se-O)-oe(O-(m-se));d+=q*(4+8*Math.abs(q)),R+=te*(4+8*Math.abs(te));let N=0;for(let L of A){if(L===t)continue;let ve=(u+L.length)*.55;for(let Ee of[0,.6,1.3]){let at=t.x+b*u*Ee,He=t.y+l*u*Ee,pe=1/0,We=0,Ge=0;for(let Se=Ne(0);Se<Ne(1.1);Se+=3){let Xe=4*Se,gt=4*Math.min(Se+3,63),it=L.rows[gt]-L.rows[Xe],nt=L.rows[gt+1]-L.rows[Xe+1],xt=Ue(((at-L.rows[Xe])*it+(He-L.rows[Xe+1])*nt)/(it*it+nt*nt||1),0,1),_t=at-(L.rows[Xe]+it*xt),bt=He-(L.rows[Xe+1]+nt*xt),yt=Math.hypot(_t,bt);yt<pe&&(pe=yt,We=_t,Ge=bt)}if(pe>=ve)continue;let Pe=1-pe/ve;pe<1&&(We=-l,Ge=b,pe=1),d+=We/pe*Pe*Pe*9,R+=Ge/pe*Pe*Pe*9,N=Math.max(N,Pe*(Ee>1?.6:1))}}N>.6&&(t.goalUntil=Math.min(t.goalUntil,i+1.2)),t.fear>.02&&(d+=Math.cos(t.fleeAngle)*t.fear*6,R+=Math.sin(t.fleeAngle)*t.fear*6);let le=Rt(Math.atan2(R,d)-t.heading),P=Math.min(.6+2.4*N+8*t.fear,6,.3+t.speed/(.5*u)),ze=1.2+2*N+8*t.fear,Ce=Ue(le*ze,-P,P);t.turn+=(Ce-t.turn)*(1-Math.exp(-a*ze*4.5)),t.heading=Rt(t.heading+t.turn*a);let be=.7+.45*(.5+.5*Math.sin(.37*i+23*t.seed)),tt=t.cruise*be*(1-.35*Math.min(Math.abs(le),1))*(1-.4*N)+t.fear*u*3.4;t.speed+=(tt-t.speed)*(1-Math.exp(-a*(t.fear>.15?7:1.1))),t.x+=Math.cos(t.heading)*t.speed*a,t.y+=Math.sin(t.heading)*t.speed*a,t.fear*=Math.exp(-(1.5*a));let Oe=t.speed/u,ot=t.beat;t.beat+=a*lt*(.7+2.2*Oe),Math.floor(t.beat/Math.PI)!==Math.floor(ot/Math.PI)&&(t.flicked=!0),t.finPhase+=a*lt*(.8+.4*t.seed),t.fold+=((t.fear>.25)-t.fold)*(1-Math.exp(-(6*a))),t.swim=.3+.7*Ue(Oe/1.2,0,1),(function(L){let ve=L.trail;Math.hypot(L.x-ve[0],L.y-ve[1])<.02*L.length||(ve.copyWithin(2,0,ve.length-2),ve[0]=L.x,ve[1]=L.y,L.trailCount=Math.min(L.trailCount+1,160))})(t),$(t),ee(t)}},writeVertices:function(a){let i=0;for(let t of W){let{rows:u,length:p}=t;for(let b=0;b<64;b++){let l=dt(b),f=u[4*b],M=u[4*b+1],y=u[4*b+2],z=u[4*b+3];for(let d=0;d<9;d++){let R=-.55+1.1*d/8;a[i++]=f-z*R*p,a[i++]=M+y*R*p,a[i++]=l,a[i++]=R,a[i++]=y,a[i++]=z,a[i++]=t.kind+t.seed,a[i++]=p,a[i++]=t.beat,a[i++]=t.lift,a[i++]=t.fold,a[i++]=t.finPhase}}}},emitRipples:function(a,i,t,u){let p=180*t;for(let[b,l,f,M]of(A.forEach((y,z)=>{let{rows:d,length:R}=y,ne=y.speed/R,O=4*Ne(.12),se=y.prevHeadX+(d[O]-y.prevHeadX)*i,oe=y.prevHeadY+(d[O+1]-y.prevHeadY)*i,q=d[O+2],te=d[O+3],N=2800*Math.tanh(y.speed/380);if(N>20&&u.pushRoom()>=2&&(u.push(se+q*R*.08,oe+te*R*.08,.11*R,N),u.push(se-q*R*.12,oe-te*R*.12,.11*R,-N)),y.flicked){y.flicked=!1,y.flickSide=-y.flickSide;let P=4*Ne(1.3),ze=y.flickSide*R*.05;u.drop(d[P]-d[P+3]*ze,d[P+1]+d[P+2]*ze,3.2,.06+.24*Ue(ne/2,0,1))}let le=1-Ue(ne/.5,0,1);if(le>.05){let P=4*Ne(.26),ze=.05*Math.sin(a*lt*14+1.7*z)*le*(1-y.fold)*p;for(let Ce of[1,-1]){let be=-d[P+3]*Ce*.09*R,tt=d[P+2]*Ce*.09*R;u.drop(d[P]+be,d[P+1]+tt,3,ze)}}}),T))u.splash(b,l,f,M);T.length=0},hitTest:function(a,i){for(let t=W.length-1;t>=0;t--){let u=W[t],{rows:p,length:b}=u;for(let l=0;l<63;l++){let f=dt(l);if(f<0)continue;let M=(f<=1?(function(y){if(y<0)return 0;let z=Math.sqrt(Math.max(0,1-(Math.max(.3-y,0)/.3)**2));return(.05+.085*(1-Ue((y-.3)/.7,0,1)**1.4))*z})(f)*b:.12*b)+10;if((function(y,z,d,R,ne,O){let se=ne-d,oe=O-R,q=Ue(((y-d)*se+(z-R)*oe)/(se*se+oe*oe||1),0,1);return Math.hypot(y-(d+se*q),z-(R+oe*q))})(a,i,p[4*l],p[4*l+1],p[(l+1)*4],p[(l+1)*4+1])<M)return u}}return null},scare:function(a,i,t){let u=a.fear<.5;if(ie(a,i,t,1),!u)return;a.speed=Math.max(a.speed,1.2*a.length);let p=4*Ne(1.3);T.length<6&&T.push([a.rows[p],a.rows[p+1],7,1.6]),_e(i,t,1.8*a.length,.6,a)},disturb:_e,resize:function(a,i){let t=a/(h||a),u=i/(m||i);for(let p of(h=a,m=i,A)){p.x*=t,p.y*=u;for(let l=0;l<22;l++)p.spine[2*l]*=t,p.spine[2*l+1]*=u;for(let l=0;l<160;l++)p.trail[2*l]*=t,p.trail[2*l+1]*=u;let b=p.size*a/p.length;p.length*=b,p.cruise*=b,p.speed*=b,ee(p)}}}})(E,C),c=Lt(x,_.count);if(!c){v.dataset.fallback="";return}let H=window.matchMedia("(prefers-reduced-motion: reduce)"),g=0,D=0,G=40,e=!1,k=0,V=2,me=()=>Math.min(window.devicePixelRatio||1,V),ce=150,F=[],U=0,X=0,J=0,Y=0,ae=!1,ue=o=>{V=o,c==null||c.resize(E,C,me()),ce=60},fe=()=>c!==null&&e&&!document.hidden&&(!H.matches||performance.now()<k),K=o=>{if(g=0,!c||!fe()){D=0;return}let r=D?Math.min((o-D)/1e3,.05):1/60;D?(m=>{if(ae)return;if(ce>0)return ce--;if(F.push(m),F.length<90)return;let T=F.sort((ee,ie)=>ee-ie)[F.length>>1];F.length=0;let A=me(),W=T<=22;if(!U){if(W||A<=1)return;U=J=A,X=T,ue(1);return}W?Y=A:J=A;let $=.25*Math.round((J+Y)/2/.25);if(Y&&$>Y&&$<J)return ue($);Y?ue(Y):T>.8*X&&ue(U),ae=!0})(o-D):(ce=Math.max(ce,60),F.length=0),D=o,G+=r,_.update(r,G);let h=Math.min(12,Math.max(1,Math.ceil(300*r-.01)));for(let m=1;m<=h;m++)_.emitRipples(G-r+r*m/h,m/h,r/h,c),c.stepRipples(r/h);_.writeVertices(c.fishVertices),c.setPointer(re,Ie,je),c.render(G),g=requestAnimationFrame(K)},I=()=>{!g&&fe()&&(g=requestAnimationFrame(K))},w=()=>{E=v.clientWidth,C=v.clientHeight,c&&E&&C&&(_.resize(E,C),c.resize(E,C,me()),!g&&c&&(_.writeVertices(c.fishVertices),c.render(G)))},xe=()=>{k=performance.now()+4e3,I()},Be=o=>{let r=x.getBoundingClientRect();return[(o.clientX-r.left)/r.width*E,(o.clientY-r.top)/r.height*C]},Re=null,re=0,Ie=0,je=0,Ve=o=>{let[r,h]=Be(o);re=r,Ie=h,je=1},Q=()=>{je=0},Qe=o=>{if(!c||o.button>0)return;let[r,h]=Be(o),m=_.hitTest(r,h);m?(_.scare(m,r,h),c.splash(r,h,7,1.4)):(c.splash(r,h,9,2.6),c.drop(r,h,3,.5),_.disturb(r,h,.3*E,.45)),Re=[r,h],xe()},he=o=>{if(!c||!Re)return;let[r,h]=Be(o);8>Math.hypot(r-Re[0],h-Re[1])||(c.splash(r,h,6,.9),_.disturb(r,h,.2*E,.3),Re=[r,h],xe())},Z=()=>{Re=null},Me=o=>{o.preventDefault(),cancelAnimationFrame(g),g=0,c=null},Ye=()=>{c=Lt(x,_.count),s(),w(),I()},Ze=new ResizeObserver(()=>requestAnimationFrame(w));Ze.observe(v);let et=new IntersectionObserver(([o])=>{e=o.isIntersecting,I()},{rootMargin:"200px"}),n={species:0,green:0,leaves:0,lily:0},s=()=>{if(c)for(let o in n)c.setLook(o,n[o])};return et.observe(v),w(),x.addEventListener("pointerdown",Qe),x.addEventListener("pointermove",Ve),x.addEventListener("pointerleave",Q),window.addEventListener("pointermove",he),window.addEventListener("pointerup",Z),window.addEventListener("pointercancel",Z),x.addEventListener("webglcontextlost",Me),x.addEventListener("webglcontextrestored",Ye),document.addEventListener("visibilitychange",I),H.addEventListener("change",I),{setSpecies(o){n.species={koi:0,betta:1,ranchu:2,jelly:3}[o]??0,s()},setWater(o){n.green=o==="green"?1:0,s()},setDecor(o){n.leaves=o.leaves?1:0,n.lily=o.lily?1:0,s()},ripple(){c&&c.splash(.5*E,.5*C,9,1.1)},destroy(){cancelAnimationFrame(g),Ze.disconnect(),et.disconnect(),x.removeEventListener("pointerdown",Qe),x.removeEventListener("pointermove",Ve),x.removeEventListener("pointerleave",Q),window.removeEventListener("pointermove",he),window.removeEventListener("pointerup",Z),window.removeEventListener("pointercancel",Z),x.removeEventListener("webglcontextlost",Me),x.removeEventListener("webglcontextrestored",Ye),document.removeEventListener("visibilitychange",I),H.removeEventListener("change",I),c==null||c.dispose()}}}var aa=Fe('<div class="controls svelte-1f5kpue" role="group" aria-label="Customize the pond"><div class="group svelte-1f5kpue" role="group" aria-label="Fish"><button type="button">Koi</button> <button type="button">Betta</button> <button type="button">Ranchu</button> <button type="button">Jelly</button></div> <span class="sep svelte-1f5kpue" aria-hidden="true"></span> <div class="group svelte-1f5kpue" role="group" aria-label="Water"><button type="button">Blue</button> <button type="button">Green</button></div> <span class="sep svelte-1f5kpue" aria-hidden="true"></span> <div class="group svelte-1f5kpue" role="group" aria-label="Objects"><button type="button">Leaves</button> <button type="button">Lily</button></div></div>');function sa(B,j){vt(j,!1);let v=st(j,"species",8),x=st(j,"water",8),E=st(j,"leaves",8),C=st(j,"lily",8),_=st(j,"onPick",8);mt();var c=aa(),H=Le(c),g=Le(H);let D;var G=de(g,2);let e;var k=de(G,2);let V;var me=de(k,2);let ce;Ae(H);var F=de(H,4),U=Le(F);let X;var J=de(U,2);let Y;Ae(F);var ae=de(F,4),ue=Le(ae);let fe;var K=de(ue,2);let I;Ae(ae),Ae(c),ct(()=>{ye(g,"aria-pressed",v()==="koi"),D=qe(g,1,"svelte-1f5kpue",null,D,{on:v()==="koi"}),ye(G,"aria-pressed",v()==="betta"),e=qe(G,1,"svelte-1f5kpue",null,e,{on:v()==="betta"}),ye(k,"aria-pressed",v()==="ranchu"),V=qe(k,1,"svelte-1f5kpue",null,V,{on:v()==="ranchu"}),ye(me,"aria-pressed",v()==="jelly"),ce=qe(me,1,"svelte-1f5kpue",null,ce,{on:v()==="jelly"}),ye(U,"aria-pressed",x()==="blue"),X=qe(U,1,"svelte-1f5kpue",null,X,{on:x()==="blue"}),ye(J,"aria-pressed",x()==="green"),Y=qe(J,1,"svelte-1f5kpue",null,Y,{on:x()==="green"}),ye(ue,"aria-pressed",E()),fe=qe(ue,1,"svelte-1f5kpue",null,fe,{on:E()}),ye(K,"aria-pressed",C()),I=qe(K,1,"svelte-1f5kpue",null,I,{on:C()})}),De("click",g,()=>_()({species:"koi"})),De("click",G,()=>_()({species:"betta"})),De("click",k,()=>_()({species:"ranchu"})),De("click",me,()=>_()({species:"jelly"})),De("click",U,()=>_()({water:"blue"})),De("click",J,()=>_()({water:"green"})),De("click",ue,()=>_()({leaves:!E()})),De("click",K,()=>_()({lily:!C()})),ge(B,c),pt()}Nt(["click"]);var oa=Fe('<div class="pond svelte-1atqw7w" role="img" aria-label="Fish swimming in a sunlit pond. Tap the water to make a ripple, or tap a fish to startle it."><canvas class="svelte-1atqw7w"></canvas> <!></div>');function ia(B,j){vt(j,!1);let v=ke(),x=ke(),E=ke(null),C=ke("koi"),_=ke("blue"),c=ke(!1),H=ke(!1);Ft(()=>{const k=ta(S(v),S(x));return we(E,k),()=>k.destroy()});function g(k){var V;"species"in k&&we(C,k.species),"water"in k&&we(_,k.water),"leaves"in k&&we(c,k.leaves),"lily"in k&&we(H,k.lily),(V=S(E))==null||V.ripple()}ht(()=>(S(E),S(C)),()=>{var k;(k=S(E))==null||k.setSpecies(S(C))}),ht(()=>(S(E),S(_)),()=>{var k;(k=S(E))==null||k.setWater(S(_))}),ht(()=>(S(E),S(c),S(H)),()=>{var k;(k=S(E))==null||k.setDecor({leaves:S(c),lily:S(H)})}),Ct(),mt();var D=oa(),G=Le(D);kt(G,k=>we(x,k),()=>S(x));var e=de(G,2);sa(e,{get species(){return S(C)},get water(){return S(_)},get leaves(){return S(c)},get lily(){return S(H)},onPick:g}),Ae(D),kt(D,k=>we(v,k),()=>S(v)),ge(B,D),pt()}var na=Fe('GitHub is not answering. <a target="_blank" rel="noreferrer" class="svelte-k6tj90">github.com/Ramasanjaya22</a>',1),ra=Fe('<strong class="svelte-k6tj90"> </strong> contributions in the last year',1),la=Fe('<!> <!> · <a target="_blank" rel="noreferrer" class="svelte-k6tj90">github.com/Ramasanjaya22</a>',1),ca=Fe("<i></i>"),ua=Fe('<div class="grid svelte-k6tj90" aria-hidden="true"></div>'),fa=Fe('<section class="gh svelte-k6tj90" aria-label="GitHub activity"><h2 class="label svelte-k6tj90">GitHub</h2> <div class="gh-body svelte-k6tj90"><p class="gh-note svelte-k6tj90"><!></p> <!></div></section>');function ha(B,j){vt(j,!1);const v="https://github-contributions-api.jogruber.de/v4/Ramasanjaya22?y=last",x="https://api.github.com/users/Ramasanjaya22",E="https://github.com/Ramasanjaya22";let C=ke([]),_=ke(null),c=ke(null),H=ke(!1);Ft(async()=>{var X,J,Y;const[F,U]=await Promise.allSettled([fetch(v).then(ae=>ae.json()),fetch(x).then(ae=>ae.json())]);F.status==="fulfilled"&&Array.isArray((X=F.value)==null?void 0:X.contributions)?(we(C,F.value.contributions),we(_,((J=F.value.total)==null?void 0:J.lastYear)??null)):we(H,!0),U.status==="fulfilled"&&typeof((Y=U.value)==null?void 0:Y.public_repos)=="number"&&we(c,U.value.public_repos)}),mt();var g=fa(),D=de(Le(g),2),G=Le(D),e=Le(G);{var k=F=>{var U=na(),X=de(ut(U));ye(X,"href",E),ge(F,U)},V=F=>{var U=la(),X=ut(U);{var J=K=>{var I=wt("Reading contributions…");ge(K,I)},Y=K=>{var I=ra(),w=ut(I),xe=qt(w,!0);ft(),ct(Be=>At(xe,Be),[()=>S(_).toLocaleString("en-US")]),ge(K,I)};rt(X,K=>{S(_)===null?K(J):K(Y,-1)})}var ae=de(X,2);{var ue=K=>{var I=wt();ct(()=>At(I,`· ${S(c)??""} public repos`)),ge(K,I)};rt(ae,K=>{S(c)!==null&&K(ue)})}var fe=de(ae,2);ye(fe,"href",E),ge(F,U)};rt(e,F=>{S(H)?F(k):F(V,-1)})}Ae(G);var me=de(G,2);{var ce=F=>{var U=ua();Ut(U,5,()=>S(C),X=>X.date,(X,J)=>{var Y=ca();ct(()=>{qe(Y,1,`l${S(J).level??""}`,"svelte-k6tj90"),ye(Y,"title",S(J).date+": "+S(J).count)}),ge(X,Y)}),Ae(U),ge(F,U)};rt(me,F=>{S(H)||F(ce)})}Ae(D),Ae(g),ge(B,g),pt()}var da=Fe('<meta name="description" content="Product engineer in Bandung: data pipelines, matching logic, interface. BYRIS, NusaSportJourney, BAKARA"/> <meta name="theme-color" content="#fbfbfb"/> <meta name="color-scheme" content="light"/> <meta name="author" content="Rama Sanjaya"/> <meta property="og:type" content="website"/> <meta property="og:site_name" content="Rama Sanjaya"/> <meta property="og:title" content="Rama Sanjaya — product engineer"/> <meta property="og:description" content="Data pipelines, matching logic, interface. Remote roles in SG, MY and AU"/> <meta property="og:image" content="https://ramasanjaya22.github.io/og.jpg"/> <meta property="og:image:width" content="1200"/> <meta property="og:image:height" content="630"/> <meta property="og:image:alt" content="The portfolio: a fish pond above, three project cards below"/> <meta name="twitter:card" content="summary_large_image"/>',1),va=Fe(`<main id="main" tabindex="-1" class="svelte-1uha8ag"><div class="stage svelte-1uha8ag"><!> <div class="intro svelte-1uha8ag"><p class="name svelte-1uha8ag">Rama Sanjaya</p> <h1 class="svelte-1uha8ag">I'm <span class="hand">Rama</span>, a product engineer in Bandung.</h1> <p class="svelte-1uha8ag">I build products and the machinery behind them: the schema, the matching, the screens. <b class="svelte-1uha8ag">BYRIS</b> is the
        current one — 1,170 Indonesian exporters, every claim scored against 71,349 rows of evidence.</p> <p class="svelte-1uha8ag">Bandung · GMT+7 · remote roles in SG, MY, AU · <a class="handle svelte-1uha8ag" href="https://www.linkedin.com/in/rama-sanjaya22/" target="_blank" rel="noreferrer">@ramasanjaya</a></p></div></div></main> <section class="cards svelte-1uha8ag" id="work" aria-label="Selected work"><h2 class="sr svelte-1uha8ag">Selected work</h2> <article class="card byris svelte-1uha8ag"><div class="demo svelte-1uha8ag"><img src="/work/byris/card-frame.jpg" alt="BYRIS opportunity desk: one opportunity, its matched candidates on the right" class="svelte-1uha8ag"/></div> <p class="claim svelte-1uha8ag">1,170 exporters, every claim scored against 71,349 evidence rows</p> <p class="facts svelte-1uha8ag">Python collection · Postgres lineage · Go matcher · SvelteKit desk</p> <footer class="svelte-1uha8ag"><h3 class="svelte-1uha8ag">BYRIS</h3><span>Product engineer · 2026</span></footer></article> <article class="card nsj svelte-1uha8ag"><div class="demo svelte-1uha8ag"><img src="/work/nusa/card-frame.jpg" alt="NusaSportJourney event page: race shot, registration panel, date and location" class="svelte-1uha8ag"/></div> <p class="claim svelte-1uha8ag">The organizer publishes races and results without touching code</p> <p class="facts svelte-1uha8ag">Next.js 16 · React 19 · self-hosted Strapi · design and CMS are mine</p> <footer class="svelte-1uha8ag"><h3 class="svelte-1uha8ag">NusaSportJourney</h3><span>Client work · design + CMS</span></footer></article> <article class="card bakara svelte-1uha8ag"><div class="demo svelte-1uha8ag"><img src="/work/bakara/card-frame.jpg" alt="BAKARA landing screen: logo, tagline, two calls to action" class="svelte-1uha8ag"/></div> <p class="claim svelte-1uha8ag">Batik patterns, written up in Indonesian and English</p> <p class="facts svelte-1uha8ag">SvelteKit · two languages · deployed</p> <footer class="svelte-1uha8ag"><h3 class="svelte-1uha8ag">BAKARA</h3><span>Product engineer · 2026</span></footer></article></section> <!> <section class="row xp svelte-1uha8ag" id="experience" aria-label="Experience and education"><h2 class="label svelte-1uha8ag">Background</h2> <div><ul class="svelte-1uha8ag"><li class="svelte-1uha8ag"><b class="svelte-1uha8ag">Independent product engineer</b> <span class="svelte-1uha8ag">Contract and independent work · remote · Feb 2026 – present</span></li> <li class="svelte-1uha8ag"><b class="svelte-1uha8ag">IT Staff · contract</b> <span class="svelte-1uha8ag">PT Eltran Indonesia · Nov 2024 – Jan 2026</span></li> <li class="svelte-1uha8ag"><b class="svelte-1uha8ag">Project freelancer</b> <span class="svelte-1uha8ag">Self-employed · Jan 2022 – present</span></li> <li class="svelte-1uha8ag"><b class="svelte-1uha8ag">Web development mentor</b> <span class="svelte-1uha8ag">Chevalier Laboratory · Aug 2022 – Aug 2023</span></li> <li class="svelte-1uha8ag"><b class="svelte-1uha8ag">IT intern · remote</b> <span class="svelte-1uha8ag">Telkom Indonesia · Jul – Dec 2023</span></li> <li class="svelte-1uha8ag"><b class="svelte-1uha8ag">Applied Software Engineering</b> <span class="svelte-1uha8ag">Telkom University · 2021 – 2024 · GPA 3.90, cum laude</span></li></ul> <p class="earlier svelte-1uha8ag"><b class="svelte-1uha8ag">Also built</b> <span>an ERP for Eltran, an accessibility platform for Netralens, MR training for Pertamina Hulu Rokan, a
      shelf meter for Mayora, a robot controller for RNV.</span></p></div></section> <section class="row contact svelte-1uha8ag" id="contact" aria-label="Contact"><h2 class="label svelte-1uha8ag">Elsewhere</h2> <div class="links svelte-1uha8ag"><a class="handle svelte-1uha8ag" href="mailto:ramasanjaya3302@gmail.com">email</a> <a class="handle svelte-1uha8ag" href="/cv-rama-sanjaya.pdf" download="">cv (pdf)</a> <a class="handle svelte-1uha8ag" href="https://github.com/Ramasanjaya22" target="_blank" rel="noreferrer">github</a> <a class="handle svelte-1uha8ag" href="https://www.linkedin.com/in/rama-sanjaya22/" target="_blank" rel="noreferrer">linkedin</a></div></section> <footer class="end svelte-1uha8ag"><p class="svelte-1uha8ag">peace out</p> <p class="svelte-1uha8ag">Bandung · 2026</p></footer>`,1);function Ma(B){var j=va();Bt("1uha8ag",_=>{var c=da();ft(24),Pt(()=>{Dt.title="Rama Sanjaya — product engineer, Bandung"}),ge(_,c)});var v=ut(j),x=Le(v),E=Le(x);ia(E,{}),ft(2),Ae(x),Ae(v);var C=de(v,4);ha(C,{}),ft(6),ge(B,j)}export{Ma as component};
