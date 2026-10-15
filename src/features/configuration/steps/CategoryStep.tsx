import { LayoutGrid, Shuffle } from 'lucide-react'
import { SelectionCard } from '../../../components/SelectionCard'
import { CATEGORIES } from '../../../constants/categories'
import type { CategorySelection } from '../../../types'

interface CategoryStepProps {
  value: CategorySelection
  onChange: (value: CategorySelection) => void
}

// Passo 2 - escolha da categoria em formato de cartões
export function CategoryStep({ value, onChange }: CategoryStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <SelectionCard
          label="All categories"
          icon={<LayoutGrid size={18} />}
          selected={value === 'all'}
          onClick={() => onChange('all')}
        />
        <SelectionCard
          label="Random"
          icon={<Shuffle size={18} />}
          selected={value === 'random'}
          onClick={() => onChange('random')}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {CATEGORIES.map((category) => (
          <SelectionCard
            key={category.id}
            label={category.name}
            selected={value === category.id}
            onClick={() => onChange(category.id)}
          />
        ))}
      </div>
    </div>
  )
}
