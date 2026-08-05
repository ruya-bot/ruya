import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

const COPPER = "#B5652D";

function buildTargets(count: number) {
  const grid: number[] = [];
  const wave: number[] = [];
  const cluster: number[] = [];
  const side = Math.ceil(Math.sqrt(count));
  for (let i = 0; i < count; i++) {
    const gx = (i % side) / (side - 1) - 0.5;
    const gz = Math.floor(i / side) / (side - 1) - 0.5;
    grid.push(gx * 6, Math.sin(gx * 3) * 0.05, gz * 6);

    const t = i / count;
    wave.push((t - 0.5) * 7, Math.sin(t * Math.PI * 6) * 0.9, Math.cos(t * Math.PI * 4) * 0.2);

    const a = i * 2.399;
    const r = 0.9 * Math.sqrt(t);
    cluster.push(Math.cos(a) * r, (Math.random() - 0.5) * 1.4, Math.sin(a) * r);
  }
  return {
    grid: new Float32Array(grid),
    wave: new Float32Array(wave),
    cluster: new Float32Array(cluster),
  };
}

function lerpStage(
  out: THREE.Vector3,
  a: Float32Array,
  b: Float32Array,
  i: number,
  k: number,
) {
  const j = i * 3;
  const ax = a[j] ?? 0, ay = a[j + 1] ?? 0, az = a[j + 2] ?? 0;
  const bx = b[j] ?? 0, by = b[j + 1] ?? 0, bz = b[j + 2] ?? 0;
  out.set(
    ax + (bx - ax) * k,
    ay + (by - ay) * k,
    az + (bz - az) * k,
  );
}

function Particles({ count, still }: { count: number; still: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const targets = useMemo(() => buildTargets(count), [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const v = useMemo(() => new THREE.Vector3(), []);
  const start = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    if (start.current === null) start.current = clock.elapsedTime;
    const t = still ? 3 : clock.elapsedTime - start.current;
    // 0-1.1s grid -> wave, 1.1-2.4s wave -> cluster, then hold
    let a = targets.grid;
    let b = targets.wave;
    let k = Math.min(t / 1.1, 1);
    if (t > 1.1) {
      a = targets.wave;
      b = targets.cluster;
      k = Math.min((t - 1.1) / 1.3, 1);
    }
    k = k * k * (3 - 2 * k);
    const breathe = still ? 0 : Math.sin(clock.elapsedTime * 0.5) * 0.03;
    for (let i = 0; i < count; i++) {
      lerpStage(v, a, b, i, k);
      dummy.position.set(v.x, v.y + breathe, v.z);
      const s = 0.032 + (i % 5) * 0.004;
      dummy.scale.setScalar(s);
      dummy.rotation.set(v.x, v.y, v.z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} castShadow={false}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={COPPER} roughness={0.35} metalness={0.6} />
    </instancedMesh>
  );
}

function GlassBlocks({ still }: { still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const start = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    if (start.current === null) start.current = clock.elapsedTime;
    const t = still ? 4 : clock.elapsedTime - start.current;
    const k = THREE.MathUtils.clamp((t - 2.0) / 1.2, 0, 1);
    group.current.scale.setScalar(0.85 + k * 0.15);
    group.current.visible = k > 0.01;
    group.current.rotation.y = still ? 0.35 : 0.35 + Math.sin(clock.elapsedTime * 0.16) * 0.12;
    group.current.children.forEach((c) => {
      const m = (c as THREE.Mesh).material as THREE.Material;
      m.opacity = k;
      m.transparent = true;
    });
  });

  const blocks: Array<[number, number, number, number, number, number]> = [
    [0, 0, 0, 1.15, 1.15, 1.15],
    [0.75, 0.62, -0.35, 0.62, 0.62, 0.62],
    [-0.7, -0.5, 0.3, 0.8, 0.44, 0.8],
  ];

  return (
    <group ref={group}>
      {blocks.map(([x, y, z, w, h, d], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[0.2 * i, 0.5 * i, 0.1 * i]}>
          <boxGeometry args={[w, h, d]} />
          <MeshTransmissionMaterial
            samples={3}
            resolution={128}
            thickness={0.6}
            roughness={0.14}
            ior={1.45}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.15}
            distortionScale={0.3}
            color="#ffffff"
            attenuationColor="#e8d8c8"
            attenuationDistance={1.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function CursorLight({ reactive }: { reactive: boolean }) {
  const light = useRef<THREE.DirectionalLight>(null);
  const { pointer } = useThree();
  useFrame(() => {
    if (!light.current || !reactive) return;
    light.current.position.x += (3 + pointer.x * 2.2 - light.current.position.x) * 0.05;
    light.current.position.y += (4 + pointer.y * 1.8 - light.current.position.y) * 0.05;
  });
  return (
    <>
      <directionalLight ref={light} position={[3, 4, 5]} intensity={2.1} />
      <directionalLight position={[-5, 2, 2]} intensity={0.7} color="#ffe8d6" />
      <directionalLight position={[0, -3, -4]} intensity={0.5} />
      <ambientLight intensity={0.6} />
    </>
  );
}

export function HeroScene({
  onReady,
  reducedMotion,
  mobile,
}: {
  onReady: () => void;
  reducedMotion: boolean;
  mobile: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => setActive(!!entries[0]?.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const count = mobile ? 500 : 1400;

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={reducedMotion ? "demand" : active ? "always" : "never"}
        dpr={[1, mobile ? 1.5 : 2]}
        camera={{ position: [2.6, 1.9, 4.6], fov: 38 }}
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.setClearColor("#ffffff", 1);
          requestAnimationFrame(onReady);
        }}
      >
        <CursorLight reactive={!reducedMotion} />
        <Environment preset="studio" environmentIntensity={0.6} />
        <group position={[0, -0.1, 0]}>
          <Particles count={count} still={reducedMotion} />
          <GlassBlocks still={reducedMotion} />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.28}
            scale={9}
            blur={3.2}
            far={4}
            color="#7a4a24"
            frames={reducedMotion ? 1 : Infinity}
          />
        </group>
      </Canvas>
    </div>
  );
}