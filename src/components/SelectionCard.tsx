import type { ReactNode } from 'react'

interface SelectionCardProps {
  label: string
  selected: boolean
  onClick: () => void
  icon?: ReactNode
}

// Cartão selecionável usado nos passos do wizard de configuração
export function SelectionCard({
  label,
  selected,
  onClick,
  icon,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-colors ${
        selected
          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
          : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
