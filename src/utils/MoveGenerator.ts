interface MoveObject {
  moves: Array<Array<number>>,
  attack: Array<Array<number>>
}

const MoveGenerator = (color:string, type:string, r:number, c:number, board:Array<Array<string|null>>): MoveObject => {
  const checkDiagonals = (r:number, c:number) => {
    const dotsLoc:Array<Array<number>> = []
    const attackLoc:Array<Array<number>> = []
    const rowsBelow:number = 8-r
    // checking rows below
    for (let i = 1; i < rowsBelow; i++) {
      if(r+i >=0 && c+i >= 0 && r+i < 8 && c+i < 8){
        const nr = r+i
        const nc = c+i
        const target = board[nr][nc]
        // if null add in dotsLoc
        if (target === null){
          dotsLoc.push([nr, nc])
        }
        // if piece with opposite color, then add in attack
        else if (target[0] !== color){
          attackLoc.push([nr, nc])
          break
        } 
        // if piece with same color, then break
        else {
          break
        }
      }
    }
    for (let i = 1; i < rowsBelow; i++) {
      if(r+i >=0 && c-i >= 0 && r+i < 8 && c-i < 8){
        const nr = r+i
        const nc = c-i
        const target = board[nr][nc]
        // if null add in dotsLoc
        if (target === null){
          dotsLoc.push([nr, nc])
        }
        // if piece with opposite color, then add in attack
        else if (target[0] !== color){
          attackLoc.push([nr, nc])
          break
        } 
        // if piece with same color, then break
        else {
          break
        }
      }
    }

    // checking rows above
    for (let i = 1; i <= r; i++) {
      if(r-i >=0 && c+i >= 0 && r-i < 8 && c+i < 8){
        const nr = r-i
        const nc = c+i
        const target = board[nr][nc]
        if (target === null){ // if null add in dotsLoc
          dotsLoc.push([nr, nc])
        } else if (target[0] !== color){ // if piece with opposite color, then add in attack
          attackLoc.push([nr, nc])
          break
        } else { // if piece with same color, then break
          break
        }
      }
    }
    for (let i = 1; i <= r; i++) {
      if(r-i >=0 && c-i >= 0 && r-i < 8 && c-i < 8){
        const nr = r-i
        const nc = c-i
        const target = board[nr][nc]
        // if null add in dotsLoc
        if (target === null){
          dotsLoc.push([nr, nc])
        }
        // if piece with opposite color, then add in attack
        else if (target[0] !== color){
          attackLoc.push([nr, nc])
          break
        } 
        // if piece with same color, then break
        else {
          break
        }
      }
    }
    return {moves: dotsLoc, attack: attackLoc}
  }
  
  const checkHorizontal = (r:number, c:number) => {
    const dotsLoc:Array<Array<number>> = []
    const attackLoc:Array<Array<number>> = []
    // checking right
    for (let i = 1; i < 8; i++) {
      if(r>=0 && c+i >= 0 && r < 8 && c+i < 8){
        const nr = r
        const nc = c+i
        const target = board[nr][nc]
        if (target === null){ // if null add in dotsLoc
          dotsLoc.push([nr, nc])
        } else if (target[0] !== color){ // if piece with opposite color, then add in attack
          attackLoc.push([nr, nc])
          break
        } else { // if piece with same color, then break
          break
        }
      }
    }
    // checking left
    for (let i = 1; i < 8; i++) {
      if(r>=0 && c-i >= 0 && r < 8 && c-i < 8){
        const nr = r
        const nc = c-i
        const target = board[nr][nc]
        if (target === null){ // if null add in dotsLoc
          dotsLoc.push([nr, nc])
        } else if (target[0] !== color){ // if piece with opposite color, then add in attack
          attackLoc.push([nr, nc])
          break
        } else { // if piece with same color, then break
          break
        }
      }
    }
    return {moves: dotsLoc, attack: attackLoc}
  }
  
  const checkVertical = (r:number, c:number) => {
    const dotsLoc:Array<Array<number>> = []
    const attackLoc:Array<Array<number>> = []
    // checking rows below
    for (let i = 1; i < 8; i++) {
      if(c>=0 && r+i >= 0 && c < 8 && r+i < 8){
        const nr = r+i
        const nc = c
        const target = board[nr][nc]
        if (target === null){ // if null add in dotsLoc
          dotsLoc.push([nr, nc])
        } else if (target[0] !== color){ // if piece with opposite color, then add in attack
          attackLoc.push([nr, nc])
          break
        } else { // if piece with same color, then break
          break
        }
    }
  }

    // checking rows above
    for (let i = 1; i < 8; i++) {
      if(c>=0 && r-i >= 0 && c < 8 && r-i < 8){
        const nr = r-i
        const nc = c
        const target = board[nr][nc]
        if (target === null){ // if null add in dotsLoc
          dotsLoc.push([nr, nc])
        } else if (target[0] !== color){ // if piece with opposite color, then add in attack
          attackLoc.push([nr, nc])
          break
        } else { // if piece with same color, then break
          break
        }
      }
    }
    return {moves: dotsLoc, attack: attackLoc}
  }

  const knightMoves = (r: number, c:number) => {
    const m:Array<Array<number>> = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]

    return m.reduce((res:MoveObject, mv:Array<number>) => {
      if(r+mv[0] >= 0 && c+mv[1] >= 0 && r+mv[0]<8 && c+mv[1]<8){
        const nr = r+mv[0]
        const nc = c+mv[1]
        const target = board[nr][nc]
        if (target === null){ // if null add in dotsLoc
          res.moves.push([nr, nc])
        } else if (target[0] !== color){ // if piece with opposite color, then add in attack
          res.attack.push([nr, nc])
        }
      }
      return res
    }, {moves: [], attack: []})
  }

  const kingMoves = (r: number, c:number) => {
    const m:Array<Array<number>> = [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]]

    return m.reduce((res:MoveObject, mv:Array<number>) => {
      if(r+mv[0] >= 0 && c+mv[1] >= 0 && r+mv[0]<8 && c+mv[1]<8){
        const nr = r+mv[0]
        const nc = c+mv[1]
        const target = board[nr][nc]
        if (target === null){ // if null add in dotsLoc
          res.moves.push([nr, nc])
        } else if (target[0] !== color){ // if piece with opposite color, then add in attack
          res.attack.push([nr, nc])
        }
      }
      return res
    }, {moves: [], attack: []})
  }

  const pawnMoves = (r: number, c:number) => {
    const tm:Array<Array<number>> = color === 'w' ? [[-2, 0], [-1, 0]] : [[2, 0], [1, 0]]
    const m:Array<Array<number>> = r === 1 || r === 6 ? tm.slice(0, 2) : tm.slice(1, 2)

    const moves = m.reduce((res:Array<Array<number>>, mv:Array<number>) => {
      if(r+mv[0] >= 0 && c+mv[1] >= 0 && r+mv[0]<8 && c+mv[1]<8){
        const nr = r+mv[0]
        const nc = c+mv[1]
        const target = board[nr][nc]
        if (target === null){ // if null add in dotsLoc
          res.push([nr, nc])
        }
      }
      return res
    }, [])

    const am:Array<Array<number>> = color === 'w' ? [[-1, 1], [-1, -1]] : [[1, 1], [1, -1]]

    const attack = am.reduce((res:Array<Array<number>>, mv:Array<number>) => {
      if(r+mv[0] >= 0 && c+mv[1] >= 0 && r+mv[0]<8 && c+mv[1]<8){
        const nr = r+mv[0]
        const nc = c+mv[1]
        const target = board[nr][nc]
        if (target && target[0] !== color){ // if null add in dotsLoc
          res.push([nr, nc])
        }
      }
      return res
    }, [])

    return {moves, attack}

  }

  switch (type) {
    case 'rook':{
      const moves = [...checkVertical(r, c).moves, ...checkHorizontal(r, c).moves]
      const attack = [...checkVertical(r, c).attack, ...checkHorizontal(r, c).attack]
      return {moves, attack}
    }
    case 'bishop':
      return checkDiagonals(r, c)
    case 'queen': {
      const moves = [...checkDiagonals(r, c).moves,  ...checkVertical(r, c).moves, ...checkHorizontal(r, c).moves]
      const attack = [...checkDiagonals(r, c).attack,  ...checkVertical(r, c).attack, ...checkHorizontal(r, c).attack]
      return {moves, attack}
    }
    case 'king':
      return kingMoves(r, c)
    case 'knight':
      return knightMoves(r, c)
    case 'pawn':
      return pawnMoves(r, c)
    default:
      return {moves: [[]], attack: [[]]}
  }
}

export {MoveGenerator}