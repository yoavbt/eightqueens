var Game = {};

Game.initialize = function (number) {
    Game.board = [];
    Game.queensLeft = number;
    for (var i = 0; i < number; i++) {
        Game.board[i] = []
        for (var j = 0; j < number; j++) {
            Game.board[i][j] = 0;
        }
    }
}

Game.updateCell = function (i, j) {
    var res = Game.isBoardLegal(i, j);
    if (res && Game.board[i][j] === 0) {
        Game.board[i][j] = 1;
        return true;
    }
    else if (Game.board[i][j] === 1) {
        Game.board[i][j] = 0;
        return true;
    }
    else {
        return false;
    }
}

Game.isBoardLegal = function (yis, xis) {
    let diagonal = Game.checkDiagonal(yis, xis);
    //check horizontal
    let horizontal = Game.checkHorizontal(yis, xis);
    //check vertical
    let vertical = Game.checkVertical(yis, xis);
    if (!diagonal || !horizontal || !vertical){
        return false;
    }
    return true;
   
}

Game.checkVertical = function(yis , xis){
    for (let i = 0; i < Game.board.length; i++) {
        if (i === yis) {
            continue;
        }
        else {
            if (Game.board[i][xis] === 1) {
                return false;
            }
        }
    }
    return true;
}

Game.checkHorizontal = function (yis, xis){
    for (let i = 0; i < Game.board.length; i++) {
        if (i === xis) {
            continue;
        }
        else {
            if (Game.board[yis][i] === 1) {
                return false;
            }
        }
    }
    return true;
}


Game.checkDiagonal = function (yis, xis) {
    //check diagonal
    let leftToRightDiagonal = true;
    let tempy = yis - 1;
    let tempx = xis - 1;
    while (tempy >= 0 && tempx >= 0) {
        if (Game.board[tempy][tempx] === 1) {
            leftToRightDiagonal = false;
        }
        tempx--
        tempy--
    }
    tempy = yis + 1;
    tempx = xis + 1;
    while (tempy < Game.board.length && tempx < Game.board.length) {
        if (Game.board[tempy][tempx] === 1) {
            leftToRightDiagonal = false;
        }
        tempx++
        tempy++
    }
    let RightToLeftDiagonal = true;
    tempy = yis - 1;
    tempx = xis + 1;
    while (tempy >= 0 && tempx < Game.board.length) {
        if (Game.board[tempy][tempx] === 1) {
            RightToLeftDiagonal = false;
        }
        tempx++
        tempy--
    }
    tempy = yis + 1;
    tempx = xis - 1;
    while (tempy < Game.board.length && tempx >= 0) {
        if (Game.board[tempy][tempx] === 1) {
            RightToLeftDiagonal = false;
        }
        tempx--
        tempy++
    }
    if (!RightToLeftDiagonal || !leftToRightDiagonal) {
        return false;
    }
    return true;
}

export default Game;