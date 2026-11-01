let $e=2*Math.PI,ct=[{kind:0,x:.31,y:.34,heading:.35,size:.23,lift:1,seed:.13},{kind:1,x:.69,y:.32,heading:2.7,size:.22,lift:1.1,seed:.91},{kind:2,x:.47,y:.68,heading:-.5,size:.22,lift:.95,seed:.34},{kind:3,x:.21,y:.61,heading:-.9,size:.21,lift:1.05,seed:.72}],be=(T,oe,L)=>Math.min(L,Math.max(oe,T)),ft=(T,oe,L)=>{let F=be((L-T)/(oe-T),0,1);return F*F*(3-2*F)},at=T=>Math.atan2(Math.sin(T),Math.cos(T)),Je=T=>-.03+1.55*T/63,_e=T=>Math.round((T- -.03)/1.55*63),Ne=[{x:.77,y:.3,length:42,width:31,height:18,angle:.35,seed:.21,kind:0},{x:.85,y:.5,length:20,width:15,height:9,angle:-.7,seed:.64,kind:2},{x:.36,y:.66,length:30,width:22,height:13,angle:-.25,seed:.47,kind:1}],ot=[{x:.05,y:.84,angle:-.55,spread:1.3,count:9,root:20,length:[60,150],width:[4,8]},{x:.9,y:.92,angle:-2.35,spread:1.3,count:7,root:20,length:[60,150],width:[4,8]},{x:.33,y:.03,angle:1.25,spread:1.3,count:6,root:20,length:[60,150],width:[4,8]}],ut=1+Math.floor(2147483645*Math.random()),fe=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
`,De=`#version 300 es
out vec2 v_uv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  v_uv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,Pe=`
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
`,ht=`${fe}
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
}`,dt=`${fe}${Pe}
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
}`,vt=`#version 300 es
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
}`,pt=`${fe}
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
}`,mt=`${fe}
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
}`,xt=`${fe}${Pe}
in vec2 v_uv;
uniform vec2 u_size;
uniform float u_unit;
/** pond px per texel, for anti-aliasing */
uniform float u_pixel;
/** centre x, y in pond px, long axis angle, seed */
uniform vec4 u_stones[${Ne.length}];
/** half length, half width, height in pond px, kind */
uniform vec4 u_stoneSize[${Ne.length}];
/** 0 writes albedo plus how much sunlight reaches the bed (x1.5), 1 writes the bed height */
uniform int u_pass;
uniform float u_heightScale;
out vec4 o;

const int STONE_COUNT = ${Ne.length};
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
}`,it=`#version 300 es
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
}`,lt=`
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
`,gt=`${fe}${Pe}${lt}
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
}`,_t=`${fe}${lt}
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
}`,bt=`#version 300 es
precision highp float;
in vec2 a_pos;
in vec3 a_leaf;
uniform vec2 u_size;
out vec3 v_leaf;
void main() {
  v_leaf = a_leaf;
  gl_Position = vec4(a_pos.x / u_size.x * 2.0 - 1.0, 1.0 - a_pos.y / u_size.y * 2.0, 0.0, 1.0);
}`,yt=`${fe}${Pe}
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
}`,wt=`${fe}${Pe}
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
}`,kt=`${fe}${Pe}
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
}`,st=[.9,.92,.66],nt=["a_pos","a_local","a_tan","a_fish","a_motion"];function rt(T,oe){let L,F,X,Y,B,p,ie,z,H,ue,e=T.getContext("webgl2",{alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:"high-performance"});if(!e||!e.getExtension("EXT_color_buffer_float"))return null;let Fe=[];function K(n,o,i=[]){let r=e.createProgram();for(let[v,M]of[[e.VERTEX_SHADER,n],[e.FRAGMENT_SHADER,o]]){let _=e.createShader(v);if(e.shaderSource(_,M),e.compileShader(_),!e.getShaderParameter(_,e.COMPILE_STATUS)&&!e.isContextLost())throw Error(e.getShaderInfoLog(_)??"Pond shader failed to compile");e.attachShader(r,_),e.deleteShader(_)}if(i.forEach((v,M)=>e.bindAttribLocation(r,M,v)),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS)&&!e.isContextLost())throw Error(e.getProgramInfoLog(r)??"Pond program failed to link");Fe.push(r);let u=new Map;return{program:r,u:v=>(u.has(v)||u.set(v,e.getUniformLocation(r,v)),u.get(v))}}try{L=K(De,ht),F=K(De,dt),X=K(vt,pt,["a_pos"]),Y=K(De,mt),B=K(De,xt),p=K(it,gt,nt),ie=K(it,_t,nt),z=K(De,wt),H=K(De,kt),ue=K(bt,yt,["a_pos","a_leaf"])}catch(n){return console.error(n),Fe.forEach(o=>e.deleteProgram(o)),null}let Se=e.createVertexArray(),he=new Float32Array(64*oe*108),ee=e.createVertexArray(),ye=e.createBuffer(),Ue=e.createBuffer();e.bindVertexArray(ee),e.bindBuffer(e.ARRAY_BUFFER,ye),e.bufferData(e.ARRAY_BUFFER,he.byteLength,e.DYNAMIC_DRAW),[2,2,2,4,2].reduce((n,o,i)=>(e.enableVertexAttribArray(i),e.vertexAttribPointer(i,o,e.FLOAT,!1,48,4*n),n+o),0);let we=[];for(let n=0;n<oe;n++){let o=64*n*9;for(let i=0;i<63;i++)for(let r=0;r<8;r++){let u=o+9*i+r;we.push(u,u+9,u+1,u+1,u+9,u+9+1)}}e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,Ue),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(we),e.STATIC_DRAW),e.bindVertexArray(null);let de=new Float32Array(128),xe=0,ke=new Float32Array(128),ve=0,Oe=new Float32Array(64),$=0,g=null;const pe=[.028,.062,.09],ze=[.03,.066,.056],se={species:0,green:0,leaves:0,lily:0},j={species:0,green:0,leaves:0,lily:0},Me=[0,0,0],Ee=[0,0,0];let Te=0;function D(n,o,i){let r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),i?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,n,o,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,n,o,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let u=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,u),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),{tex:r,fb:u,w:n,h:o}}function Ie(n){e.deleteTexture(n.tex),e.deleteFramebuffer(n.fb)}function J(n){e.bindFramebuffer(e.FRAMEBUFFER,n?n.fb:null),e.viewport(0,0,n?n.w:e.drawingBufferWidth,n?n.h:e.drawingBufferHeight)}function N(n,o,i,r){e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,i),e.uniform1i(n.u(o),r)}function ne(){e.bindVertexArray(Se),e.drawArrays(e.TRIANGLES,0,3)}function Be(n,o,i){e.useProgram(Y.program),J(o),N(Y,"u_tex",n.tex,0),e.uniform2f(Y.u("u_dir"),i/n.w,0),ne(),J(n),N(Y,"u_tex",o.tex,0),e.uniform2f(Y.u("u_dir"),0,i/n.h),ne()}function He(){if(!g)return;let{rippleA:n,rippleB:o,surface:i,caustic:r,causticBlur:u,floor:v,relief:M,plants:_,fish:q,shadow:C,shadowBlur:P,scene:V}=g;[n,o,i,r,u,v,M,_,q,C,P,V].forEach(Ie),e.deleteVertexArray(g.gridVao),e.deleteVertexArray(g.seaweedVao),g.seaweedBuffers.forEach(te=>e.deleteBuffer(te)),g.gridBuffers.forEach(te=>e.deleteBuffer(te)),g=null}function Ve(n){let o;if(!g)return;let{width:i,height:r}=g;e.disable(e.BLEND);let u=i/540;e.useProgram(B.program),e.uniform2f(B.u("u_size"),i,r),e.uniform1f(B.u("u_unit"),u),e.uniform1f(B.u("u_heightScale"),40*u);let v=(o=i/540,{placement:new Float32Array(Ne.flatMap(M=>[M.x*i,M.y*r,M.angle,M.seed])),size:new Float32Array(Ne.flatMap(M=>[M.length*o,M.width*o,M.height*o,M.kind]))});for(let[M,_]of(e.uniform4fv(B.u("u_stones[0]"),v.placement),e.uniform4fv(B.u("u_stoneSize[0]"),v.size),n))J(M),e.uniform1i(B.u("u_pass"),_),e.uniform1f(B.u("u_pixel"),i/M.w),ne()}return{fishVertices:he,resize:function(n,o,i){let r,u,v,M,_=Math.max(1,Math.round(n)),q=Math.max(1,Math.round(o)),C=Math.max(1,Math.round(n*i)),P=Math.max(1,Math.round(o*i));if(g&&g.width===_&&g.height===q){if(T.width===C&&T.height===P)return;[g.floor,g.plants,g.fish,g.scene].forEach(Ie),T.width=C,T.height=P,g.floor=D(C,P,!1),g.plants=D(C,P,!1),g.fish=D(C,P,!0),g.scene=D(C,P,!1),Ve([[g.floor,0]]);return}He(),T.width=C,T.height=P;let V=Math.ceil((_+96)/2)+1,te=Math.ceil((q+96)/2)+1,a=new Float32Array(V*te*2);for(let l=0;l<te;l++)for(let f=0;f<V;f++)a[(l*V+f)*2]=-48+2*f,a[(l*V+f)*2+1]=-48+2*l;let s=new Uint32Array((V-1)*(te-1)*6),t=0;for(let l=0;l<te-1;l++)for(let f=0;f<V-1;f++){let y=l*V+f;s[t++]=y,s[t++]=y+V,s[t++]=y+1,s[t++]=y+1,s[t++]=y+V,s[t++]=y+V+1}let c=e.createVertexArray(),d=e.createBuffer(),m=e.createBuffer();e.bindVertexArray(c),e.bindBuffer(e.ARRAY_BUFFER,d),e.bufferData(e.ARRAY_BUFFER,a,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,m),e.bufferData(e.ELEMENT_ARRAY_BUFFER,s,e.STATIC_DRAW),e.bindVertexArray(null),Ve([[(g={width:_,height:q,unit:_/540,rippleA:D(_,q,!0),rippleB:D(_,q,!0),surface:D(_,q,!0),caustic:D(_,q,!0),causticBlur:D(_,q,!0),floor:D(C,P,!1),relief:D(_,q,!1),plants:D(C,P,!1),fish:D(C,P,!0),shadow:D(Math.ceil(_/2),Math.ceil(q/2),!1),shadowBlur:D(Math.ceil(_/2),Math.ceil(q/2),!1),scene:D(C,P,!1),gridVao:c,gridBuffers:[d,m],gridIndexCount:s.length,...(r=(function(l,f){let y=l/540,x=ut,w=()=>(x=16807*x%2147483647)/2147483647,h=[...ot];for(let E=0;h.length<ot.length+7&&E<400;E++){let U=w(),R=w(),W=Math.min(U*l,(1-U)*l,R*f,(1-R)*f);!(W<50*y)&&!(W>110*y)&&(h.some(A=>Math.hypot((A.x-U)*l,(A.y-R)*f)<60*y)||Ne.some(A=>Math.hypot((A.x-U)*l,(A.y-R)*f)<(A.length+25)*y)||h.push({x:U,y:R,angle:.55+(w()-.5)*.6,spread:1.3,count:4+Math.floor(3*w()),root:6,length:[16,38],width:[4,6.5]}))}let b=h.flatMap(E=>Array.from({length:E.count},()=>({x:E.x*l+(w()-.5)*E.root*y,y:E.y*f+(w()-.5)*E.root*y,angle:E.angle+(w()-.5)*E.spread,length:(E.length[0]+w()*(E.length[1]-E.length[0]))*y,width:(E.width[0]+w()*(E.width[1]-E.width[0]))*y,curl:(w()-.5)*1.2,seed:w()}))),G=new Float32Array(14*b.length*10),S=new Uint16Array(13*b.length*6),O=0;function I(E){let U=0;for(let R of b){let W=R.length/13,A=R.x,re=R.y;for(let me=0;me<14;me++){let ae=me/13,Ge=.28*Math.sin(.8*E+17*R.seed-2.4*ae)*ae+.05*Math.sin(1.9*E+5*R.seed-4.5*ae)*ae,Ae=R.angle+R.curl*ae+Ge;me>0&&(A+=Math.cos(Ae)*W,re+=Math.sin(Ae)*W);let Ye=.5*R.width*Math.pow(Math.sin(Math.PI*Math.min(1,.15+.85*ae)),.6),k=-Math.sin(Ae)*Ye,Q=Math.cos(Ae)*Ye;for(let le of[-1,1])G[U++]=A+k*le,G[U++]=re+Q*le,G[U++]=ae,G[U++]=le,G[U++]=R.seed}}}return b.forEach((E,U)=>{let R=14*U*2;for(let W=0;W<13;W++){let A=R+2*W;S.set([A,A+2,A+1,A+1,A+2,A+3],O),O+=6}}),I(0),{vertices:G,indices:S,write:I}})(_,q),u=e.createVertexArray(),v=e.createBuffer(),M=e.createBuffer(),e.bindVertexArray(u),e.bindBuffer(e.ARRAY_BUFFER,v),e.bufferData(e.ARRAY_BUFFER,r.vertices,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,20,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,3,e.FLOAT,!1,20,8),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,M),e.bufferData(e.ELEMENT_ARRAY_BUFFER,r.indices,e.STATIC_DRAW),e.bindVertexArray(null),{seaweed:r,seaweedVao:u,seaweedBuffers:[v,M]})}).floor,0],[g.relief,1]])},drop:function(n,o,i,r){!(xe>=32)&&(de.set([n,o,i,r],4*xe),xe++)},splash:function(n,o,i,r){return!(ve>=32)&&(ke.set([n,o,i,r],4*ve),ve++,!0)},splashRoom:function(){return 32-ve},push:function(n,o,i,r){return!($>=16)&&(Oe.set([n,o,i,r],4*$),$++,!0)},pushRoom:function(){return 16-$},stepRipples:function(n){g&&(e.disable(e.BLEND),J(g.rippleB),e.useProgram(L.program),N(L,"u_state",g.rippleA.tex,0),e.uniform2f(L.u("u_size"),g.width,g.height),e.uniform1f(L.u("u_dt"),n),e.uniform1f(L.u("u_stiffness"),22500),e.uniform2f(L.u("u_damping"),.06**n,.2**n),e.uniform1f(L.u("u_smoothing"),3*n),e.uniform1i(L.u("u_dropCount"),xe),e.uniform4fv(L.u("u_drops[0]"),de),e.uniform1i(L.u("u_splashCount"),ve),e.uniform4fv(L.u("u_splashes[0]"),ke),e.uniform1i(L.u("u_pushCount"),$),e.uniform4fv(L.u("u_pushes[0]"),Oe),ne(),xe=0,ve=0,$=0,[g.rippleA,g.rippleB]=[g.rippleB,g.rippleA])},setLook:function(n,o){se[n]=o},setPointer:function(n,o,i){Me[0]=n,Me[1]=o,Me[2]=i?1:0},render:function(n){if(!g||e.isContextLost())return;let o=g,i=o.unit,r=Te?Math.min(.1,n-Te):.016;Te=n;for(let v in j)v=="species"?j[v]=se[v]:j[v]+=(se[v]-j[v])*Math.min(1,5*r);for(let v=0;v<3;v++)Ee[v]+=(Me[v]-Ee[v])*Math.min(1,9*r);let u=[pe[0]+(ze[0]-pe[0])*j.green,pe[1]+(ze[1]-pe[1])*j.green,pe[2]+(ze[2]-pe[2])*j.green];e.disable(e.BLEND),J(o.surface),e.useProgram(F.program),N(F,"u_state",o.rippleA.tex,0),e.uniform2f(F.u("u_size"),o.width,o.height),e.uniform1f(F.u("u_time"),n),e.uniform1f(F.u("u_scale"),.0042/i),e.uniform2f(F.u("u_fine"),.05,.35),e.uniform2f(F.u("u_big"),.13,.55),ne(),J(o.caustic),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.useProgram(X.program),N(X,"u_surface",o.surface.tex,0),e.uniform2f(X.u("u_size"),o.width,o.height),e.uniform1f(X.u("u_depth"),560*i*i),e.bindVertexArray(o.gridVao),e.drawElements(e.TRIANGLES,o.gridIndexCount,e.UNSIGNED_INT,0),e.disable(e.BLEND),Be(o.caustic,o.causticBlur,1.3),e.useProgram(ie.program),J(o.shadow),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.bindVertexArray(ee),e.bindBuffer(e.ARRAY_BUFFER,ye),e.bufferSubData(e.ARRAY_BUFFER,0,he),e.uniform2f(ie.u("u_size"),o.width,o.height),e.uniform1f(ie.u("u_time"),n),e.uniform2f(ie.u("u_offset"),22*i,17*i),e.uniform1f(ie.u("u_species"),j.species),e.drawElements(e.TRIANGLES,3024*oe,e.UNSIGNED_SHORT,0),e.disable(e.BLEND),Be(o.shadow,o.shadowBlur,1.2),Be(o.shadow,o.shadowBlur,1.2),J(o.fish),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(p.program),N(p,"u_caustic",o.caustic.tex,0),e.uniform2f(p.u("u_size"),o.width,o.height),e.uniform2f(p.u("u_offset"),0,0),e.uniform1f(p.u("u_time"),n),e.uniform3fv(p.u("u_ambient"),u),e.uniform3fv(p.u("u_sun"),st),e.uniform1f(p.u("u_species"),j.species),e.uniform1f(p.u("u_fishLight"),.62),e.uniform1f(p.u("u_pixel"),o.width/o.fish.w),e.bindVertexArray(ee),e.drawElements(e.TRIANGLES,3024*oe,e.UNSIGNED_SHORT,0),e.disable(e.BLEND),o.seaweed.write(n),J(o.plants),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(ue.program),e.uniform2f(ue.u("u_size"),o.width,o.height),e.bindVertexArray(o.seaweedVao),e.bindBuffer(e.ARRAY_BUFFER,o.seaweedBuffers[0]),e.bufferSubData(e.ARRAY_BUFFER,0,o.seaweed.vertices),e.drawElements(e.TRIANGLES,o.seaweed.indices.length,e.UNSIGNED_SHORT,0),e.disable(e.BLEND),J(o.scene),e.useProgram(z.program),N(z,"u_floor",o.floor.tex,0),N(z,"u_surface",o.surface.tex,1),N(z,"u_caustic",o.caustic.tex,2),N(z,"u_shadow",o.shadow.tex,3),N(z,"u_fish",o.fish.tex,4),N(z,"u_plants",o.plants.tex,5),N(z,"u_relief",o.relief.tex,6),e.uniform1f(z.u("u_heightScale"),40*i),e.uniform2f(z.u("u_size"),o.width,o.height),e.uniform1f(z.u("u_time"),n),e.uniform3fv(z.u("u_ambient"),u),e.uniform3fv(z.u("u_sun"),st),e.uniform1f(z.u("u_green"),j.green),e.uniform1f(z.u("u_lily"),j.lily),e.uniform1f(z.u("u_leaves"),j.leaves),e.uniform3fv(z.u("u_pointer"),Ee),e.uniform1f(z.u("u_viewRefraction"),120*i*i),e.uniform1f(z.u("u_dispersion"),60*i*i),e.uniform1f(z.u("u_ringContrast"),150),e.uniform1f(z.u("u_exposure"),1.3),ne(),J(null),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(H.program),N(H,"u_scene",o.scene.tex,0),e.uniform2f(H.u("u_size"),o.width,o.height),e.uniform1f(H.u("u_unit"),i),e.uniform1f(H.u("u_feather"),30*i),e.uniform1f(H.u("u_blur"),0*i),e.uniform1f(H.u("u_grain"),.07),e.uniform1f(H.u("u_grainSize"),1.2*(e.drawingBufferWidth/o.width)),e.uniform1f(H.u("u_grainFrame"),Math.floor(24*n)%1024),ne()},dispose:function(){He(),Fe.forEach(n=>e.deleteProgram(n)),e.deleteVertexArray(Se),e.deleteVertexArray(ee),e.deleteBuffer(ye),e.deleteBuffer(Ue)}}}function zt(T,oe){let L=T,F=oe;if(!L||!F)return{setSpecies(){},setWater(){},setDecor(){},ripple(){},destroy(){}};let X=L.clientWidth,Y=L.clientHeight,B=(function(i,r){let u=i,v=r,M=[],_=ct.map(a=>{let s=a.size*i,t={kind:a.kind,seed:a.seed,size:a.size,length:s,lift:a.lift,x:a.x*i,y:a.y*r,prevHeadX:a.x*i,prevHeadY:a.y*r,heading:a.heading,turn:0,speed:0,cruise:s*(.2+.1*a.seed),goalX:a.x*i,goalY:a.y*r,goalUntil:0,fear:0,fleeAngle:0,beat:a.seed*$e,flickSide:1,flicked:!1,finPhase:20*a.seed,fold:0,swim:.4,spine:new Float32Array(44),trail:new Float32Array(320),trailCount:160,rows:new Float32Array(256)};t.speed=t.cruise;for(let c=0;c<160;c++)t.trail[2*c]=t.x-Math.cos(t.heading)*s*.02*c,t.trail[2*c+1]=t.y-Math.sin(t.heading)*s*.02*c;return C(t),P(t),t}),q=[..._].sort((a,s)=>a.lift-s.lift);function C(a){let{spine:s,trail:t}=a,c=1.52*a.length/21;s[0]=a.x,s[1]=a.y;let d=a.x,m=a.y,l=c,f=1;for(let h=0;f<22&&h<a.trailCount;){let b=Math.hypot(t[2*h]-d,t[2*h+1]-m);b>=l?(d+=(t[2*h]-d)*l/b,m+=(t[2*h+1]-m)*l/b,s[2*f]=d,s[2*f+1]=m,f++,l=c):(l-=b,d=t[2*h],m=t[2*h+1],h++)}let y=f>=2?s[(f-1)*2]-s[(f-2)*2]:-Math.cos(a.heading),x=f>=2?s[(f-1)*2+1]-s[(f-2)*2+1]:-Math.sin(a.heading),w=Math.hypot(y,x)||1;for(y/=w,x/=w;f<22;f++)s[2*f]=s[(f-1)*2]+y*c,s[2*f+1]=s[(f-1)*2+1]+x*c}function P(a){let{spine:s,rows:t,length:c}=a,d=Math.cos(a.heading),m=Math.sin(a.heading);for(let l=0;l<64;l++){let f,y,x,w,h=Je(l);if(h<=0)f=a.x-d*h*c,y=a.y-m*h*c,x=d,w=m;else{let G=21*Math.min(h/1.52,1),S=Math.min(Math.floor(G),20),O=G-S;f=s[2*S]+(s[(S+1)*2]-s[2*S])*O,y=s[2*S+1]+(s[(S+1)*2+1]-s[2*S+1])*O;let I=Math.hypot(x=s[2*S]-s[(S+1)*2],w=s[2*S+1]-s[(S+1)*2+1])||1;x/=I,w/=I}let b=c*(.008+.07*Math.pow(ft(.15,1.52,h),1.5))*a.swim*Math.sin(a.beat-5.2*h);t[4*l]=f-w*b,t[4*l+1]=y+x*b}for(let l=0;l<64;l++){let f=Math.max(l-1,0),y=Math.min(l+1,63),x=t[4*f]-t[4*y],w=t[4*f+1]-t[4*y+1],h=Math.hypot(x,w)||1;t[4*l+2]=x/h,t[4*l+3]=w/h}}function V(a,s,t,c){let d=4*_e(.45),m=a.rows[d]-s,l=a.rows[d+1]-t;if(4>Math.hypot(m,l)){let f=.5>Math.random()?1:-1;m=-Math.sin(a.heading)*f,l=Math.cos(a.heading)*f}a.fleeAngle=Math.atan2(l,m)+(Math.random()-.5)*.8,a.fear=Math.max(a.fear,c)}function te(a,s,t,c,d){for(let m of _){if(m===d)continue;let l=Math.hypot(m.x-a,m.y-s);l<t&&V(m,a,s,c*(1-l/t))}}return{count:_.length,update:function(a,s){for(let t of _){let c=t.length,d=4*_e(.12);t.prevHeadX=t.rows[d],t.prevHeadY=t.rows[d+1],(s>t.goalUntil||Math.hypot(t.goalX-t.x,t.goalY-t.y)<.8*c)&&(function(k,Q){let le=-1/0;for(let Xe=0;Xe<6;Xe++){let Re=u*(.12+.76*Math.random()),Z=v*(.12+.76*Math.random()),qe=Math.hypot(Re-k.x,Z-k.y);if(qe<1.2*k.length)continue;let Le=1/0;for(let ce of _)ce!==k&&(Le=Math.min(Le,Math.hypot(Re-ce.x,Z-ce.y),Math.hypot(Re-ce.goalX,Z-ce.goalY)));let ge=Math.min(Le,2.5*k.length)-.15*qe;ge>le&&(le=ge,k.goalX=Re,k.goalY=Z)}k.goalUntil=Q+8+10*Math.random()})(t,s);let m=Math.cos(t.heading),l=Math.sin(t.heading),f=Math.hypot(t.goalX-t.x,t.goalY-t.y)||1,y=(t.goalX-t.x)/f,x=(t.goalY-t.y)/f,w=.18*Math.sin(.4*s+17*t.seed)+.05*Math.sin(1.1*s+5*t.seed),h=y-x*w,b=x+y*w,G=t.x+m*c*.8,S=t.y+l*c*.8,O=-.15*c,I=k=>Math.max(k,0)/c,E=I(O-G)-I(G-(u-O)),U=I(O-S)-I(S-(v-O));h+=E*(4+8*Math.abs(E)),b+=U*(4+8*Math.abs(U));let R=0;for(let k of _){if(k===t)continue;let Q=(c+k.length)*.55;for(let le of[0,.6,1.3]){let Xe=t.x+m*c*le,Re=t.y+l*c*le,Z=1/0,qe=0,Le=0;for(let ce=_e(0);ce<_e(1.1);ce+=3){let Ce=4*ce,Ke=4*Math.min(ce+3,63),je=k.rows[Ke]-k.rows[Ce],We=k.rows[Ke+1]-k.rows[Ce+1],Qe=be(((Xe-k.rows[Ce])*je+(Re-k.rows[Ce+1])*We)/(je*je+We*We||1),0,1),Ze=Xe-(k.rows[Ce]+je*Qe),et=Re-(k.rows[Ce+1]+We*Qe),tt=Math.hypot(Ze,et);tt<Z&&(Z=tt,qe=Ze,Le=et)}if(Z>=Q)continue;let ge=1-Z/Q;Z<1&&(qe=-l,Le=m,Z=1),h+=qe/Z*ge*ge*9,b+=Le/Z*ge*ge*9,R=Math.max(R,ge*(le>1?.6:1))}}R>.6&&(t.goalUntil=Math.min(t.goalUntil,s+1.2)),t.fear>.02&&(h+=Math.cos(t.fleeAngle)*t.fear*6,b+=Math.sin(t.fleeAngle)*t.fear*6);let W=at(Math.atan2(b,h)-t.heading),A=Math.min(.6+2.4*R+8*t.fear,6,.3+t.speed/(.5*c)),re=1.2+2*R+8*t.fear,me=be(W*re,-A,A);t.turn+=(me-t.turn)*(1-Math.exp(-a*re*4.5)),t.heading=at(t.heading+t.turn*a);let ae=.7+.45*(.5+.5*Math.sin(.37*s+23*t.seed)),Ge=t.cruise*ae*(1-.35*Math.min(Math.abs(W),1))*(1-.4*R)+t.fear*c*3.4;t.speed+=(Ge-t.speed)*(1-Math.exp(-a*(t.fear>.15?7:1.1))),t.x+=Math.cos(t.heading)*t.speed*a,t.y+=Math.sin(t.heading)*t.speed*a,t.fear*=Math.exp(-(1.5*a));let Ae=t.speed/c,Ye=t.beat;t.beat+=a*$e*(.7+2.2*Ae),Math.floor(t.beat/Math.PI)!==Math.floor(Ye/Math.PI)&&(t.flicked=!0),t.finPhase+=a*$e*(.8+.4*t.seed),t.fold+=((t.fear>.25)-t.fold)*(1-Math.exp(-(6*a))),t.swim=.3+.7*be(Ae/1.2,0,1),(function(k){let Q=k.trail;Math.hypot(k.x-Q[0],k.y-Q[1])<.02*k.length||(Q.copyWithin(2,0,Q.length-2),Q[0]=k.x,Q[1]=k.y,k.trailCount=Math.min(k.trailCount+1,160))})(t),C(t),P(t)}},writeVertices:function(a){let s=0;for(let t of q){let{rows:c,length:d}=t;for(let m=0;m<64;m++){let l=Je(m),f=c[4*m],y=c[4*m+1],x=c[4*m+2],w=c[4*m+3];for(let h=0;h<9;h++){let b=-.55+1.1*h/8;a[s++]=f-w*b*d,a[s++]=y+x*b*d,a[s++]=l,a[s++]=b,a[s++]=x,a[s++]=w,a[s++]=t.kind+t.seed,a[s++]=d,a[s++]=t.beat,a[s++]=t.lift,a[s++]=t.fold,a[s++]=t.finPhase}}}},emitRipples:function(a,s,t,c){let d=180*t;for(let[m,l,f,y]of(_.forEach((x,w)=>{let{rows:h,length:b}=x,G=x.speed/b,S=4*_e(.12),O=x.prevHeadX+(h[S]-x.prevHeadX)*s,I=x.prevHeadY+(h[S+1]-x.prevHeadY)*s,E=h[S+2],U=h[S+3],R=2800*Math.tanh(x.speed/380);if(R>20&&c.pushRoom()>=2&&(c.push(O+E*b*.08,I+U*b*.08,.11*b,R),c.push(O-E*b*.12,I-U*b*.12,.11*b,-R)),x.flicked){x.flicked=!1,x.flickSide=-x.flickSide;let A=4*_e(1.3),re=x.flickSide*b*.05;c.drop(h[A]-h[A+3]*re,h[A+1]+h[A+2]*re,3.2,.06+.24*be(G/2,0,1))}let W=1-be(G/.5,0,1);if(W>.05){let A=4*_e(.26),re=.05*Math.sin(a*$e*14+1.7*w)*W*(1-x.fold)*d;for(let me of[1,-1]){let ae=-h[A+3]*me*.09*b,Ge=h[A+2]*me*.09*b;c.drop(h[A]+ae,h[A+1]+Ge,3,re)}}}),M))c.splash(m,l,f,y);M.length=0},hitTest:function(a,s){for(let t=q.length-1;t>=0;t--){let c=q[t],{rows:d,length:m}=c;for(let l=0;l<63;l++){let f=Je(l);if(f<0)continue;let y=(f<=1?(function(x){if(x<0)return 0;let w=Math.sqrt(Math.max(0,1-(Math.max(.3-x,0)/.3)**2));return(.05+.085*(1-be((x-.3)/.7,0,1)**1.4))*w})(f)*m:.12*m)+10;if((function(x,w,h,b,G,S){let O=G-h,I=S-b,E=be(((x-h)*O+(w-b)*I)/(O*O+I*I||1),0,1);return Math.hypot(x-(h+O*E),w-(b+I*E))})(a,s,d[4*l],d[4*l+1],d[(l+1)*4],d[(l+1)*4+1])<y)return c}}return null},scare:function(a,s,t){let c=a.fear<.5;if(V(a,s,t,1),!c)return;a.speed=Math.max(a.speed,1.2*a.length);let d=4*_e(1.3);M.length<6&&M.push([a.rows[d],a.rows[d+1],7,1.6]),te(s,t,1.8*a.length,.6,a)},disturb:te,resize:function(a,s){let t=a/(u||a),c=s/(v||s);for(let d of(u=a,v=s,_)){d.x*=t,d.y*=c;for(let l=0;l<22;l++)d.spine[2*l]*=t,d.spine[2*l+1]*=c;for(let l=0;l<160;l++)d.trail[2*l]*=t,d.trail[2*l+1]*=c;let m=d.size*a/d.length;d.length*=m,d.cruise*=m,d.speed*=m,P(d)}}}})(X,Y),p=rt(F,B.count);if(!p){L.dataset.fallback="";return}let ie=window.matchMedia("(prefers-reduced-motion: reduce)"),z=0,H=0,ue=40,e=!1,Fe=0,K=2,Se=()=>Math.min(window.devicePixelRatio||1,K),he=150,ee=[],ye=0,Ue=0,we=0,de=0,xe=!1,ke=i=>{K=i,p==null||p.resize(X,Y,Se()),he=60},ve=()=>p!==null&&e&&!document.hidden&&(!ie.matches||performance.now()<Fe),Oe=i=>{if(z=0,!p||!ve()){H=0;return}let r=H?Math.min((i-H)/1e3,.05):1/60;H?(v=>{if(xe)return;if(he>0)return he--;if(ee.push(v),ee.length<90)return;let M=ee.sort((P,V)=>P-V)[ee.length>>1];ee.length=0;let _=Se(),q=M<=22;if(!ye){if(q||_<=1)return;ye=we=_,Ue=M,ke(1);return}q?de=_:we=_;let C=.25*Math.round((we+de)/2/.25);if(de&&C>de&&C<we)return ke(C);de?ke(de):M>.8*Ue&&ke(ye),xe=!0})(i-H):(he=Math.max(he,60),ee.length=0),H=i,ue+=r,B.update(r,ue);let u=Math.min(12,Math.max(1,Math.ceil(300*r-.01)));for(let v=1;v<=u;v++)B.emitRipples(ue-r+r*v/u,v/u,r/u,p),p.stepRipples(r/u);B.writeVertices(p.fishVertices),p.setPointer(j,Me,Ee),p.render(ue),z=requestAnimationFrame(Oe)},$=()=>{!z&&ve()&&(z=requestAnimationFrame(Oe))},g=()=>{X=L.clientWidth,Y=L.clientHeight,p&&X&&Y&&(B.resize(X,Y),p.resize(X,Y,Se()),!z&&p&&(B.writeVertices(p.fishVertices),p.render(ue)))},pe=()=>{Fe=performance.now()+4e3,$()},ze=i=>{let r=F.getBoundingClientRect();return[(i.clientX-r.left)/r.width*X,(i.clientY-r.top)/r.height*Y]},se=null,j=0,Me=0,Ee=0,Te=i=>{let[r,u]=ze(i);j=r,Me=u,Ee=1},D=()=>{Ee=0},Ie=i=>{if(!p||i.button>0)return;let[r,u]=ze(i),v=B.hitTest(r,u);v?(B.scare(v,r,u),p.splash(r,u,7,1.4)):(p.splash(r,u,9,2.6),p.drop(r,u,3,.5),B.disturb(r,u,.3*X,.45)),se=[r,u],pe()},J=i=>{if(!p||!se)return;let[r,u]=ze(i);8>Math.hypot(r-se[0],u-se[1])||(p.splash(r,u,6,.9),B.disturb(r,u,.2*X,.3),se=[r,u],pe())},N=()=>{se=null},ne=i=>{i.preventDefault(),cancelAnimationFrame(z),z=0,p=null},Be=()=>{p=rt(F,B.count),o(),g(),$()},He=new ResizeObserver(()=>requestAnimationFrame(g));He.observe(L);let Ve=new IntersectionObserver(([i])=>{e=i.isIntersecting,$()},{rootMargin:"200px"}),n={species:0,green:0,leaves:0,lily:0},o=()=>{if(p)for(let i in n)p.setLook(i,n[i])};return Ve.observe(L),g(),F.addEventListener("pointerdown",Ie),F.addEventListener("pointermove",Te),F.addEventListener("pointerleave",D),window.addEventListener("pointermove",J),window.addEventListener("pointerup",N),window.addEventListener("pointercancel",N),F.addEventListener("webglcontextlost",ne),F.addEventListener("webglcontextrestored",Be),document.addEventListener("visibilitychange",$),ie.addEventListener("change",$),{setSpecies(i){n.species={koi:0,betta:1,ranchu:2,jelly:3}[i]??0,o()},setWater(i){n.green=i==="green"?1:0,o()},setDecor(i){n.leaves=i.leaves?1:0,n.lily=i.lily?1:0,o()},ripple(){p&&p.splash(.5*X,.5*Y,9,1.1)},destroy(){cancelAnimationFrame(z),He.disconnect(),Ve.disconnect(),F.removeEventListener("pointerdown",Ie),F.removeEventListener("pointermove",Te),F.removeEventListener("pointerleave",D),window.removeEventListener("pointermove",J),window.removeEventListener("pointerup",N),window.removeEventListener("pointercancel",N),F.removeEventListener("webglcontextlost",ne),F.removeEventListener("webglcontextrestored",Be),document.removeEventListener("visibilitychange",$),ie.removeEventListener("change",$),p==null||p.dispose()}}}export{rt as T,zt as mountPond};
