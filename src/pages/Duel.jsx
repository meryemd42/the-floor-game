import { useEffect, useState } from 'react'
import QuestionCard from '../components/QuestionCard.jsx'
import Timer from '../components/Timer.jsx'
import { questions } from '../data/questions.js'
import { isCorrectAnswer } from '../utils/answerValidation.js'

function Duel({ gameSettings, onBack, onGameOver }) {
  const categoryQuestions = questions[gameSettings.category] || []

  const [questionIndex, setQuestionIndex] = useState(0)
  const [activePlayer, setActivePlayer] = useState(1)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')

  const [player1Time, setPlayer1Time] = useState(60)
  const [player2Time, setPlayer2Time] = useState(60)

  // Countdown timer
  useEffect(() => {
    if (categoryQuestions.length === 0) {
      return
    }

    const interval = setInterval(() => {
      if (activePlayer === 1) {
        setPlayer1Time((previousTime) => Math.max(0, previousTime - 1))
      } else {
        setPlayer2Time((previousTime) => Math.max(0, previousTime - 1))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [activePlayer, categoryQuestions.length])

  // Check whether a player has run out of time
  useEffect(() => {
    if (player1Time === 0) {
      onGameOver(gameSettings.player2)
    } else if (player2Time === 0) {
      onGameOver(gameSettings.player1)
    }
  }, [player1Time, player2Time, gameSettings, onGameOver])

  if (categoryQuestions.length === 0) {
    return (
      <main>
        <h1>No Questions Available</h1>
        <p>We haven't added questions for this category yet.</p>
        <button onClick={onBack}>Back to Setup</button>
      </main>
    )
  }

  const currentQuestion = categoryQuestions[questionIndex]

  function handleSubmit(event) {
    event.preventDefault()

    if (!userAnswer.trim()) {
      return
    }

    const correct = isCorrectAnswer(
      userAnswer,
      currentQuestion.acceptedAnswers
    )

    if (correct) {
      setFeedback('Correct!')
      setUserAnswer('')

      setQuestionIndex(
        (previousIndex) => (previousIndex + 1) % categoryQuestions.length
      )

      setActivePlayer(
        (previousPlayer) => previousPlayer === 1 ? 2 : 1
      )
    } else {
      setFeedback('Incorrect. Try again!')
    }
  }

  const playerName =
    activePlayer === 1 ? gameSettings.player1 : gameSettings.player2

  return (
    <main className="duel">
      <h1>Duel</h1>

      <div className="timers">
        <Timer
          playerName={gameSettings.player1}
          timeLeft={player1Time}
          isActive={activePlayer === 1}
        />

        <Timer
          playerName={gameSettings.player2}
          timeLeft={player2Time}
          isActive={activePlayer === 2}
        />
      </div>

      <h2>{playerName}'s Turn</h2>

      <QuestionCard question={currentQuestion} />

      <form onSubmit={handleSubmit} className="answer-form">
        <input
          type="text"
          value={userAnswer}
          onChange={(event) => setUserAnswer(event.target.value)}
          placeholder="Type your answer"
          aria-label="Your answer"
        />

        <button type="submit">Submit Answer</button>
      </form>

      <p aria-live="polite">{feedback}</p>

      <button onClick={onBack}>Back to Setup</button>
    </main>
  )
}

export default Duel
