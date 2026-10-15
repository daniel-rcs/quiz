import { useState } from 'react'
import { Button } from '../../components/Button'
import { ProgressBar } from '../../components/ProgressBar'
import { DEFAULT_AMOUNT } from '../../constants/options'
import type {
  CategorySelection,
  DifficultySelection,
  QuizConfig,
  TypeSelection,
} from '../../types'
import { AmountStep } from './steps/AmountStep'
import { CategoryStep } from './steps/CategoryStep'
import { DifficultyStep } from './steps/DifficultyStep'
import { SummaryStep } from './steps/SummaryStep'
import { TypeStep } from './steps/TypeStep'

// Títulos e descrições de cada passo do wizard
const STEPS = [
  {
    title: 'How many questions?',
    description: 'Pick the number of questions for your quiz (1-50).',
  },
  {
    title: 'Choose a category',
    description: 'Pick a single category, all of them or a random one.',
  },
  {
    title: 'Choose a difficulty',
    description: 'Pick the difficulty level or mix them all.',
  },
  {
    title: 'Choose the question type',
    description: 'Multiple choice, true or false, or both.',
  },
  {
    title: 'Ready to start',
    description: 'Review your settings and start the quiz.',
  },
]

interface ConfigurationWizardProps {
  onStart: (config: QuizConfig) => void
}

// Wizard de configuração do quiz - apresenta um passo de cada vez
export function ConfigurationWizard({ onStart }: ConfigurationWizardProps) {
  const [step, setStep] = useState(0)
  const [amount, setAmount] = useState(DEFAULT_AMOUNT)
  const [category, setCategory] = useState<CategorySelection>('all')
  const [difficulty, setDifficulty] = useState<DifficultySelection>('all')
  const [type, setType] = useState<TypeSelection>('all')

  const config: QuizConfig = { amount, category, difficulty, type }
  const isLastStep = step === STEPS.length - 1

  const handleStart = () => {
    onStart(config)
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return <AmountStep value={amount} onChange={setAmount} />
      case 1:
        return <CategoryStep value={category} onChange={setCategory} />
      case 2:
        return <DifficultyStep value={difficulty} onChange={setDifficulty} />
      case 3:
        return <TypeStep value={type} onChange={setType} />
      default:
        return <SummaryStep config={config} onStart={handleStart} />
    }
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Step {step + 1} of {STEPS.length}
          </span>
        </div>
        <ProgressBar current={step + 1} total={STEPS.length} />
      </div>

      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-bold text-gray-900">{STEPS[step].title}</h2>
        <p className="text-sm text-gray-500">{STEPS[step].description}</p>
      </div>

      <div>{renderStep()}</div>

      {!isLastStep && (
        <div className="flex justify-between">
          <Button
            variant="secondary"
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            disabled={step === 0}
          >
            Back
          </Button>
          <Button onClick={() => setStep((current) => current + 1)}>Next</Button>
        </div>
      )}
    </div>
  )
}
