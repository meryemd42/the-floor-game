import { useState } from 'react'
import Home from './pages/Home.jsx'
import GameSetup from './pages/GameSetup.jsx'
import Duel from './pages/Duel.jsx'
import Results from './pages/Results.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [gameSettings, setGameSettings] = useState(null)
  const [winner, setWinner] = useState('')

  // Go to game setup
  function startSetup() {
    setCurrentPage('setup')
  }

  // Start a new duel
  function startDuel(settings) {
    setGameSettings(settings)
    setWinner('')
    setCurrentPage('duel')
  }

  // End the duel and show the winner
  function handleGameOver(winningPlayer) {
    setWinner(winningPlayer)
    setCurrentPage('results')
  }

  // Play again with the same players and category
  function handlePlayAgain() {
    setWinner('')
    setCurrentPage('duel')
  }

  // Return to the homepage
  function handleHome() {
    setWinner('')
    setGameSettings(null)
    setCurrentPage('home')
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
        <Duel
          gameSettings={gameSettings}
          onBack={() => setCurrentPage('setup')}
          onGameOver={handleGameOver}
        />
      )}

      {currentPage === 'results' && (
        <Results
          winner={winner}
          onPlayAgain={handlePlayAgain}
          onHome={handleHome}
        />
      )}
    </div>
  )
}

export default App
