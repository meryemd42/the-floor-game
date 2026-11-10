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

  function startSetup() {
    setCurrentPage('setup')
  }

  function startDuel(settings) {
    setGameSettings(settings)
    setWinner('')
    setCurrentPage('duel')
  }

  function handleGameOver(winningPlayer) {
    setWinner(winningPlayer)
    setCurrentPage('results')
  }

  function handleRematch() {
    setWinner('')
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
        <Duel
          gameSettings={gameSettings}
          onBack={() => setCurrentPage('setup')}
          onGameOver={handleGameOver}
        />
      )}

      {currentPage === 'results' && (
        <Results
          winner={winner}
          onRematch={handleRematch}
          onHome={() => setCurrentPage('home')}
        />
      )}
    </div>
  )
}

export default App
