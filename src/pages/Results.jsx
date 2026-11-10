function Results({ winner, onRematch, onHome }) {
  return (
    <main className="results">
      <h1>Game Over!</h1>

      <h2>{winner} Wins!</h2>

      <button onClick={onRematch}>
        Play Again
      </button>

      <button onClick={onHome}>
        Back to Home
      </button>
    </main>
  )
}

export default Results
