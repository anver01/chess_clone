import {ReactNode} from 'react'

interface PieceProps {
  src: string,
  r: number,
  c: number,
  handlePieceSelect: (pieceInfo:Array<string|number>) => void,
  pieceSelect: Array<string|number>
}

function Piece({src, r, c, pieceSelect, handlePieceSelect}: PieceProps):ReactNode {
  const srcSplit = src.split('/')
  const pieceType = srcSplit[srcSplit.length-1].split('.')[0]
  const selected = pieceSelect[1] === r && pieceSelect[2] === c

  return (
    <span onClick={() => handlePieceSelect([pieceType, r, c])} className={`${selected ? 'bg-red-200' : ''}`}>
      <img src={src} />
    </span>
  )
}

export default Piece