import { useState } from 'react'
import Home from './pages/Home.jsx'
import GameSetup from './pages/GameSetup.jsx'
import './App.css'
import Duel from './pages/Duel.jsx'

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
        <Duel
          gameSettings={gameSettings}
          onBack={() => setCurrentPage('setup')}
        />
      )}
    </div>
  )
}

export default App

