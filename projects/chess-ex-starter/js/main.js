'use strict'

// Pieces Types
const PAWN_BLACK = '♟'
const ROOK_BLACK = '♜'
const KNIGHT_BLACK = '♞'
const BISHOP_BLACK = '♝'
const QUEEN_BLACK = '♛'
const KING_BLACK = '♚'

const PAWN_WHITE = '♙'
const ROOK_WHITE = '♖'
const KNIGHT_WHITE = '♘'
const BISHOP_WHITE = '♗'
const QUEEN_WHITE = '♕'
const KING_WHITE = '♔'

// The Chess Board
var gBoard
var gSelectedElCell = null

function restartGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    var board = []
    // TODO: build the board 8 * 8
    for(var i = 0; i < 8; i++){
        board[i] = []
        for(var j = 0; j < 8; j++){
            board[i][j] = ''
            if(i === 1) board[i][j] = PAWN_BLACK
            if(i === 6) board[i][j] = PAWN_WHITE
        }
    }
    board[0][0] = board[0][7] = ROOK_BLACK
    board[0][1] = board[0][6] = KNIGHT_BLACK
    board[0][2] = board[0][5] = BISHOP_BLACK
    board[0][3] = QUEEN_BLACK
    board[0][4] = KING_BLACK

    board[7][0] = board[7][7] = ROOK_WHITE
    board[7][1] = board[7][6] = KNIGHT_WHITE
    board[7][2] = board[7][5] = BISHOP_WHITE
    board[7][3] = QUEEN_WHITE
    board[7][4] = KING_WHITE

    console.table(board)
    return board
}

function renderBoard(board) {
    var strHtml = ''

    for (var i = 0; i < board.length; i++) {
        var row = board[i]
        strHtml += '<tr>\n'
        for (var j = 0; j < row.length; j++) {
            var cell = row[j]
            // TODO: figure class name
            var className = (i + j) % 2 ? 'black' : 'white'
            var tdId = `cell-${i}-${j}`
            strHtml += `\t<td id="${tdId}" onclick="cellClicked(this)" class="${className}">${cell}</td>\n`
        }
        strHtml += '</tr>\n'
    }
    // console.log(strHtml);
    var elMat = document.querySelector('.game-board')
    elMat.innerHTML = strHtml
}

function cellClicked(elCell) {

    // TODO: if the target is marked - move the piece!
    if(elCell.classList.contains('mark')){
        movePiece(gSelectedElCell, elCell)
        cleanBoard()
        return
    }
    cleanBoard()

    elCell.classList.add('selected')
    gSelectedElCell = elCell

    var cellCoord = getCellCoord(elCell.id)
    var piece = gBoard[cellCoord.i][cellCoord.j]
    
    var possibleCoords = []

    switch (piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord)
            break
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord)
            break
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            possibleCoords = getAllPossibleCoordsKnight(cellCoord)
            break
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE)
            break
        case QUEEN_BLACK:
        case QUEEN_WHITE:
            possibleCoords = getAllPossibleCoordsQueen(cellCoord)
            break
        case KING_BLACK:
        case KING_WHITE:
            possibleCoords = getAllPossibleCoordsKing(cellCoord)
            break
    }
    console.log('possibleCoords: ', possibleCoords)
    markCells(possibleCoords)
}

function movePiece(elFromCell, elToCell) {
    // TODO: use: getCellCoord to get the coords, move the piece
    // update the MODEl, update the DOM

    // Update the model:
    var coord = getCellCoord(elFromCell.id)
    var piece = gBoard[coord.i][coord.j]

    gBoard[coord.i][coord.j] = ''

    // Update the DOM:
    elFromCell.innerText = ''
    
    
    // Update the model:
    coord = getCellCoord(elToCell.id)
    gBoard[coord.i][coord.j] = piece
    
    // Update the DOM:
    elToCell.innerText = piece

}    

function markCells(coords) {
    // TODO: query select them one by one and add mark 
    for(var i = 0; i < coords.length; i++){
        var selector = getSelector(coords[i])
        var elCell = document.querySelector(selector)
        elCell.classList.add('mark')
    }
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var coord = {}
    var parts = strCellId.split('-')

    coord.i = +parts[1]
    coord.j = +parts[2]
    return coord;
}

function cleanBoard() {
    var elTds = document.querySelectorAll('.mark, .selected')

    for (var i = 0; i < elTds.length; i++) {
        elTds[i].classList.remove('mark', 'selected')
    }
}

function getSelector(coord) {
    return `#cell-${coord.i}-${coord.j}`
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === ''
}

function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = []
    
    var diff = isWhite ? -1 : 1
    var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j } 
    
    if(!isEmptyCell(nextCoord)) return res
    res.push(nextCoord)
    
    if(pieceCoord.i === 1 && !isWhite || pieceCoord.i === 6 && isWhite){
        nextCoord = { i: pieceCoord.i + diff * 2, j: pieceCoord.j } 
        if(!isEmptyCell(nextCoord)) return res
        res.push(nextCoord)
    }
    return res
}

function getAllPossibleCoordsRook(pieceCoord) {
    var res = []
    for (var j = 0; j < 4; j++){
        for (var i = 1; i < 8; i++){
            if (j === 0 && pieceCoord.i + i < 8){
                var nextCoord = {i:pieceCoord.i + i,j: pieceCoord.j} 
                if (isEmptyCell(nextCoord)){
                    res.push(nextCoord)
                } else break
            }
            if (j === 1 && pieceCoord.j + i < 8){
                nextCoord  = {i: pieceCoord.i, j: pieceCoord.j + i}
                if (isEmptyCell(nextCoord)){
                    res.push(nextCoord)
                } else break
            }
            if (j === 2 && pieceCoord.i - i >= 0){
                nextCoord = {i: pieceCoord.i - i,j: pieceCoord.j} 
                if (isEmptyCell(nextCoord)){
                    res.push(nextCoord)
                } else break
            }
            if (j === 3 && pieceCoord.j - i >= 0){
                nextCoord  = {i: pieceCoord.i, j: pieceCoord.j - i}
                if (isEmptyCell(nextCoord)){
                    res.push(nextCoord)
                } else break
            }
        }
    }
    return res
}

function getAllPossibleCoordsBishop(pieceCoord) {
    var res = []
    var i = pieceCoord.i - 1
    for (var idx = pieceCoord.j + 1; i >= 0 && idx < 8; idx++) {
        const coord = { i: i--, j: idx }
        if (!isEmptyCell(coord)) break
        res.push(coord)
    }
    // TODO: handle The 3 other directions of the Bishop
    var i = pieceCoord.i + 1
    for (var idx = pieceCoord.j + 1; i < 8 && idx < 8; idx++) {
        const coord = { i: i++, j: idx }
        if (!isEmptyCell(coord)) break
        res.push(coord)
    }
    var j = pieceCoord.j - 1
    for (var idx = pieceCoord.i - 1; j >= 0 && idx >=0; idx--) {
        const coord = { i: idx, j: j-- }
        if (!isEmptyCell(coord)) break
        res.push(coord)
    }
    var j = pieceCoord.j - 1
    for (var idx = pieceCoord.i + 1; j >= 0 && idx < 8; idx++) {
        const coord = { i: idx, j: j-- }
        if (!isEmptyCell(coord)) break
        res.push(coord)
    }
    return res
}

function getAllPossibleCoordsKnight(pieceCoord) {
    
    return res
}

function getAllPossibleCoordsQueen(pieceCoord) {
    var res = []
    res = getAllPossibleCoordsRook(pieceCoord)
    res = res.concat(getAllPossibleCoordsBishop(pieceCoord))
    return res
}

function getAllPossibleCoordsKing(pieceCoord){
    var res = []
    for (var i = -1; i <= 1; i++){
        for (var j = -1; j <= 1; j++){
            if (i === 0 && j === 0) continue
            var idx = pieceCoord.i + i
            var jdx = pieceCoord.j + j
            if (idx < 0 || jdx < 0 || idx > 7 || jdx > 7) continue
            if (isEmptyCell({i: idx,j: jdx})){
                res.push({i: idx,j: jdx})
            }
        }
    }
    return res
}


