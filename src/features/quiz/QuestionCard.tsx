import { Button } from '../../components/Button'
import { OptionCard, type OptionState } from '../../components/OptionCard'
import type { QuizQuestion } from '../../types'

interface QuestionCardProps {
  question: QuizQuestion
  selectedOption: string | null
  submitted: boolean
  onSelect: (option: string) => void
  onAnswer: () => void
}

// Determina o estado visual de uma opção consoante a fase de resposta
function getOptionState(
  option: string,
  question: QuizQuestion,
  selectedOption: string | null,
  submitted: boolean,
): OptionState {
  if (!submitted) {
    return option === selectedOption ? 'selected' : 'default'
  }
  if (option === question.correct_answer) return 'correct'
  if (option === selectedOption) return 'incorrect'
  return 'default'
}

// Exibe a pergunta atual com as suas opções de resposta
export function QuestionCard({
  question,
  selectedOption,
  submitted,
  onSelect,
  onAnswer,
}: QuestionCardProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">{question.question}</h2>

      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <OptionCard
            key={option}
            label={option}
            state={getOptionState(option, question, selectedOption, submitted)}
            disabled={submitted}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>

      {submitted && (
        <p className="text-sm font-medium text-gray-600">
          Correct answer: {question.correct_answer}
        </p>
      )}

      {!submitted && (
        <Button onClick={onAnswer} disabled={!selectedOption} className="w-full">
          Answer
        </Button>
      )}
    </div>
  )
}
