import type {
  DifficultySelection,
  QuestionType,
  TypeSelection,
} from '../types'

// Limites de quantidade de perguntas aceites pela API
export const MIN_AMOUNT = 1
export const MAX_AMOUNT = 50
export const DEFAULT_AMOUNT = 10

// Quantidades sugeridas no passo de quantidade
export const AMOUNT_PRESETS = [5, 10, 15, 20, 25, 30, 40, 50]

// Opções do passo de dificuldade
export const DIFFICULTY_OPTIONS: {
  value: DifficultySelection
  label: string
}[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
  { value: 'all', label: 'All difficulties' },
]

// Opções do passo de tipo de pergunta
export const TYPE_OPTIONS: { value: TypeSelection; label: string }[] = [
  { value: 'multiple', label: 'Multiple choice' },
  { value: 'boolean', label: 'True or false' },
  { value: 'all', label: 'All types' },
]

// Nomes amigáveis para os tipos devolvidos pela API
export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  multiple: 'Multiple choice',
  boolean: 'True or false',
}
