"use client";
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export default function Model() {
    const { scene } = useGLTF('/r3f-boilerplate/models/gadi.glb')
  
  return (
    <RigidBody type="fixed" colliders="trimesh" rotation={[0,-Math.PI/3,0]}>
      <primitive object={scene} scale={1.5} position={[-10, 0, 2]} />
    </RigidBody>
  );
}
