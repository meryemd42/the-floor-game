function Home({ onPlay }) {
  return (
    <main className="home">
      <h1>The Floor Game</h1>

      <p>
        A two-player trivia challenge.
        Test your knowledge and race against the clock!
      </p>

      <button onClick={onPlay}>
        Play Game
      </button>

      <section className="instructions">
        <h2>How to Play</h2>

        <ol>
          <li>Enter two player names and choose a category.</li>
          <li>Identify pictures by typing your answers.</li>
          <li>Correct answers switch turns.</li>
          <li>Passing costs 3 seconds and reveals the answer.</li>
          <li>The player whose timer reaches zero loses.</li>
        </ol>
      </section>
    </main>
  )
}

export default Home
