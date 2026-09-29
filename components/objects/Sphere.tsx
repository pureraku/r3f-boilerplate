"use client";
import { RigidBody } from "@react-three/rapier";

interface SphereProps {
  position: [number, number, number];
}

export default function Sphere({ position }: SphereProps) {
  return (
    <RigidBody position={position} colliders="ball" restitution={0.6}>
      <mesh>
        <sphereGeometry args={[0.6, 16, 32]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>
    </RigidBody>
  );
}
