import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '../../components/Button'
import type { QuizConfig, QuizQuestion } from '../../types'
import { fetchQuestions } from '../trivia/triviaApi'
import { ProgressHeader } from './ProgressHeader'
import { QuestionCard } from './QuestionCard'

interface QuizResult {
  score: number
  total: number
}

interface QuizScreenProps {
  config: QuizConfig
  onFinish: (result: QuizResult) => void
}

// Ecrã de execução do quiz - carrega as perguntas e gere as respostas
export function QuizScreen({ config, onFinish }: QuizScreenProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  // Carrega as perguntas da API e cancela o pedido se o ecrã for desmontado
  useEffect(() => {
    const controller = new AbortController()

    async function loadQuestions() {
      setIsLoading(true)
      setError(null)
      try {
        const fetchedQuestions = await fetchQuestions(config, controller.signal)
        setQuestions(fetchedQuestions)
      } catch (err) {
        if (controller.signal.aborted) return
        setError(
          err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        )
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    void loadQuestions()
    return () => controller.abort()
  }, [config, retryCount])

  // Regista a resposta selecionada e mostra o feedback
  const handleAnswer = () => {
    if (!selectedOption) return
    if (selectedOption === questions[currentIndex].correct_answer) {
      setScore((current) => current + 1)
    }
    setSubmitted(true)
  }

  // Avança para a próxima pergunta ou termina o quiz
  const handleNext = () => {
    const isLastQuestion = currentIndex === questions.length - 1
    if (isLastQuestion) {
      onFinish({ score, total: questions.length })
      return
    }
    setCurrentIndex((current) => current + 1)
    setSelectedOption(null)
    setSubmitted(false)
  }

  const handleRetry = () => {
    setRetryCount((current) => current + 1)
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 text-gray-500">
        <Loader2 className="animate-spin" size={20} />
        <span>Loading questions...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
        <p className="text-gray-700">{error}</p>
        <Button onClick={handleRetry}>Try Again</Button>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <ProgressHeader current={currentIndex + 1} total={questions.length} />
      <QuestionCard
        question={currentQuestion}
        selectedOption={selectedOption}
        submitted={submitted}
        isLast={isLastQuestion}
        onSelect={setSelectedOption}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  )
}
