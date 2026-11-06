import * as THREE from "three";

/** A rounded, machined rectangular section, swept along a slightly cambered ellipse. */
export function ribbon(
  detail: number,
  radius: number,
  minor: number,
  width: number,
  height: number,
) {
  const pos: number[] = [],
    uv: number[] = [],
    indices: number[] = [];
  const profile: Array<[number, number]> = [];
  const bevel = 0.036;
  for (let side = 0; side < 4; side++) {
    const a = (side * Math.PI) / 2;
    const cx = (side === 0 || side === 3 ? 1 : -1) * (width / 2 - bevel);
    const cz = (side < 2 ? 1 : -1) * (height / 2 - bevel);
    for (let j = 0; j <= 4; j++)
      profile.push([
        cx + bevel * Math.cos(a + (j * Math.PI) / 8),
        cz + bevel * Math.sin(a + (j * Math.PI) / 8),
      ]);
  }
  // Subdivide the broad faces to keep edge normals and engraved seams stable.
  const cross: Array<[number, number]> = [];
  profile.forEach((p, i) => {
    cross.push(p);
    const q = profile[(i + 1) % profile.length];
    if (i % 5 === 4) {
      for (const k of [0.035, 0.13, 0.3, 0.5, 0.7, 0.87, 0.965])
        cross.push([p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k]);
    }
  });
  const n = cross.length;
  for (let i = 0; i <= detail; i++) {
    const a = (i / detail) * Math.PI * 2;
    const c = Math.cos(a),
      s = Math.sin(a);
    const scale = 1 + 0.12 * Math.sin(a + 0.5);
    const slope = 0.16 * Math.sin(a - 0.7);
    const twist = Math.cos(slope),
      st = Math.sin(slope);
    for (let j = 0; j < n; j++) {
      const [off, z] = cross[j];
      const radial = off * scale * twist - z * st;
      pos.push(
        (radius + radial) * c,
        (minor + radial) * s,
        z * twist + off * scale * st + 0.1 * Math.sin(a * 2 + 0.35),
      );
      uv.push(i / detail, (z + height / 2) / height);
      if (i < detail) {
        const p = i * n + j,
          q = i * n + ((j + 1) % n);
        indices.push(p, p + n, q, q, p + n, q + n);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

const vertexShader = `
 varying vec3 N; varying vec3 P; varying vec2 UV; varying vec3 objectP;
 void main(){UV=uv; objectP=position; vec4 p=modelViewMatrix*vec4(position,1.);P=p.xyz;N=normalize(normalMatrix*normal);gl_Position=projectionMatrix*p;}
`;
const fragmentShader = `
 precision highp float;
 varying vec3 N; varying vec3 P; varying vec2 UV; varying vec3 objectP;
 uniform float alloy;
 float strip(float x,float w){return exp(-x*x/(w*w));}
 void main(){
  vec3 n=normalize(N);vec3 eye=normalize(-P); if(dot(n,eye)<0.)n=-n;
  vec3 r=reflect(-eye,n);
  float fres=pow(1.-max(0.,dot(n,eye)),2.2);
  float sidelight=smoothstep(-.4,.9,n.y*.68-n.x*.30+n.z*.22);
  float key=strip(r.y-.48+.14*r.x,.23)*(.25+.75*smoothstep(-.98,-.05,r.x));
  float fineKey=strip(r.y-.56+.16*r.x,.034)*(.52+.48*r.x);
  float silver=strip(r.x+.56-r.y*.38,.23)*(.45+.55*smoothstep(-.6,.55,r.y));
  float cobalt=strip(r.x+.04+.23*r.z,.54)*(.24+.76*smoothstep(-.75,.45,-r.y));
  float edgeLight=strip(r.y+.61+.24*r.x,.16);
  vec3 color=mix(vec3(.015,.033,.064),vec3(.027,.062,.125),alloy)+vec3(.08,.115,.16)*sidelight;
  color+=mix(vec3(.32,.46,.64),vec3(.14,.29,.49),alloy)*key;
  color+=vec3(.46,.58,.73)*silver+vec3(.32,.52,.77)*fineKey;
  color+=vec3(.012,.09,.29)*cobalt*(.65+.35*alloy);
  color+=vec3(.025,.15,.42)*edgeLight+vec3(.04,.10,.24)*fres;
  float side=smoothstep(.035,.10,UV.y)*(1.-smoothstep(.90,.965,UV.y));
  float grooves=.5+.5*cos(UV.y*126.);color*=1.-.12*grooves*side;
  float inset=strip(UV.y-.25,.021)+strip(UV.y-.72,.016);color*=1.-.65*inset*side;
  float lip=strip(UV.y-.215,.011)+strip(UV.y-.746,.010);
  color+=vec3(.11,.27,.48)*lip*side;
  float tick=(1.-smoothstep(.012,.035,abs(fract(UV.x*96.)-.5)))*smoothstep(.06,.12,UV.y)*(1.-smoothstep(.16,.22,UV.y));color+=vec3(.08,.13,.19)*tick;
  gl_FragColor=vec4(color,1.);
 }`;
export function sculpture() {
  const group = new THREE.Group();
  const settings = [
    { r: 2.18, m: 1.59, w: 0.34, h: 0.22, x: 1.04, z: 0.48, dx: 0, dy: -0.05 },
    {
      r: 1.78,
      m: 1.36,
      w: 0.29,
      h: 0.19,
      x: 1.02,
      z: -0.91,
      dx: 0.03,
      dy: 0.13,
    },
  ];
  settings.forEach((s, i) => {
    const g = new THREE.Group();
    g.rotation.z = s.z;
    g.position.set(s.dx, s.dy, i ? -0.1 : 0);
    const mesh = new THREE.Mesh(
      ribbon(184, s.r, s.m, s.w, s.h),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        uniforms: { alloy: { value: i * 0.7 } },
      }),
    );
    mesh.rotation.x = s.x;
    g.add(mesh);
    group.add(g);
  });
  // An open fine arc sits outside the main sweep.
  const points = Array.from({ length: 115 }, (_, i) => {
    const a = -0.38 + (i / 114) * 4.08;
    return new THREE.Vector3(2.53 * Math.cos(a), 1.94 * Math.sin(a), 0.016);
  });
  const arc = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({
      color: 0x568bd3,
      transparent: true,
      opacity: 0.6,
    }),
  );
  arc.rotation.order = "ZXY";
  arc.rotation.set(0.96, 0, 0.48, "ZXY");
  group.add(arc);
  const dots = new Float32Array(180 * 3);
  for (let i = 0; i < 180; i++) {
    const a = i * 2.39996;
    const r = 2.7 + ((i * 37) % 127) / 95;
    dots[i * 3] = Math.cos(a) * r;
    dots[i * 3 + 1] = Math.sin(a) * r * 0.64;
    dots[i * 3 + 2] = Math.sin(i * 8.25) * 0.8 - 1.6;
  }
  const stars = new THREE.BufferGeometry();
  stars.setAttribute("position", new THREE.BufferAttribute(dots, 3));
  group.add(
    new THREE.Points(
      stars,
      new THREE.PointsMaterial({
        color: 0x89b5ec,
        size: 0.0075,
        transparent: true,
        opacity: 0.48,
      }),
    ),
  );
  return group;
}
