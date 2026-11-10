import { useState } from 'react'
import Home from './pages/Home'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  function startGame() {
    setCurrentPage('setup')
  }

  return (
    <div className="app">
      {currentPage === 'home' && (
        <Home onPlay={startGame} />
      )}

      {currentPage === 'setup' && (
        <div>
          <h1>Game Setup</h1>
          <p>This page is coming next!</p>

          <button onClick={() => setCurrentPage('home')}>
            Back to Home
          </button>
        </div>
      )}
    </div>
  )
}

export default App
