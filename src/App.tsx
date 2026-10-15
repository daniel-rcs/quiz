import { useState } from 'react'
import { ConfigurationWizard } from './features/configuration/ConfigurationWizard'
import { QuizScreen } from './features/quiz/QuizScreen'
import { ResultsScreen } from './features/quiz/ResultsScreen'
import type { QuizConfig, Screen } from './types'

// Componente principal - gestão dos ecrãs da aplicação
function App() {
  const [screen, setScreen] = useState<Screen>('config')
  const [config, setConfig] = useState<QuizConfig | null>(null)
  const [finalResult, setFinalResult] = useState({ score: 0, total: 0 })

  const handleStart = (quizConfig: QuizConfig) => {
    setConfig(quizConfig)
    setScreen('quiz')
  }

  const handleFinish = (result: { score: number; total: number }) => {
    setFinalResult(result)
    setScreen('complete')
  }

  // Reinicia o quiz com as mesmas configurações (o QuizScreen volta a montar e a buscar as perguntas)
  const handleRestart = () => {
    setScreen('quiz')
  }

  // Volta ao wizard para configurar um novo teste
  const handleConfigure = () => {
    setConfig(null)
    setScreen('config')
  }

  return (
    <main className="flex min-h-screen justify-center bg-gray-50 px-4 py-10">
      {screen === 'config' && (
        <ConfigurationWizard onStart={handleStart} />
      )}
      {screen === 'quiz' && config && (
        <QuizScreen config={config} onFinish={handleFinish} />
      )}
      {screen === 'complete' && (
        <ResultsScreen
          score={finalResult.score}
          total={finalResult.total}
          onRestart={handleRestart}
          onConfigure={handleConfigure}
        />
      )}
    </main>
  )
}

export default App
