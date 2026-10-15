import { SelectionCard } from '../../../components/SelectionCard'
import { DIFFICULTY_OPTIONS } from '../../../constants/options'
import type { DifficultySelection } from '../../../types'

interface DifficultyStepProps {
  value: DifficultySelection
  onChange: (value: DifficultySelection) => void
}

// Passo 3 - escolha da dificuldade
export function DifficultyStep({ value, onChange }: DifficultyStepProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {DIFFICULTY_OPTIONS.map((option) => (
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
