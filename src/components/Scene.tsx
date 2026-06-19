'use client'

import {
  Center,
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useProgress,
} from '@react-three/drei'
import { KeyboardModel } from './KeyboardModel'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className='text-gray-500 font-medium whitespace-nowrap'>
        Loading 3D... {progress.toFixed(0)}%
      </div>
    </Html>
  )
}

export default function Scene() {
  return (
    <div className='w-full h-[600px] lg:h-screen bg-gray-50'>
      <Canvas camera={{ position: [0, 4, 8], fov: 45 }} dpr={[1, 2]} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <Suspense fallback={<Loader />}>
          <Environment preset='city' />
          <Center top>
            <KeyboardModel />
          </Center>

          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.6}
            scale={10}
            blur={2.5}
            far={4}
            frames={1}
            resolution={512}
          />
        </Suspense>

        <OrbitControls
          makeDefault
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
