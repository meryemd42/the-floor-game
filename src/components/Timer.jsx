function Timer({ playerName, timeLeft, isActive }) {
  return (
    <div className={`timer ${isActive ? 'active-timer' : ''}`}>
      <h3>{playerName}</h3>
      <p>{timeLeft}s</p>
    </div>
  )
}

export default Timer
