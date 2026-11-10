import { useEffect, useRef, useState } from 'react'
import QuestionCard from '../components/QuestionCard.jsx'
import Timer from '../components/Timer.jsx'
import { questions } from '../data/questions.js'
import { isCorrectAnswer } from '../utils/answerValidation.js'
import './Duel.css'

function Duel({ gameSettings, onBack, onGameOver }) {
  const categoryQuestions = questions[gameSettings.category] || []

  const [questionIndex, setQuestionIndex] = useState(0)
  const [activePlayer, setActivePlayer] = useState(1)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')

  const [player1Time, setPlayer1Time] = useState(5)
  const [player2Time, setPlayer2Time] = useState(5)

  const [isRevealing, setIsRevealing] = useState(false)
  const revealTimeout = useRef(null)
  const revealLocked = useRef(false)

  // Countdown for the active player
  useEffect(() => {
    if (categoryQuestions.length === 0 || isRevealing) {
      return
    }

    const interval = setInterval(() => {
      if (activePlayer === 1) {
        setPlayer1Time((time) => Math.max(0, time - 1))
      } else {
        setPlayer2Time((time) => Math.max(0, time - 1))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [activePlayer, isRevealing, categoryQuestions.length])

  // End game when either player's time reaches zero
  useEffect(() => {
    if (player1Time === 0) {
      onGameOver(gameSettings.player2)
    } else if (player2Time === 0) {
      onGameOver(gameSettings.player1)
    }
  }, [player1Time, player2Time, gameSettings, onGameOver])

  // Clean up the reveal timeout when leaving the duel
  useEffect(() => {
    return () => clearTimeout(revealTimeout.current)
  }, [])

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

  function nextQuestion() {
    setQuestionIndex(
      (index) => (index + 1) % categoryQuestions.length
    )
    setUserAnswer('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (isRevealing || !userAnswer.trim()) {
      return
    }

    const correct = isCorrectAnswer(
      userAnswer,
      currentQuestion.acceptedAnswers
    )

    if (correct) {
      setFeedback('')
      nextQuestion()

      // Correct answers switch players
      setActivePlayer((player) => player === 1 ? 2 : 1)
    } else {
      setFeedback('Incorrect. Try again!')
    }
  }


    function handlePass() {
    if (revealLocked.current || isRevealing) {
        return
    }

    revealLocked.current = true

    const currentTime =
        activePlayer === 1 ? player1Time : player2Time

    // If the player has 3 seconds or less,
    // passing immediately ends their game.
    if (currentTime <= 3) {
        if (activePlayer === 1) {
        setPlayer1Time(0)
        } else {
        setPlayer2Time(0)
        }
        return
    }

    // Freeze the timer and reveal the answer
    setIsRevealing(true)
    setFeedback(currentQuestion.answer)

    // Wait 3 seconds before applying the penalty
    revealTimeout.current = setTimeout(() => {
        if (activePlayer === 1) {
        setPlayer1Time((time) => Math.max(0, time - 3))
        } else {
        setPlayer2Time((time) => Math.max(0, time - 3))
        }

        nextQuestion()
        setFeedback('')
        setIsRevealing(false)
        revealLocked.current = false
    }, 3000)
    }


  const playerName =
    activePlayer === 1
      ? gameSettings.player1
      : gameSettings.player2

  
return (
  <main className="duel-page">

    {/* BACK BUTTON */}
    <button
      type="button"
      className="duel-back-button"
      onClick={onBack}
    >
      ← Back
    </button>

    {/* TOP SECTION */}
    <header className="duel-header">

      <div className={`duel-player player-one-panel ${
        activePlayer === 1 ? 'current-player' : ''
      }`}>
        <Timer
          playerName={gameSettings.player1}
          timeLeft={player1Time}
          isActive={activePlayer === 1}
        />
      </div>

      <div className="duel-heading">
        <p>THE FLOOR GAME</p>
        <h1>{gameSettings.category.toUpperCase()}</h1>
        <span>{playerName}'s Turn</span>
      </div>

      <div className={`duel-player player-two-panel ${
        activePlayer === 2 ? 'current-player' : ''
      }`}>
        <Timer
          playerName={gameSettings.player2}
          timeLeft={player2Time}
          isActive={activePlayer === 2}
        />
      </div>

    </header>

    {/* MAIN QUESTION */}
    <section className="duel-question-area">
      <QuestionCard question={currentQuestion} />

      <div
        className={`duel-feedback ${isRevealing ? 'revealing' : ''}`}
        aria-live="polite"
        >
        {feedback}
        </div>
    </section>

    {/* ANSWER CONTROLS */}
    <div className="duel-controls">

      <form
        onSubmit={handleSubmit}
        className="duel-answer-form"
      >
        <input
          type="text"
          value={userAnswer}
          onChange={(event) =>
            setUserAnswer(event.target.value)
          }
          placeholder="Type your answer..."
          aria-label="Your answer"
          disabled={isRevealing}
          autoComplete="off"
        />

        <button
          type="submit"
          className="duel-submit-button"
          disabled={isRevealing}
        >
          ENTER
        </button>
      </form>

      <button
        type="button"
        onClick={handlePass}
        disabled={isRevealing}
        className="duel-pass-button"
      >
        PASS (-3s)
      </button>

    </div>

  </main>
)

}

export default Duel
