// Dificuldade das perguntas devolvida pela API
export type Difficulty = 'easy' | 'medium' | 'hard'

// Tipo de pergunta devolvida pela API
export type QuestionType = 'multiple' | 'boolean'

// Resposta crua da Open Trivia Database
export interface TriviaResponse {
  response_code: number
  results: TriviaQuestion[]
}

// Pergunta tal como chega da API
export interface TriviaQuestion {
  type: QuestionType
  difficulty: Difficulty
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

// Pergunta preparada para exibição (opções já baralhadas)
export interface QuizQuestion extends TriviaQuestion {
  options: string[]
}

// Seleção do passo de categorias no wizard
export type CategorySelection = number | 'all' | 'random'

// Seleção do passo de dificuldade no wizard
export type DifficultySelection = Difficulty | 'all'

// Seleção do passo de tipo no wizard
export type TypeSelection = QuestionType | 'all'

// Configuração final do quiz
export interface QuizConfig {
  amount: number
  category: CategorySelection
  difficulty: DifficultySelection
  type: TypeSelection
}

// Ecrãs da aplicação
export type Screen = 'config' | 'quiz' | 'complete'

// Estado de uma resposta do utilizador
export type AnswerState = 'correct' | 'incorrect'
