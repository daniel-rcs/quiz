import { CATEGORIES } from '../../constants/categories'
import type { QuizConfig, QuizQuestion, TriviaResponse } from '../../types'
import { decodeHtml } from '../../utils/decodeHtml'
import { shuffle } from '../../utils/shuffle'

const API_BASE_URL = 'https://opentdb.com/api.php'

// Mensagens de erro correspondentes aos códigos devolvidos pela API
const RESPONSE_MESSAGES: Record<number, string> = {
  1: 'Not enough questions available for this configuration. Try reducing the amount or changing the filters.',
  2: 'Invalid request parameter.',
  3: 'Resource not found.',
  4: 'Session token is empty.',
  5: 'Rate limit reached. Please try again in a few seconds.',
}

// Escolhe uma categoria aleatória quando o utilizador seleciona "Random"
function resolveCategoryId(category: QuizConfig['category']): string | undefined {
  if (category === 'all') return undefined
  if (category === 'random') {
    const randomIndex = Math.floor(Math.random() * CATEGORIES.length)
    return String(CATEGORIES[randomIndex].id)
  }
  return String(category)
}

// Constrói a URL de pedida à API com apenas os parâmetros definidos
function buildUrl(config: QuizConfig): string {
  const params = new URLSearchParams({ amount: String(config.amount) })

  const categoryId = resolveCategoryId(config.category)
  if (categoryId) params.set('category', categoryId)
  if (config.difficulty !== 'all') params.set('difficulty', config.difficulty)
  if (config.type !== 'all') params.set('type', config.type)

  return `${API_BASE_URL}?${params.toString()}`
}

// Converte um resultado da API numa pergunta pronta a ser exibida
function mapQuestion(raw: TriviaResponse['results'][number]): QuizQuestion {
  return {
    ...raw,
    category: decodeHtml(raw.category),
    question: decodeHtml(raw.question),
    correct_answer: decodeHtml(raw.correct_answer),
    incorrect_answers: raw.incorrect_answers.map(decodeHtml),
    options: shuffle([raw.correct_answer, ...raw.incorrect_answers]).map(decodeHtml),
  }
}

// Obtém as perguntas do quiz a partir da Open Trivia Database
export async function fetchQuestions(
  config: QuizConfig,
  signal?: AbortSignal,
): Promise<QuizQuestion[]> {
  const response = await fetch(buildUrl(config), { signal })

  if (!response.ok) {
    throw new Error('Failed to reach the trivia API. Please try again.')
  }

  const data: TriviaResponse = await response.json()

  if (data.response_code !== 0) {
    throw new Error(
      RESPONSE_MESSAGES[data.response_code] ?? 'Unexpected error from the trivia API.',
    )
  }

  return data.results.map(mapQuestion)
}
