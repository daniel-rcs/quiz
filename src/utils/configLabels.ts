import { CATEGORIES } from '../constants/categories'
import { DIFFICULTY_OPTIONS, TYPE_OPTIONS } from '../constants/options'
import type {
  CategorySelection,
  DifficultySelection,
  TypeSelection,
} from '../types'

// Devolve o nome legível de uma categoria selecionada
export function getCategoryLabel(category: CategorySelection): string {
  if (category === 'all') return 'All categories'
  if (category === 'random') return 'Random'
  return CATEGORIES.find((item) => item.id === category)?.name ?? 'Unknown'
}

// Devolve o nome legível de uma dificuldade selecionada
export function getDifficultyLabel(difficulty: DifficultySelection): string {
  return (
    DIFFICULTY_OPTIONS.find((item) => item.value === difficulty)?.label ??
    'Unknown'
  )
}

// Devolve o nome legível de um tipo de pergunta selecionado
export function getTypeLabel(type: TypeSelection): string {
  return TYPE_OPTIONS.find((item) => item.value === type)?.label ?? 'Unknown'
}
