import { useState } from 'react'
import { ConfigurationWizard } from './features/configuration/ConfigurationWizard'
import type { QuizConfig, Screen } from './types'

// Componente principal - gestão dos ecrãs da aplicação
function App() {
  const [screen, setScreen] = useState<Screen>('config')
  const [config, setConfig] = useState<QuizConfig | null>(null)

  const handleStart = (quizConfig: QuizConfig) => {
    setConfig(quizConfig)
    setScreen('quiz')
  }

  if (screen === 'config') {
    return (
      <main className="flex min-h-screen justify-center bg-gray-50 px-4 py-10">
        <ConfigurationWizard onStart={handleStart} />
      </main>
    )
  }

  // Os ecrãs de quiz e resultados serão implementados nas próximas fases
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <p className="text-gray-500">
        Quiz screen - {config?.amount} questions - coming soon
      </p>
    </main>
  )
}

export default App
