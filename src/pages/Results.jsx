import './Results.css'

function Results({ winner, onPlayAgain, onHome }) {
  return (
    <main className="results-page">
      <div className="results-content">

        <p className="results-brand">
          THE FLOOR GAME
        </p>

        <div className="results-trophy" aria-hidden="true">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 9H45V26C45 36 39 42 32 42
                 C25 42 19 36 19 26V9Z"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M19 14H9V20C9 29 14 33 22 33
                 M45 14H55V20C55 29 50 33 42 33"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M32 42V52M22 55H42M26 52H38"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="results-label">
          THE DUEL IS OVER
        </p>

        <h1 className="results-winner">
          {winner}
        </h1>

        <h2 className="results-wins">
          WINS!
        </h2>

        <div className="results-divider" />

        <p className="results-message">
          The floor belongs to you.
        </p>

        <div className="results-actions">
          <button
            type="button"
            className="results-rematch-button"
            onClick={onPlayAgain}
          >
            PLAY AGAIN
          </button>

          <button
            type="button"
            className="results-home-button"
            onClick={onHome}
          >
            BACK TO HOME
          </button>
        </div>

      </div>
    </main>
  )
}

export default Results

