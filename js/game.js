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

var getPlayerNames = function() {
    var savedNames = JSON.parse(localStorage['playersNames']);
    p1Name.innerHTML = savedNames[0].namep1;
    p2Name.innerHTML = savedNames[0].namep2;
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