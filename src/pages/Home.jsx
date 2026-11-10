import { useState } from 'react'
import './Home.css'

function Home({ onPlay }) {
  const [showInstructions, setShowInstructions] = useState(false)

  return (
    <main className="home-page">
      <button
        className="help-button"
        onClick={() => setShowInstructions(true)}
        aria-label="How to play"
        title="How to play"
      >
        ?
      </button>

      <div className="home-content">
        <h1 className="home-title">THE FLOOR GAME</h1>

        <button className="play-button" onClick={onPlay}>
          PLAY
        </button>
      </div>

      {showInstructions && (
        <div
          className="instructions-overlay"
          onClick={() => setShowInstructions(false)}
        >
          <section
            className="instructions-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="instructions-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setShowInstructions(false)}
              aria-label="Close instructions"
            >
              ×
            </button>

            <h2 id="instructions-title">How to Play</h2>

            <ol>
              <li>Enter two player names and choose a category.</li>
              <li>Identify the pictures by typing your answers.</li>
              <li>Correct answers switch turns.</li>
              <li>Passing reveals the answer while your timer runs for 3 seconds.</li>
              <li>The first player to run out of time loses.</li>
            </ol>
          </section>
        </div>
      )}
    </main>
  )
}

export default Home
