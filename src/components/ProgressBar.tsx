interface ProgressBarProps {
  current: number
  total: number
}

// Barra de progresso genérica com base no passo atual e no total
export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0

  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-gray-200"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
    >
      <div
        className="h-full rounded-full bg-indigo-600 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
