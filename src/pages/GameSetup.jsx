import { useState } from 'react'
import { questions } from '../data/questions.js'
import './GameSetup.css'

const categories = [
  { id: 'animals', name: 'Animals', icon: '🐾' },
  { id: 'flags', name: 'Flags', icon: '🏳️' },
  { id: 'food', name: 'Food', icon: '🍕' },
  { id: 'places', name: 'Places', icon: '🌎' },
  { id: 'movies', name: 'Movies', icon: '🎬' },
  { id: 'music', name: 'Music', icon: '🎵' }
]

function GameSetup({ onStart, onBack }) {
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')
  const [category, setCategory] = useState('animals')

  const selectedCategory = categories.find(
    (item) => item.id === category
  )

  const canStart =
    player1.trim().length > 0 &&
    player2.trim().length > 0 &&
    (questions[category]?.length ?? 0) > 0

  function handleSubmit(event) {
    event.preventDefault()

    if (!canStart) return

    onStart({
      player1: player1.trim(),
      player2: player2.trim(),
      category
    })
  }

  return (
    <main className="setup-page">
      <header className="setup-header">
        <div>
          <p className="setup-eyebrow">THE FLOOR GAME</p>
          <h1>Game Setup</h1>
          <p className="setup-subtitle">
            Choose your category. Enter your names. Let the duel begin.
          </p>
        </div>

        <button
          type="button"
          className="setup-back-button"
          onClick={onBack}
        >
          ← Back
        </button>
      </header>

      <form className="setup-layout" onSubmit={handleSubmit}>
        <section className="setup-panel setup-categories">
          <div className="setup-panel-heading">
            <span className="setup-step">01</span>
            <div>
              <h2>Choose a Category</h2>
              <p>Pick your challenge.</p>
            </div>
          </div>

          <div className="category-grid">
            {categories.map((item) => {
              const available =
                (questions[item.id]?.length ?? 0) > 0

              const selected = category === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`category-tile ${
                    selected ? 'selected' : ''
                  }`}
                  onClick={() => setCategory(item.id)}
                  disabled={!available}
                  aria-pressed={selected}
                >
                  <span className="category-icon">
                    {item.icon}
                  </span>

                  <span className="category-name">
                    {item.name}
                  </span>

                  {!available && (
                    <span className="category-status">
                      Coming soon
                    </span>
                  )}

                  {selected && (
                    <span className="category-check">✓</span>
                  )}
                </button>
              )
            })}
          </div>

          <p className="category-hint">
            More categories will be added as we expand the game.
          </p>
        </section>

        <section className="setup-panel setup-players">
          <div className="setup-panel-heading">
            <span className="setup-step">02</span>
            <div>
              <h2>Meet the Players</h2>
              <p>Who's stepping onto the floor?</p>
            </div>
          </div>

          <div className="player-fields">
            <div className="player-field">
              <label htmlFor="player1">
                <span className="player-indicator player-one" />
                PLAYER 1
              </label>

              <input
                id="player1"
                type="text"
                placeholder="Enter first player's name"
                value={player1}
                onChange={(event) =>
                  setPlayer1(event.target.value)
                }
                maxLength={20}
                required
              />
            </div>

            <div className="versus-label">VS</div>

            <div className="player-field">
              <label htmlFor="player2">
                <span className="player-indicator player-two" />
                PLAYER 2
              </label>

              <input
                id="player2"
                type="text"
                placeholder="Enter second player's name"
                value={player2}
                onChange={(event) =>
                  setPlayer2(event.target.value)
                }
                maxLength={20}
                required
              />
            </div>
          </div>

          <div className="setup-summary">
            <span>SELECTED CATEGORY</span>
            <strong>
              {selectedCategory?.icon} {selectedCategory?.name}
            </strong>
          </div>

          <button
            type="submit"
            className="setup-start-button"
            disabled={!canStart}
          >
            START DUEL →
          </button>

          <p className="setup-footer-note">
            Both players start with 60 seconds.
          </p>
        </section>
      </form>
    </main>
  )
}

export default GameSetup
