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
  display?: boolean
  type: string,
  r?: number,
  c?: number,
  handlePieceSelect?: (pieceInfo:Array<string|number>) => void,
  pieceSelect?: Array<string|number>,
  turn?: 1 | 0
}

const pieceList:{[type:string]: string} = {
  'br': br, 'bn': bn, 'bb': bb, 'bq': bq, 'bk': bk, 'bp': bp,
  'wr': wr, 'wn': wn, 'wb': wb, 'wq': wq, 'wk': wk, 'wp': wp
}

const TurnId: {[key: number]: string} = {
  0: 'w',
  1: 'b'
}

function Piece({display=false, type, r, c, pieceSelect, handlePieceSelect, turn}: PieceProps):ReactNode {
  const selected = !display && !!pieceSelect?.length &&  pieceSelect[1] === r && pieceSelect[2] === c

  const handleClick = () => {
    if (!display && handlePieceSelect && r !== undefined && c !== undefined && turn !== undefined && TurnId[turn] === type[0]){
      handlePieceSelect([type, r, c])
    }
  }

  // onClick={!display && handlePieceSelect && r && c ? () => handlePieceSelect([type, r, c]) : undefined}
  return (
    <span onClick={handleClick} className={`${selected ? 'bg-red-200 rounded-full' : ''}`}>
      <img src={pieceList[type]} alt={type} />
    </span>
  )
}

export default Piece