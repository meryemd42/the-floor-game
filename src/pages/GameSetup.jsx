import { useState } from 'react'

function GameSetup({ onStart, onBack }) {
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')
  const [category, setCategory] = useState('animals')

  function handleSubmit(event) {
    event.preventDefault()

    if (!player1.trim() || !player2.trim()) {
      alert('Please enter both player names.')
      return
    }

    onStart({
      player1: player1.trim(),
      player2: player2.trim(),
      category
    })
  }

  return (
    <main className="game-setup">
      <h1>Game Setup</h1>
      <p>Enter your names and choose a category.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="player1">Player 1</label>
        <input
          id="player1"
          type="text"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          placeholder="Enter Player 1's name"
          maxLength={20}
          required
        />

        <label htmlFor="player2">Player 2</label>
        <input
          id="player2"
          type="text"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          placeholder="Enter Player 2's name"
          maxLength={20}
          required
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="animals">Animals</option>
          <option value="flags">Flags</option>
          <option value="food">Food</option>
        </select>

        <button type="submit">Start Duel</button>
      </form>

      <button type="button" onClick={onBack}>
        Back to Home
      </button>
    </main>
  )
}

export default GameSetup
