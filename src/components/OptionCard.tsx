export type OptionState = 'default' | 'selected' | 'correct' | 'incorrect'

interface OptionCardProps {
  label: string
  state?: OptionState
  disabled?: boolean
  onClick?: () => void
}

const stateClasses: Record<OptionState, string> = {
  default: 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50',
  selected: 'border-indigo-500 bg-indigo-50 text-indigo-700',
  correct: 'border-green-500 bg-green-50 text-green-700',
  incorrect: 'border-red-500 bg-red-50 text-red-700',
}

// Cartão de opção de resposta com estados de seleção e feedback
export function OptionCard({
  label,
  state = 'default',
  disabled = false,
  onClick,
}: OptionCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`w-full cursor-pointer rounded-lg border-2 px-4 py-3 text-left transition-colors disabled:cursor-default ${stateClasses[state]}`}
    >
      {label}
    </button>
  )
}
