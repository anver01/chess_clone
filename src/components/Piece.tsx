import {ReactNode} from 'react'
import br from '../assets/pieces/br.svg'
import bn from '../assets/pieces/bn.svg'
import bb from '../assets/pieces/bb.svg'
import bq from '../assets/pieces/bq.svg'
import bk from '../assets/pieces/bk.svg'
import bp from '../assets/pieces/bp.svg'
import wp from '../assets/pieces/wp.svg'
import wr from '../assets/pieces/wr.svg'
import wn from '../assets/pieces/wn.svg'
import wq from '../assets/pieces/wq.svg'
import wk from '../assets/pieces/wk.svg'
import wb from '../assets/pieces/wb.svg'

interface PieceProps {
  type: string,
  r: number,
  c: number,
  handlePieceSelect: (pieceInfo:Array<string|number>) => void,
  pieceSelect: Array<string|number>
}

const pieceList:{[type:string]: string} = {
  'br': br, 'bn': bn, 'bb': bb, 'bq': bq, 'bk': bk, 'bp': bp,
  'wr': wr, 'wn': wn, 'wb': wb, 'wq': wq, 'wk': wk, 'wp': wp
}

function Piece({type, r, c, pieceSelect, handlePieceSelect}: PieceProps):ReactNode {
  const selected = pieceSelect[1] === r && pieceSelect[2] === c

  return (
    <span onClick={() => handlePieceSelect([type, r, c])} className={`${selected ? 'bg-red-200 rounded-full' : ''}`}>
      <img src={pieceList[type]} alt={type} />
    </span>
  )
}

export default Piece