import { create } from 'zustand'

export interface Option {
  id: number
  component_type: 'Chassis' | 'Small_Buttons' | 'Big_Buttons'
  label: string
  value: string
  material: string
  price: number
  in_stock: boolean
}

interface ConfiguratorState {
  options: Option[]
  selectedChassis: Option | null
  selectedSmallButtons: Option | null
  selectedBigButtons: Option | null
  basePrice: number
  fetchOptions: () => Promise<void>
  selectComponent: (option: Option) => void
  getTotalPrice: () => number
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  options: [],
  selectedChassis: null,
  selectedSmallButtons: null,
  selectedBigButtons: null,
  basePrice: 89.0,

  fetchOptions: async () => {
    const response = await fetch('/api/options')
    const data = await response.json()

    if (Array.isArray(data)) {
      set({
        options: data,
        selectedChassis:
          data.find((o) => o.component_type === 'Chassis') || null,
        selectedSmallButtons:
          data.find((o) => o.component_type === 'Small_Buttons') || null,
        selectedBigButtons:
          data.find((o) => o.component_type === 'Big_Buttons') || null,
      })
    }
  },
  selectComponent: (option) => {
    if (option.component_type === 'Chassis') set({ selectedChassis: option })
    if (option.component_type === 'Small_Buttons')
      set({ selectedSmallButtons: option })
    if (option.component_type === 'Big_Buttons')
      set({ selectedBigButtons: option })
  },
  getTotalPrice: () => {
    const {
      basePrice,
      selectedChassis,
      selectedSmallButtons,
      selectedBigButtons,
    } = get()
    const chassisAddition = selectedChassis ? Number(selectedChassis.price) : 0
    const smallAddition = selectedSmallButtons
      ? Number(selectedSmallButtons.price)
      : 0
    const bigAddition = selectedBigButtons
      ? Number(selectedBigButtons.price)
      : 0
    return basePrice + chassisAddition + smallAddition + bigAddition
  },
}))
