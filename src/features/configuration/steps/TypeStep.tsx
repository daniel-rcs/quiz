import { SelectionCard } from '../../../components/SelectionCard'
import { TYPE_OPTIONS } from '../../../constants/options'
import type { TypeSelection } from '../../../types'

interface TypeStepProps {
  value: TypeSelection
  onChange: (value: TypeSelection) => void
}

// Passo 4 - escolha do tipo de pergunta
export function TypeStep({ value, onChange }: TypeStepProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {TYPE_OPTIONS.map((option) => (
        <SelectionCard
          key={option.value}
          label={option.label}
          selected={value === option.value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  )
}
