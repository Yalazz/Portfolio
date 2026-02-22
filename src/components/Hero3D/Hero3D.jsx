import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./Hero3D.css";

function WireframeShape() {
  const meshRef = useRef();
  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x += delta * 0.15;
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshBasicMaterial color="#ff003c" wireframe />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="hero3d-canvas">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <WireframeShape />
      </Canvas>
    </div>
  );
}
