"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const RiskGlobe = ({ data }: { data: any[] }) => {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.8} />
      </Sphere>
      {data.map((point, i) => (
        <RiskPoint key={i} lat={point.lat} lng={point.lng} value={point.value} />
      ))}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

const RiskPoint = ({ lat, lng, value }: { lat: number; lng: number; value: number }) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (180 - lng) * (Math.PI / 180);
  const x = 1.1 * Math.sin(phi) * Math.cos(theta);
  const y = 1.1 * Math.cos(phi);
  const z = 1.1 * Math.sin(phi) * Math.sin(theta);
  const color = value > 0.7 ? "#ef4444" : value > 0.5 ? "#f59e0b" : "#10b981";
  
  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.03 + value * 0.05, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
};

export default RiskGlobe;