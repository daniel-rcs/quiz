import { ProgressBar } from '../../components/ProgressBar'

interface ProgressHeaderProps {
  current: number
  total: number
}

// Cabeçalho de progresso do quiz - indica em que pergunta o utilizador está
export function ProgressHeader({ current, total }: ProgressHeaderProps) {
  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-medium text-gray-500">
        Question {current} of {total}
      </p>
      <ProgressBar current={current} total={total} />
    </div>
  )
}
