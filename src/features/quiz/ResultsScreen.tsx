import { Button } from '../../components/Button'

interface ResultsScreenProps {
  score: number
  total: number
  onRestart: () => void
  onConfigure: () => void
}

// Mensagem final consoante a percentagem de respostas corretas
function getResultMessage(percentage: number): string {
  if (percentage >= 80) return 'Excellent!'
  if (percentage >= 50) return 'Good job!'
  return 'Keep practicing!'
}

// Ecrã final com a pontuação e opções para repetir ou reconfigurar o quiz
export function ResultsScreen({
  score,
  total,
  onRestart,
  onConfigure,
}: ResultsScreenProps) {
  const percentage = total > 0 ? (score / total) * 100 : 0

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold text-gray-900">Quiz Complete!</h2>
        <p className="text-gray-500">{getResultMessage(percentage)}</p>
      </div>

      <p className="text-5xl font-bold text-indigo-600">
        {score} <span className="text-2xl text-gray-400">/ {total}</span>
      </p>
      <p className="text-sm text-gray-500">correct answers</p>

      <div className="flex w-full flex-col gap-3">
        <Button onClick={onRestart}>Restart Quiz</Button>
        <Button variant="secondary" onClick={onConfigure}>
          Configure New Quiz
        </Button>
      </div>
    </div>
  )
}
