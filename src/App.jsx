
import { useState } from 'react'
import Home from './pages/Home.jsx'
import GameSetup from './pages/GameSetup.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [gameSettings, setGameSettings] = useState(null)

  function startSetup() {
    setCurrentPage('setup')
  }

  function startDuel(settings) {
    setGameSettings(settings)
    setCurrentPage('duel')
  }

  return (
    <div className="app">
      {currentPage === 'home' && (
        <Home onPlay={startSetup} />
      )}

      {currentPage === 'setup' && (
        <GameSetup
          onStart={startDuel}
          onBack={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'duel' && gameSettings && (
        <div>
          <h1>Duel Screen</h1>

          <p>
            {gameSettings.player1} vs {gameSettings.player2}
          </p>

          <p>Category: {gameSettings.category}</p>

          <p>The game will be implemented next!</p>

          <button onClick={() => setCurrentPage('setup')}>
            Back to Setup
          </button>
        </div>
      )}
    </div>
  )
}

export default App

