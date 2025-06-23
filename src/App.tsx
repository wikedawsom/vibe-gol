import { useState } from 'react'
import './App.css'
import { GameBoard } from './components/GameBoard'
import { Controls } from './components/Controls'

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    // GameBoard component will reset its state when key changes
    setKey(prev => prev + 1);
  };
  const handleSpeedChange = (newSpeed: number) => setSpeed(newSpeed);
  
  const [key, setKey] = useState(0);

  return (
    <div className="app">
      <h1>Conway's Game of Life</h1>
      <Controls
        isRunning={isRunning}
        speed={speed}
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
        onSpeedChange={handleSpeedChange}
      />
      <GameBoard
        key={key}
        isRunning={isRunning}
        speed={speed}
      />
      <div className="instructions">
        <h3>Instructions:</h3>
        <p>1. Click cells to toggle them between alive (black) and dead (white) when stopped</p>
        <p>2. Press Start to begin the simulation</p>
        <p>3. Use the slider to adjust the simulation speed</p>
        <p>4. Press Reset to clear the board</p>
      </div>
    </div>
  )
}

export default App
