"use client";
import { RigidBody } from "@react-three/rapier";

export default function Plane(){
    let size = 20.0;
    return(
    <>

    <RigidBody type="fixed" rotation={[-Math.PI/2,0,0]}>

    <mesh>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial color="lightgreen" />
      </mesh>

    </RigidBody>
    </>
    );
}
