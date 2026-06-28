'use client'

import React, { useState } from 'react'
import { useConfiguratorStore, Option } from '../store/useConfiguratorStore'

type Section = 'Chassis' | 'Small_Buttons' | 'Big_Buttons'

export default function ConfiguratorUI() {
  const {
    options,
    selectedChassis,
    selectedSmallButtons,
    selectedBigButtons,
    selectComponent,
    getTotalPrice,
  } = useConfiguratorStore()

  const [activeSection, setActiveSection] = useState<Section>('Chassis')

  const chassisOptions = options.filter(
    (opt) => opt.component_type === 'Chassis',
  )
  const smallButtonsOptions = options.filter(
    (opt) => opt.component_type === 'Small_Buttons',
  )
  const bigButtonsOptions = options.filter(
    (opt) => opt.component_type === 'Big_Buttons',
  )

  const totalPrice = getTotalPrice()

  return (
    <div className='absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-10'>
      <header className='flex justify-between items-start w-full'>
        <div className='pointer-events-auto'>
          <h1 className='text-2xl font-bold text-gray-900 tracking-tight drop-shadow-sm'>
            3D Configurator
          </h1>
        </div>

        <div className='pointer-events-auto bg-gray-900/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-mono text-lg font-bold shadow-lg'>
          ${totalPrice}
        </div>
      </header>
      <footer className='pointer-events-auto w-full max-w-xl mx-auto bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 flex flex-col gap-6'>
        <div className='flex bg-gray-200/50 p-1 rounded-2xl w-full'>
          {(['Chassis', 'Small_Buttons', 'Big_Buttons'] as Section[]).map(
            (section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`flex-1 py-2.5 text-sm font-semibold cursor-pointer rounded-xl capitalize transition-all duration-300 ${
                  activeSection === section
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {section.replace('_', ' ')}
              </button>
            ),
          )}
        </div>

        <div className='flex flex-wrap gap-4 justify-center items-center min-h-[60px]'>
          {activeSection === 'Chassis' &&
            chassisOptions.map((opt) => (
              <ColorButton
                key={opt.id}
                option={opt}
                activeId={selectedChassis?.id}
                onClick={() => selectComponent(opt)}
              />
            ))}

          {activeSection === 'Small_Buttons' &&
            smallButtonsOptions.map((opt) => (
              <ColorButton
                key={opt.id}
                option={opt}
                activeId={selectedSmallButtons?.id}
                onClick={() => selectComponent(opt)}
              />
            ))}

          {activeSection === 'Big_Buttons' &&
            bigButtonsOptions.map((opt) => (
              <ColorButton
                key={opt.id}
                option={opt}
                activeId={selectedBigButtons?.id}
                onClick={() => selectComponent(opt)}
              />
            ))}
        </div>
      </footer>
    </div>
  )
}

function ColorButton({
  option,
  activeId,
  onClick,
}: {
  option: Option
  activeId?: number
  onClick: () => void
}) {
  const isActive = activeId === option.id

  return (
    <button
      onClick={onClick}
      className={`relative w-12 h-12 rounded-full transition-all duration-300 flex items-center cursor-pointer justify-center ${
        isActive ? 'scale-110 shadow-md' : 'hover:scale-105 hover:shadow-sm'
      }`}
      title={`${option.label} (+${option.price}$)`}
    >
      <span
        className={`absolute inset-0 rounded-full border-2 transition-colors duration-300 ${
          isActive ? 'border-gray-900' : 'border-transparent'
        }`}
        style={{ padding: '4px' }}
      />
      <span
        className='w-9 h-9 rounded-full border border-black/10'
        style={{ backgroundColor: option.value }}
      />
    </button>
  )
}
