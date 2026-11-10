import QuestionCard from '../components/QuestionCard.jsx'
import { questions } from '../data/questions.js'

function Duel({ gameSettings, onBack }) {
  const categoryQuestions = questions[gameSettings.category]

  if (!categoryQuestions || categoryQuestions.length === 0) {
    return (
      <main>
        <h1>No Questions Available</h1>
        <p>We haven't added questions for this category yet.</p>

        <button onClick={onBack}>Back to Setup</button>
      </main>
    )
  }

  const currentQuestion = categoryQuestions[0]

  return (
    <main className="duel">
      <h1>Duel</h1>

      <p>
        {gameSettings.player1} vs {gameSettings.player2}
      </p>

      <p>Category: {gameSettings.category}</p>

      <QuestionCard question={currentQuestion} />

      <button onClick={onBack}>Back to Setup</button>
    </main>
  )
}

export default Duel
