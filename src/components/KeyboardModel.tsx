import { ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useConfiguratorStore } from '../store/useConfiguratorStore'

type GLTFResult = GLTF & {
  nodes: {
    Big_Buttons: THREE.Mesh
    Chassis: THREE.Mesh
    Small_Buttons: THREE.Mesh
  }
  materials: {
    Big_Buttons: THREE.MeshStandardMaterial
    Chassis: THREE.MeshStandardMaterial
    Small_Buttons: THREE.MeshStandardMaterial
  }
}

export function KeyboardModel(props: ThreeElements['group']) {
  const { nodes } = useGLTF('/keyboard.glb') as unknown as GLTFResult
  const { selectedChassis, selectedSmallButtons, selectedBigButtons } =
    useConfiguratorStore()
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Chassis.geometry}
          position={[-2.024, 0.544, -0.115]}
        >
          <meshStandardMaterial
            color={selectedChassis?.value || '#cccccc'}
            roughness={selectedChassis?.material === 'metal' ? 0.2 : 0.8}
            metalness={selectedChassis?.material === 'metal' ? 0.8 : 0.1}
          />
        </mesh>
        <mesh
          geometry={nodes.Small_Buttons.geometry}
          position={[-1.399, 0.46, 0.035]}
        >
          <meshStandardMaterial
            color={selectedSmallButtons?.value || '#ffffff'}
            roughness={selectedSmallButtons?.material === 'glossy' ? 0.1 : 0.9}
          />
        </mesh>
        <mesh
          geometry={nodes.Big_Buttons.geometry}
          position={[-1.812, 0.291, 0.035]}
        >
          <meshStandardMaterial
            color={selectedBigButtons?.value || '#ffffff'}
            roughness={selectedBigButtons?.material === 'glossy' ? 0.1 : 0.9}
          />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/keyboard.glb')
