import { useState } from 'react'
import { AMOUNT_PRESETS, MAX_AMOUNT, MIN_AMOUNT } from '../../../constants/options'

interface AmountStepProps {
  value: number
  onChange: (value: number) => void
}

function clampAmount(value: number): number {
  return Math.min(MAX_AMOUNT, Math.max(MIN_AMOUNT, Math.round(value)))
}

// Passo 1 - escolha da quantidade de perguntas
export function AmountStep({ value, onChange }: AmountStepProps) {
  // Estado local para permitir escrita livre no input numérico
  const [inputValue, setInputValue] = useState(String(value))

  const handleChange = (raw: string) => {
    setInputValue(raw)
    const parsed = Number(raw)
    if (raw.trim() === '' || Number.isNaN(parsed)) return
    onChange(clampAmount(parsed))
  }

  const handleBlur = () => {
    setInputValue(String(value))
  }

  const handlePreset = (amount: number) => {
    setInputValue(String(amount))
    onChange(amount)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-3">
        {AMOUNT_PRESETS.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => handlePreset(amount)}
            className={`cursor-pointer rounded-xl border-2 py-3 font-semibold transition-colors ${
              value === amount
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50'
            }`}
          >
            {amount}
          </button>
        ))}
      </div>

      <label className="flex items-center justify-center gap-3 text-sm font-medium text-gray-700">
        Custom amount
        <input
          type="number"
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          value={inputValue}
          onChange={(event) => handleChange(event.target.value)}
          onBlur={handleBlur}
          className="w-24 rounded-lg border-2 border-gray-200 px-3 py-2 text-center font-semibold outline-none focus:border-indigo-500"
        />
      </label>
    </div>
  )
}
