import { useState, ReactNode } from 'react'
import Board from './components/Board'

function App(): ReactNode {
  const [gameState, setGameState] = useState<number>(0)

  return (
    <div className='w-full m-auto p-8'>
      <h1 className='font-semibold text-6xl text-center'>Chess</h1>
      <Board gameState={gameState} setGameState={setGameState} />
      <p className='text-center mt-8'>I was able to implement basic game movements. I was also able to implement piece specific movement.</p>
    </div>
  )
}

export default App
