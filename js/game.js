'use strict'

var p1Name = null;
var p2Name = null;
var boardHTML = null;
var columnsHTML = null;
var turn1HTML = null;
var turn2HTML = null;
var board = null;
var turn = null;

var twoPlayerBoard = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
];

//Funcion para comprobar los escenarios posibles para ganar
var checkWin = function() {
    //check vertical placement
    for(var i = 0; i < board.board.length; i++) {
        for(var j = 0; j < 4; j++) {
            if(board.board[i][j]) {
                if(board.board[i][j] === (board.board[i][j + 1]) && board.board[i][j] === (board.board[i][j + 2]) && 
                board.board[i][j] === (board.board[i][j + 3])) {
                    console.log('game over vertical ' + board.board[i][j]);
                }
            }
        }
    }

    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            if(board.board[i][j]) {
                //check horizontal placement
                if(board.board[i][j] === (board.board[i + 1][j]) && board.board[i][j] === (board.board[i + 2][j]) && 
                board.board[i][j] === (board.board[i + 3][j])) {
                    console.log('game over horizontal ' + board.board[i][j]);
                }
                //check diagonal increment placement
                if(board.board[i][j] === (board.board[i + 1][j + 1]) && board.board[i][j] === (board.board[i + 2][j + 2]) && 
                board.board[i][j] === (board.board[i + 3][j + 3])) {
                    console.log('game over diagonal inc ' + board.board[i][j]);
                }
            }
        }
    }
    //check diagonal decrement placement
    for (var i = 0; i < board.board.length - 3; i++) {
        for (var j = 3; j < board.board[i].length; j++) {
            if (board.board[i][j]) {
                if (board.board[i][j] === (board.board[i + 1][j - 1]) && board.board[i][j] === (board.board[i + 2][j - 2]) && 
                board.board[i][j] === (board.board[i + 3][j - 3]) ) {
                    console.log('game over diagonal dec ' + board.board[i][j]);
                }
            }
        }
    }
}

//Funcion para chequear si el tablero esta lleno por completo
var checkDraw =  function() {
    for(var i = 0; i < board.board.length; i++) {
        if(board.board[i].includes(null)) {
            var isFull = false
            return;
        } else {
            isFull = true;
        }
    }
    if(isFull) {
        console.log('It\'s a tie!');
    }
}

var getPlayerNames = function() {
    var savedNames = JSON.parse(localStorage['playersNames']);
    p1Name.innerHTML = savedNames[0].namep1 + ' (P1)';
    p2Name.innerHTML = savedNames[0].namep2 + ' (P2)';
}

//Funcion para cambiar el color de las fichas de los jugadores dependiendo el turno
var flipTurn = function() {
    if(turn === 'p1') {
        turn1HTML.className = 'switch-p1 turn-p1';
        turn2HTML.className = 'gray';
        
    } else {
        turn2HTML.className = 'switch-p2 turn-p2';
        turn1HTML.className = 'gray';
    }
}

var toggleTurn = function() {
    turn = (turn === 'p1') ? 'p2' : 'p1';
    flipTurn();
    console.log(turn);
}

window.onload = function() {
    p1Name = document.getElementById('p1');
    p2Name = document.getElementById('p2');
    columnsHTML = document.getElementsByClassName('column');
    boardHTML = document.getElementById('board');
    turn1HTML = document.getElementById('turn1');
    turn2HTML = document.getElementById('turn2');
    getPlayerNames();
    turn = Math.random() > 0.5 ? 'p1' : 'p2';
    board = new Board(boardHTML, columnsHTML, twoPlayerBoard);
    board.render();
    flipTurn();
} 