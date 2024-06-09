import { useState, ReactNode } from 'react'
import Board from './components/Board'
import Piece from './components/Piece'

function App(): ReactNode {
  const [gameState, setGameState] = useState<number>(0)
  interface GameProps {
    white: Array<string>
    black: Array<string>
  }

  const [currentGame, setCurrentGame] = useState<GameProps>({'white': [], 'black': []})

  const [turn, setTurn] = useState<0|1>(0)

  const TurnId: {[key: number]: string} = {
    0: 'White',
    1: 'Black'
  }

  return (
    <div className='w-full m-auto p-8'>
      <h1 className='font-semibold text-6xl text-center'>Chess</h1>
      <h2 className='text-center text-2xl mt-6'>{TurnId[turn]}'s Turn</h2>
      <div className='grid grid-cols-3'>
        <div></div>
        <Board gameState={gameState} turn={turn} setTurn={setTurn} setGameState={setGameState} setCurrentGame={setCurrentGame} />
        <div className='grid grid-row-2 py-12'>
          <div className='w-72'>
            <div className='grid grid-flow-row grid-cols-8'>
              {currentGame.white.map((ele, i) => (
                <Piece key={i} display={true} type={ele} />
              ))}
            </div>
          </div>
          <div className='w-72 self-end'>
            <div className='grid grid-flow-row grid-cols-8'>
              {currentGame.black.map((ele, i) => (
                <Piece key={i} display={true} type={ele} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className='text-center mt-8'>I was able to implement basic game movements. I was also able to implement piece specific movement. Click on a piece to select it and move.</p>
    </div>
  )
}

export default App
