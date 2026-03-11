import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 90;
const CONNECTION_DISTANCE = 2.2;
const MOUSE_GLOW_RADIUS = 3.0;

/* ── Particle Network Scene ─────────────────────────────────────────── */
function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  // Generate stable random positions
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    const vel = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, []);

  // Pre-allocate buffer for connection lines (max possible connections)
  const maxLines = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
  const linePositions = useMemo(
    () => new Float32Array(maxLines * 6),
    [maxLines],
  );
  const lineColors = useMemo(
    () => new Float32Array(maxLines * 6),
    [maxLines],
  );

  // Node colors — individual per-vertex to allow mouse proximity glow
  const nodeColors = useMemo(() => {
    const c = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      // base teal: #89ffd7 → (0.537, 1.0, 0.843)
      c[i * 3] = 0.537;
      c[i * 3 + 1] = 1.0;
      c[i * 3 + 2] = 0.843;
    }
    return c;
  }, []);

  // Node sizes — individual per-vertex for mouse proximity scaling
  const nodeSizes = useMemo(() => {
    const s = new Float32Array(NODE_COUNT);
    s.fill(3.0);
    return s;
  }, []);

  // Track mouse in NDC
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const colorAttr = pointsRef.current.geometry.attributes
      .color as THREE.BufferAttribute;
    const sizeAttr = pointsRef.current.geometry.attributes
      .size as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;
    const colArr = colorAttr.array as Float32Array;
    const sizeArr = sizeAttr.array as Float32Array;

    // Convert mouse to world-space (approximate, at z=0)
    const mouseWorld = new THREE.Vector3(
      mouse.current.x * viewport.width * 0.5,
      mouse.current.y * viewport.height * 0.5,
      0,
    );

    const dt = Math.min(delta, 0.05); // clamp for tab-switch spikes

    // ── Update node positions ──────────────────────────────────────
    for (let i = 0; i < NODE_COUNT; i++) {
      const ix = i * 3;

      // Drift
      posArr[ix] += velocities[ix]! * dt * 60;
      posArr[ix + 1] += velocities[ix + 1]! * dt * 60;
      posArr[ix + 2] += velocities[ix + 2]! * dt * 60;

      // Boundary wrap with soft margins
      if (posArr[ix]! > 6) velocities[ix] = -Math.abs(velocities[ix]!);
      if (posArr[ix]! < -6) velocities[ix] = Math.abs(velocities[ix]!);
      if (posArr[ix + 1]! > 4.5)
        velocities[ix + 1] = -Math.abs(velocities[ix + 1]!);
      if (posArr[ix + 1]! < -4.5)
        velocities[ix + 1] = Math.abs(velocities[ix + 1]!);
      if (posArr[ix + 2]! > 3) velocities[ix + 2] = -Math.abs(velocities[ix + 2]!);
      if (posArr[ix + 2]! < -3) velocities[ix + 2] = Math.abs(velocities[ix + 2]!);

      // Mouse proximity glow — brighten nodes near cursor
      const dx = posArr[ix]! - mouseWorld.x;
      const dy = posArr[ix + 1]! - mouseWorld.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / MOUSE_GLOW_RADIUS);

      // Lerp color: base teal → bright white near cursor
      colArr[ix] = 0.537 + proximity * 0.46;
      colArr[ix + 1] = 1.0;
      colArr[ix + 2] = 0.843 + proximity * 0.157;

      // Scale size near cursor
      sizeArr[i] = 3.0 + proximity * 5.0;
    }

    posAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;

    // ── Build connection lines ─────────────────────────────────────
    let lineIdx = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const ix = i * 3;
        const jx = j * 3;
        const dx = posArr[ix]! - posArr[jx]!;
        const dy = posArr[ix + 1]! - posArr[jx + 1]!;
        const dz = posArr[ix + 2]! - posArr[jx + 2]!;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE;
          const ci = lineIdx * 6;

          // Start vertex
          linePositions[ci] = posArr[ix]!;
          linePositions[ci + 1] = posArr[ix + 1]!;
          linePositions[ci + 2] = posArr[ix + 2]!;
          // End vertex
          linePositions[ci + 3] = posArr[jx]!;
          linePositions[ci + 4] = posArr[jx + 1]!;
          linePositions[ci + 5] = posArr[jx + 2]!;

          // Line color: teal with distance-based alpha via RGB scaling
          const brightness = alpha * 0.35;
          lineColors[ci] = 0.596 * brightness;
          lineColors[ci + 1] = 0.827 * brightness;
          lineColors[ci + 2] = 1.0 * brightness;
          lineColors[ci + 3] = 0.596 * brightness;
          lineColors[ci + 4] = 0.827 * brightness;
          lineColors[ci + 5] = 1.0 * brightness;

          lineIdx++;
        }
      }
    }

    // Update line geometry — only draw active connections
    const lineGeo = linesRef.current.geometry;
    const linePosAttr = lineGeo.attributes
      .position as THREE.BufferAttribute;
    const lineColAttr = lineGeo.attributes.color as THREE.BufferAttribute;
    (linePosAttr.array as Float32Array).set(linePositions);
    (lineColAttr.array as Float32Array).set(lineColors);
    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;
    lineGeo.setDrawRange(0, lineIdx * 2);
  });

  return (
    <>
      {/* Ambient + accent lights */}
      <ambientLight color={0x8cc8ff} intensity={0.55} />
      <pointLight color={0x84ffd3} intensity={1.1} position={[4, 3, 5]} />
      <pointLight color={0x5f8bff} intensity={0.8} position={[-4, -2, -5]} />

      {/* Particle nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[nodeColors, 3]} />
          <bufferAttribute attach="attributes-size" args={[nodeSizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={3}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

/* ── Canvas wrapper — fullbleed behind hero ─────────────────────────── */
export default function HeroBackground() {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="hero-scene" id="hero-scene">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        frameloop={reduceMotion ? "demand" : "always"}
      >
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
