import {ReactNode, useEffect, useState} from 'react';
import Piece from './Piece';
import placeAudio from '../assets/piece_place.mp3'
import {MoveGenerator} from '../utils/MoveGenerator'

interface BoardProps {
  turn: 0 | 1,
  setTurn: (stateUpdater: (prev: 0|1) => 0|1) => void,
  gameState: number,
  setGameState: (stateUpdater: (prev: number) => number) => void,
  setCurrentGame: (stateUpdater: (prev: {white: Array<string>, black: Array<string>}) => {white: Array<string>, black: Array<string>}) => void
}

function Board({turn, setTurn, gameState, setGameState, setCurrentGame}:BoardProps): ReactNode {
  const initialAttackState = Array(8).fill(false).map(() => Array(8).fill(false))

  const [boardState, setBoardState] = useState<Array<Array<string|null>>>(Array(8).fill(null).map(() => Array(8).fill(null)))
  const [attackState, setAttackState] = useState<Array<Array<boolean>>>(initialAttackState)
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

  const PieceTypeId:{[key:string]: string} = {
    'p': 'pawn',
    'r': 'rook',
    'n': 'knight',
    'b': 'bishop',
    'q': 'queen',
    'k': 'king'
  }

  useEffect(() => {
    if(pieceSelect.length){
      const pt:string = pieceSelect[0] as string
      const prow:number = pieceSelect[1] as number
      const pcol:number = pieceSelect[2] as number
      const {moves, attack} = MoveGenerator(pt[0], PieceTypeId[pt[1]], prow, pcol, boardState)
      if(attack.length) {
        setAttackState(prev => {
          const temp = [...prev]
          attack.forEach(ele => {
            temp[ele[0]][ele[1]] = true
          })
          return temp
        })
      }
      const dots:Array<Array<number>> = []
      setBoardState(prev => {
        const temp = [...prev]
        moves.forEach((move:Array<number>) => {
          const [nr, nc] = move
          const temp = [...prev]
          temp[nr][nc] = 'dot'
          dots.push([nr, nc])
          return temp
        });
        return temp
      })
      setDotLocs(dots)
      // checkAttack(pt[0], PieceTypeId[pt[1]], prow, pcol)
      if(gameState === 0 ) setGameState((prev:number) => prev+1)
    }
  }, [pieceSelect])

  const handlePieceMove = (nr:number, nc:number) => {
    if(pieceSelect.length){
      const temp = JSON.parse(JSON.stringify(boardState))
      const piece:string = pieceSelect[0] as string
      const or:number = pieceSelect[1] as number
      const oc:number = pieceSelect[2] as number
      const pp = JSON.parse(JSON.stringify(temp[or][oc]));
      if (temp[nr][nc] !== null && temp[nr][nc] !== 'dot'){
        const color = piece[0] === 'w' ? 'white' : 'black'
        setCurrentGame(prev => ({
          ...prev,
          [color]: [...prev[color], temp[nr][nc]]
        }))
      }
      temp[nr][nc] = pp
      temp[or][oc] = null
      setBoardState(temp)
      removeDotsAndPieceSelect()
      setTurn(prev => 1-prev as 0|1)
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
    setAttackState(initialAttackState)
  }

  const handlePieceSelect = (pieceInfo:Array<string|number>) => {
    if(!pieceSelect.length){
      setPieceSelect(pieceInfo)
    } else {
      removeDotsAndPieceSelect()
    }
  }


  return (
    <div className="w-max my-10 mx-auto">
      <div className="flex flex-col">
        {boardState.map((row, rkey) => {
          return (
            <div key={rkey} className="flex">
              {row.map((col,ckey) => (
                <div key={ckey} className={`relative h-12 w-12 border border-black border-solid grid place-items-center p-1 ${(rkey + ckey) % 2 === 1 ? 'bg-green-700' : 'bg-white'}`}
                  onClick={() => {
                    if(col === 'dot' || attackState[rkey][ckey]){
                      handlePieceMove(rkey, ckey)
                    } else if (col === null) removeDotsAndPieceSelect()
                  }}
                >
                  {col && col==='dot' && (
                    <div className='h-3 w-3 rounded-full bg-black opacity-30' />
                  )}
                  {col && col!=='dot' && <Piece type={col} r={rkey} c={ckey} pieceSelect={pieceSelect} handlePieceSelect={handlePieceSelect} turn={turn} />}
                  {attackState[rkey][ckey] && (<span className='absolute bg-red-700 h-full w-full opacity-50' />)}
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