import {ReactNode, useEffect, useState} from 'react';
import Piece from './Piece';
import placeAudio from '../assets/piece_place.mp3'

interface MoveListProps {
  [key:string]: Array<Array<number>>
}

const moveList:MoveListProps = {
  'wp': [[-2, 0], [-1, 0]],
  'wr': [[1, 0], [0, 1], [-1, 0], [0, -1]],
  'wn': [[2, 1], [2, -1], [-2, 1], [-2, -1]],
  'wb': [[1, 1], [1, -1], [-1, 1], [-1, -1]],
  'wq': [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]],
  'wk': [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]],
  'bp': [[2, 0], [1, 0]],
  'br': [[1, 0], [0, 1], [-1, 0], [0, -1]],
  'bn': [[2, 1], [2, -1], [-2, 1], [-2, -1]],
  'bb': [[1, 1], [1, -1], [-1, 1], [-1, -1]],
  'bq': [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]],
  'bk': [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]]
}
interface BoardProps {
  gameState: number,
  setGameState: (stateUpdater: (prev: number) => number) => void
}

function Board({gameState, setGameState}:BoardProps): ReactNode {
  const [boardState, setBoardState] = useState<Array<Array<string|null>>>(Array(8).fill(null).map(() => Array(8).fill(null)))
  const [pieceSelect, setPieceSelect] = useState<Array<string|number>>([])
  const [dotLocs, setDotLocs] = useState<Array<Array<number>>>([])

  const initialBoardState = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
  ]

  useEffect(() => {
    setBoardState(initialBoardState)
  }, [])

  useEffect(() => {
    if(pieceSelect.length){
      const pt:string = pieceSelect[0] as string
      const prow:number = pieceSelect[1] as number
      const pcol:number = pieceSelect[2] as number
      const moves:Array<Array<number>> = moveList[pt]
      const dots:Array<Array<number>> = []
      setBoardState(prev => {
        const temp = [...prev]
        moves.forEach((move:Array<number>) => {
          const [nr, nc] = move
          if(nr === -2 && nc === 0 && !(prow===1 || prow === 6)){
            return
          }
          if(prow+nr < 8 && pcol+nc < 8 && temp[prow+nr][pcol+nc] === null){
            temp[prow+nr][pcol+nc] = 'dot'
            dots.push([prow+nr, pcol+nc])
          } else {
            return temp
          }
        });
        return temp
      })
      setDotLocs(dots)
      if(gameState === 0 ) setGameState((prev:number) => prev+1)
    }
  }, [pieceSelect])

  const handlePieceMove = (nr:number, nc:number) => {
    if(pieceSelect.length){
      const temp = JSON.parse(JSON.stringify(boardState))
      const or = pieceSelect[1]
      const oc = pieceSelect[2]
      const pp = JSON.parse(JSON.stringify(temp[or][oc]));
      temp[nr][nc] = pp
      temp[or][oc] = null
      setBoardState(temp)
      removeDotsAndPieceSelect()
      new Audio(placeAudio).play()
    }

  }

  const removeDotsAndPieceSelect = () => {
    if(pieceSelect.length && dotLocs.length){
      setBoardState(prev => {
        const temp = [...prev]
        dotLocs.forEach(dl => {
          const [dr, dc] = dl
          if(temp[dr][dc] === 'dot'){
            temp[dr][dc] = null
          }
        });
        return temp
      })
    }
    setPieceSelect([])
  }

  const handlePieceSelect = (pieceInfo:Array<string|number>) => {
    if(!pieceSelect.length){
      setPieceSelect(pieceInfo)
    } else {
      removeDotsAndPieceSelect()
    }
  }


  return (
    <div className="w-max mt-10 mx-auto">
      <div className="flex flex-col">
        {boardState.map((row, rkey) => {
          return (
            <div key={rkey} className="flex">
              {row.map((col,ckey) => (
                <div key={ckey} className={`h-12 w-12 border border-black border-solid grid place-items-center p-1 ${(rkey + ckey) % 2 === 1 ? 'bg-green-700' : 'bg-white'}`}
                  onClick={() => {
                    if(col === 'dot'){
                      handlePieceMove(rkey, ckey)
                    } else if (col === null) removeDotsAndPieceSelect()
                  }}
                >
                  {col && col==='dot' && (
                    <div className='h-3 w-3 rounded-full bg-black opacity-30' />
                  )}
                  {col && col!=='dot' && <Piece type={col} r={rkey} c={ckey} pieceSelect={pieceSelect} handlePieceSelect={handlePieceSelect} />}
                </div>
              ))}
            </div>
          ) 
        })}
      </div>
    </div>
  )
}

export default Board