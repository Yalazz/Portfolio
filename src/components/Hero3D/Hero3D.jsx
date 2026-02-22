import React, { useRef, useMemo, useContext, createContext } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import "./Hero3D.css";

const ThemeContext = createContext("dark");

function c(dark, light) {
  return (theme) => (theme === "light" ? light : dark);
}
const accent = c("#ff003c", "#cc0030");
const cyan = c("#00d1ff", "#0090b0");

function Aura({ color, baseScale, pulse = 0.3, opacityDark, opacityLight }) {
  const ref = useRef();
  const theme = useContext(ThemeContext);
  useFrame((state) => {
    const s = baseScale + Math.sin(state.clock.elapsedTime * 1.1) * pulse;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color={color(theme)}
        transparent
        opacity={theme === "light" ? opacityLight : opacityDark}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* Orbital ring factory */
function OrbitalRing({ radius, thickness = 0.006, color, opacity, rotAxis, speed, wobble }) {
  const ref = useRef();
  const theme = useContext(ThemeContext);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (rotAxis === "x") {
      ref.current.rotation.x += delta * speed;
      ref.current.rotation.z = Math.sin(t * wobble) * 0.25;
    } else if (rotAxis === "y") {
      ref.current.rotation.y += delta * speed;
      ref.current.rotation.x = Math.PI / 2 + Math.sin(t * wobble) * 0.3;
    } else {
      ref.current.rotation.z += delta * speed;
      ref.current.rotation.x = Math.sin(t * wobble) * 0.2;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, thickness, 8, 100]} />
      <meshBasicMaterial color={color(theme)} transparent opacity={opacity} />
    </mesh>
  );
}

/* Core icosahedron - red */
function Core() {
  const ref = useRef();
  const theme = useContext(ThemeContext);
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.3;
    ref.current.rotation.x += delta * 0.15;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
    ref.current.scale.setScalar(s);
  });
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial color={accent(theme)} wireframe transparent opacity={theme === "light" ? 0.62 : 0.78} />
      </mesh>
      <Aura color={accent} baseScale={1.85} pulse={0.05} opacityDark={0.1} opacityLight={0.06} />
      <Aura color={accent} baseScale={2.2} pulse={0.07} opacityDark={0.06} opacityLight={0.035} />
    </group>
  );
}

/* Middle shell - cyan dodecahedron */
function Shell() {
  const ref = useRef();
  const theme = useContext(ThemeContext);
  useFrame((state, delta) => {
    ref.current.rotation.y -= delta * 0.12;
    ref.current.rotation.z += delta * 0.08;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.6 + 1) * 0.03;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[2.0, 0]} />
      <meshBasicMaterial color={cyan(theme)} wireframe transparent opacity={theme === "light" ? 0.15 : 0.22} />
    </mesh>
  );
}

/* Outer sphere wireframe - very faint */
function OuterSphere() {
  const ref = useRef();
  const theme = useContext(ThemeContext);
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x += delta * 0.03;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[3.8, 1]} />
      <meshBasicMaterial color={accent(theme)} wireframe transparent opacity={theme === "light" ? 0.04 : 0.07} />
    </mesh>
  );
}

/* Orbiting mini shapes */
function Orbiter({ radius, speed, offset, geo, size, color, opacityVal, glow = false }) {
  const ref = useRef();
  const theme = useContext(ThemeContext);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.y = Math.sin(t * 1.3) * (radius * 0.25);
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.rotation.y += 0.03;
    ref.current.rotation.x += 0.02;
  });
  return (
    <group ref={ref}>
      <mesh>
        {geo === "octahedron" && <octahedronGeometry args={[size, 0]} />}
        {geo === "tetrahedron" && <tetrahedronGeometry args={[size, 0]} />}
        <meshBasicMaterial color={color(theme)} wireframe transparent opacity={opacityVal} />
      </mesh>
      {glow && (
        <mesh>
          <sphereGeometry args={[size * 2.6, 16, 16]} />
          <meshBasicMaterial
            color={color(theme)}
            transparent
            opacity={theme === "light" ? 0.07 : 0.12}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
}

/* Particle field */
function Particles({ count = 200 }) {
  const ref = useRef();
  const theme = useContext(ThemeContext);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.8 + Math.random() * 4.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color={accent(theme)}
        size={0.025}
        transparent
        opacity={theme === "light" ? 0.3 : 0.45}
        sizeAttenuation
      />
    </points>
  );
}

/* Connecting lines between random points - like a constellation */
function ConstellationLines({ count = 30 }) {
  const ref = useRef();
  const theme = useContext(ThemeContext);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < 2; j++) {
        const r = 2.5 + Math.random() * 2.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        arr[i * 6 + j * 3] = r * Math.sin(phi) * Math.cos(theta);
        arr[i * 6 + j * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i * 6 + j * 3 + 2] = r * Math.cos(phi);
      }
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.04;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count * 2} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={cyan(theme)} transparent opacity={theme === "light" ? 0.06 : 0.1} />
    </lineSegments>
  );
}

/* Mouse parallax */
function SceneGroup() {
  const groupRef = useRef();
  const { pointer } = useThree();
  const smooth = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const targetY = pointer.x * 0.14;
    const targetX = -pointer.y * 0.08;
    smooth.current.x += (targetX - smooth.current.x) * 0.06;
    smooth.current.y += (targetY - smooth.current.y) * 0.06;

    groupRef.current.rotation.y = Math.sin(t * 0.22) * 0.04 + smooth.current.y;
    groupRef.current.rotation.x = Math.sin(t * 0.16) * 0.025 + smooth.current.x;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.08}>
      <Core />
      <Shell />
      <OuterSphere />

      <OrbitalRing radius={2.8} thickness={0.007} color={accent} opacity={0.23} rotAxis="y" speed={0.2} wobble={0.5} />
      <OrbitalRing radius={3.2} thickness={0.005} color={cyan} opacity={0.13} rotAxis="x" speed={0.15} wobble={0.4} />
      <OrbitalRing radius={3.6} thickness={0.004} color={accent} opacity={0.07} rotAxis="z" speed={0.1} wobble={0.3} />

      <Orbiter radius={3.0} speed={0.6} offset={0} geo="octahedron" size={0.1} color={accent} opacityVal={0.7} glow />
      <Orbiter radius={3.4} speed={0.45} offset={Math.PI} geo="tetrahedron" size={0.08} color={cyan} opacityVal={0.5} />
      <Orbiter radius={4.0} speed={0.35} offset={Math.PI / 2} geo="octahedron" size={0.06} color={accent} opacityVal={0.4} />

      <Particles />
      <ConstellationLines />
    </group>
  );
}

export default function Hero3D({ theme = "dark" }) {
  return (
    <div className={`hero3d-canvas hero3d-${theme}`}>
      <ThemeContext.Provider value={theme}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 72 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        >
          <SceneGroup />
        </Canvas>
      </ThemeContext.Provider>
    </div>
  );
}
