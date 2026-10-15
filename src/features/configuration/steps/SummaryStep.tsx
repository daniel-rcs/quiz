import { Button } from '../../../components/Button'
import type { QuizConfig } from '../../../types'
import {
  getCategoryLabel,
  getDifficultyLabel,
  getTypeLabel,
} from '../../../utils/configLabels'

interface SummaryStepProps {
  config: QuizConfig
  onStart: () => void
}

// Passo 5 - resumo das opções selecionadas e início do teste
export function SummaryStep({ config, onStart }: SummaryStepProps) {
  const rows = [
    { label: 'Questions', value: String(config.amount) },
    { label: 'Category', value: getCategoryLabel(config.category) },
    { label: 'Difficulty', value: getDifficultyLabel(config.difficulty) },
    { label: 'Type', value: getTypeLabel(config.type) },
  ]

  return (
    <div className="space-y-6">
      <dl className="divide-y divide-gray-200 rounded-xl border-2 border-gray-200 bg-white">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-4 py-3"
          >
            <dt className="text-sm text-gray-500">{row.label}</dt>
            <dd className="font-semibold text-gray-900">{row.value}</dd>
          </div>
        ))}
      </dl>

      <Button onClick={onStart} className="w-full">
        Start Quiz
      </Button>
    </div>
  )
}
