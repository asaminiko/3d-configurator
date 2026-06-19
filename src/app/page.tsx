'use client'

import dynamic from 'next/dynamic'
import { useConfiguratorStore } from '../store/useConfiguratorStore'
import { useEffect } from 'react'

const Scene = dynamic(() => import('@/src/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className='flex h-screen w-full items-center justify-center text-gray-500 font-medium'>
      Loading 3D engine...
    </div>
  ),
})

export default function Home() {
  const { fetchOptions } = useConfiguratorStore()

  useEffect(() => {
    fetchOptions()
  }, [fetchOptions])

  return (
    <main className='relative flex min-h-screen flex-col w-full'>
      <div className='absolute inset-0 z-0'>
        <Scene />
      </div>
      <div className='relative z-10 pointer-events-none w-full h-full'></div>
    </main>
  )
}
