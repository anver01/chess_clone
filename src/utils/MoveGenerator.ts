
const MoveGenerator = (color:string, type:string, r:number, c:number, board:Array<Array<string|null>>): Array<Array<number>> => {
  const checkDiagonals = (r:number, c:number) => {
    const dotsLoc:Array<Array<number>> = []
    const rowsBelow:number = 8-r
    // checking rows below
    for (let i = 1; i < rowsBelow; i++) {
      if(r+i >=0 && c+i >= 0 && r+1 < 8 && c+i < 8 && board[r+i][c+i] === null){
        dotsLoc.push([r+i, c+i])
      } else {
        break
      }
    }
    for (let i = 1; i < rowsBelow; i++) {
      if(r+i >=0 && c-i >= 0 && r+1 < 8 && c-i < 8 && board[r+i][c-i] === null){
        dotsLoc.push([r+i, c-i])
      } else {
        break
      }
    }
    // checking rows above
    for (let i = 1; i < r; i++) {
      if(r-i >=0 && c+i >= 0 && r-1 < 8 && c+i < 8 && board[r-i][c+i] === null){
        dotsLoc.push([r-i, c+i])
      } else {
        break
      }
    }
    for (let i = 1; i < r; i++) {
      if(r-i >=0 && c-i >= 0 && r-1 < 8 && c-i < 8 && board[r-i][c-i] === null){
        dotsLoc.push([r-i, c-i])
      } else {
        break
      }
    }
    return dotsLoc
  }
  
  const checkHorizontal = (r:number, c:number) => {
    const dotsLoc:Array<Array<number>> = []
    // checking right
    for (let i = 1; i < 8; i++) {
      if(r>=0 && c+i >= 0 && r < 8 && c+i < 8 && board[r][c+i] === null){
        dotsLoc.push([r, c+i])
      } else {
        break
      }
    }
    // checking left
    for (let i = 1; i < 8; i++) {
      if(r>=0 && c-i >= 0 && r < 8 && c-i < 8 && board[r][c-i] === null){
        dotsLoc.push([r, c-i])
      } else {
        break
      }
    }
    return dotsLoc
  }
  
  const checkVertical = (r:number, c:number) => {
    const dotsLoc:Array<Array<number>> = []
    // checking rows below
    for (let i = 1; i < 8; i++) {
      if(c>=0 && r+i >= 0 && c < 8 && r+i < 8 && board[r+i][c] === null){
        dotsLoc.push([r+i, c])
      } else {
        break
      }
    }
    // checking rows above
    for (let i = 1; i < 8; i++) {
      if(c>=0 && r-i >= 0 && c < 8 && r-i < 8 && board[r-i][c] === null){
        dotsLoc.push([r-i, c])
      } else {
        break
      }
    }
    return dotsLoc
  }

  const knightMoves = (r: number, c:number) => {
    const m:Array<Array<number>> = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]
    return m.reduce((res:Array<Array<number>>, mv:Array<number>) => {
      if(r+mv[0] >= 0 && c+mv[1] >= 0 && r+mv[0]<8 && c+mv[1]<8 && board[r+mv[0]][c+mv[1]] === null){
        res.push([r+mv[0], c+mv[1]])
      }
      return res
    }, [])
  }

  const kingMoves = (r: number, c:number) => {
    const m:Array<Array<number>> = [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]]
    return m.reduce((res:Array<Array<number>>, mv:Array<number>) => {
      if(r+mv[0] >= 0 && c+mv[1] >= 0 && r+mv[0]<8 && c+mv[1]<8 && board[r+mv[0]][c+mv[1]] === null){
        res.push([r+mv[0], c+mv[1]])
      }
      return res
    }, [])
  }

  const pawnMoves = (r: number, c:number) => {
    const tm:Array<Array<number>> = color === 'w' ? [[-2, 0], [-1, 0]] : [[2, 0], [1, 0]]
    const m:Array<Array<number>> = r === 1 || r === 6 ? tm.slice(0, 2) : tm.slice(1, 2)

    return m.reduce((res:Array<Array<number>>, mv:Array<number>) => {
      if(r+mv[0] >= 0 && c+mv[1] >= 0 && r+mv[0]<8 && c+mv[1]<8 && board[r+mv[0]][c+mv[1]] === null){
        res.push([r+mv[0], c+mv[1]])
      }
      return res
    }, [])


  }

  switch (type) {
    case 'rook':
      return [...checkHorizontal(r, c), ...checkVertical(r, c)]
    case 'bishop':
      return checkDiagonals(r, c)
    case 'queen':
      return [...checkDiagonals(r, c),  ...checkVertical(r, c), ...checkHorizontal(r, c)]
    case 'king':
      return kingMoves(r, c)
    case 'knight':
      return knightMoves(r, c)
    case 'pawn':
      return pawnMoves(r, c)
    default:
      return [[]]
  }
}

export {MoveGenerator}