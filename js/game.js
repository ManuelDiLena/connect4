'use strict'

var p1Name = null;
var p2Name = null;
var boardHTML = null;
var columnsHTML = null;
var board = null;

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
    p1Name.innerHTML = savedNames[0].namep1 + ' (P1)';
    p2Name.innerHTML = savedNames[0].namep2 + ' (P2)';
}

window.onload = function() {
    p1Name = document.getElementById('p1');
    p2Name = document.getElementById('p2');
    columnsHTML = document.getElementsByClassName('column');
    boardHTML = document.getElementById('gameZone');
    getPlayerNames();
    board = new Board(boardHTML, columnsHTML, twoPlayerBoard);
    board.render();
} 