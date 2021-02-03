'use strict'

var p1 = null;
var p2 = null;
var p3 = null;
var p1Name = null;
var p2Name = null;
var p3Name = null;
var p1Timer = null;
var p2Timer = null;
var p3Timer = null;
var globalTimer = null;
var boardHTML = null;
var columnsHTML = null;
var turn1HTML = null;
var turn2HTML = null;
var turn3HTML = null;
var p1TimerHTML = null;
var p2TimerHTML = null;
var p3TimerHTML = null;
var globalTimerHTML = null;
var p3Container = null;
var popup = null;
var popupMessage = null;
var popupWinner = null;
var resetBtn = null;
var restartBtn = null;
var saveBtn = null;
var board = null;
var turn = null;
var lastUpdatedTime = new Date().getTime();
var savedGameIndex = null;
var savedGames = [];
var savedTimers = [];
var savedNames = [];
var saving = false;
var isNewGame = null;
var gameOver = false;
var threePlayers = false;

var twoPlayerBoard = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
];

var threePlayerBoard = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null]
];

//Funciones para reiniciar el juego y los cronometros
var restartGame = function() {
    popup.className = 'hidden';
    boardHTML.className = 'board';
    if(saving) {
        saving = false;
        startTimers();
    } else {
        gameOver = false;
        board.resetBoard();
        board.render();
        resetTimers();
        setTimeout(toggleTurn, 1);
    }
}

var resetGame = function() {
    popup.className = 'hidden';
    boardHTML.className = 'board';
    if(saving) {
        saving = false;
        globalTimer.startTimer();
        (turn === 'p1') ? p1Timer.startTimer() : (turn === 'p2' ? p2Timer.startTimer() : p3Timer.startTimer());
    } else {
        gameOver = false;
        board.resetBoard();
        board.render();
        resetTimers();
        setTimeout(toggleTurn, 1);
    }
}

var resetTimers = function() {
    globalTimer.resetTimer();
    p1Timer.resetTimer();
    p2Timer.resetTimer();
    if(threePlayers) {p3Timer.resetTimer();}
}

var startTimers = function() {
    globalTimer.startTimer();
    p1Timer.startTimer();
    p2Timer.startTimer();
    if(threePlayers) {p3Timer.startTimer();}
}

var stopTimers = function() {
    globalTimer.stopTimer();
    p1Timer.stopTimer();
    p2Timer.stopTimer();
    if(threePlayers) {p3Timer.stopTimer();}
}

//Funcion para mostrar cartel con el ganador
var displayPopup = function(playerName) {
    popup.className = ' ';
    boardHTML.className += ' disabled blur'
    if(saving) {
        popupWinner.innerHTML = '';
        popupMessage.innerHTML = 'Saved!';
        resetBtn.innerHTML = 'OK';
    } else {
        gameOver = true;
        if(playerName) {
            playerName = (playerName === 'p1') ? p1.name : p2.name;
            popupWinner.innerHTML = playerName;
            popupMessage.innerHTML = 'WON!';
        } else {
            popupWinner.innerHTML = 'Nobody wins...';
            popupMessage.innerHTML = 'It\'s a TIE!';
        }
        resetBtn.innerHTML = 'Play Again';
    }
    stopTimers();
}

var getDate = function() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
}

//Funcion para guardar la partida con los nombres y los tiempos
var saveGame = function() {
    if(threePlayers) {
        savedGames.push({currentBoard: board.board, p1: p1, p2: p2, p3: p3, turn: turn, date: getDate()});
        savedTimers.push({p1: p1Timer, p2: p2Timer, p3: p3Timer, globalTime: globalTimer});
    } else {
        savedGames.push({currentBoard: board.board, p1: p1, p2: p2, turn: turn, date: getDate()});
        savedTimers.push({p1: p1Timer, p2: p2Timer, globalTime: globalTimer});
    }
    localStorage['savedGames'] = JSON.stringify(savedGames);
    localStorage['savedTimers'] = JSON.stringify(savedTimers);
    saving = true;
    displayPopup(null);
}

//Funcion para comprobar los escenarios posibles para ganar
var checkWin = function() {
    //check vertical placement
    for(var i = 0; i < board.board.length; i++) {
        for(var j = 0; j < 4; j++) {
            if(board.board[i][j]) {
                if(board.board[i][j] === (board.board[i][j + 1]) && board.board[i][j] === (board.board[i][j + 2]) && 
                board.board[i][j] === (board.board[i][j + 3])) {
                    displayPopup(board.board[i][j]);
                }
            }
        }
    }

    for(var i = 0; i < board.board.length - 3; i++) {
        for(var j = 0; j < 4; j++) {
            if(board.board[i][j]) {
                //check horizontal placement
                if(board.board[i][j] === (board.board[i + 1][j]) && board.board[i][j] === (board.board[i + 2][j]) && 
                board.board[i][j] === (board.board[i + 3][j])) {
                    displayPopup(board.board[i][j]);
                }
                //check diagonal increment placement
                if(board.board[i][j] === (board.board[i + 1][j + 1]) && board.board[i][j] === (board.board[i + 2][j + 2]) && 
                board.board[i][j] === (board.board[i + 3][j + 3])) {
                    displayPopup(board.board[i][j]);
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
                    displayPopup(board.board[i][j]);
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
        displayPopup(null);
    }
}

var getPlayerNames = function() {
    if(isNewGame) {
        savedNames = JSON.parse(localStorage['playersNames']);
        p1Name.innerHTML = savedNames[0].namep1 + ' (P1)';
        p2Name.innerHTML = savedNames[0].namep2 + ' (P2)';
        if(savedNames[0].namep3) {
            p3Name.innerHTML = savedNames[0].namep3 + ' (P3)';
            threePlayers = true;
        }
    } else {
        p1Name.innerHTML = savedGames[savedGameIndex].p1.name + ' (P1)';
        p2Name.innerHTML = savedGames[savedGameIndex].p2.name + ' (P2)';
        if(savedGames[savedGameIndex].p3) {
            p3Name.innerHTML = savedGames[savedGameIndex].p3.name + ' (P3)';
            threePlayers = true;
        }
    }
}

//Funcion para cambiar el color de las fichas de los jugadores dependiendo el turno
var flipTurn = function() {
    if(turn === 'p1') {
        turn1HTML.className = 'switch-p1 turn-p1';
        turn2HTML.className = 'gray';
        if(threePlayers) {
            turn3HTML.className = 'gray';
        }
    } else if(turn === 'p2') {
        turn2HTML.className = 'switch-p2 turn-p2';
        turn1HTML.className = 'gray';
        if(threePlayers) {
            turn3HTML.className = 'gray';
        }
    } else {
        turn3HTML.className = 'switch-p3 turn-p3';
        turn1HTML.className = 'gray';
        turn2HTML.className = 'gray';
    }
}

var toggleTurn = function() {
    if(!gameOver) {
        if(!threePlayers) {
            turn = (turn === 'p1') ? 'p2' : 'p1';
            if(turn === 'p1') {
                p2Timer.stopTimer();
                p1Timer.startTimer();
            } else {
                p1Timer.stopTimer();
                p2Timer.startTimer();
            }
            flipTurn();
        } else {
            turn = (turn === 'p1') ? 'p2' : (turn === 'p3' ? 'p1' : 'p3');
            if(turn === 'p1') {
                p2Timer.stopTimer();
                p3Timer.stopTimer();
                p1Timer.startTimer();
            } else if (turn === 'p2') {
                p1Timer.stopTimer();
                p3Timer.stopTimer();
                p2Timer.startTimer();
            } else {
                p1Timer.stopTimer();
                p2Timer.stopTimer();
                p3Timer.startTimer();
            }
            flipTurn();
        }
    }
}

//Funcion para cargar un juego guardado
var loadSavedGame = function() {
    savedGames = JSON.parse(localStorage['savedGames']);
    savedTimers = JSON.parse(localStorage['savedTimers']);

    board.board = savedGames[savedGameIndex].currentBoard;
    turn = savedGames[savedGameIndex].turn;
    p1 = savedGames[savedGameIndex].p1;
    p2 = savedGames[savedGameIndex].p2;
    p3 = savedGames[savedGameIndex].p3;

    p1Timer.currentTimer = savedTimers[savedGameIndex].p1.currentTimer;
    p1Timer.lastUpdatedTime = savedTimers[savedGameIndex].p1.lastUpdatedTime;
    p2Timer.currentTimer = savedTimers[savedGameIndex].p2.currentTimer;
    p2Timer.lastUpdatedTime = savedTimers[savedGameIndex].p2.lastUpdatedTime;
    globalTimer.currentTimer = savedTimers[savedGameIndex].globalTime.currentTimer;
    globalTimer.lastUpdatedTime = savedTimers[savedGameIndex].globalTime.lastUpdatedTime;

    if(threePlayers) {
        p3Timer.currentTimer = savedTimers[savedGameIndex].p3.currentTimer;
        p3Timer.lastUpdatedTime = savedTimers[savedGameIndex].p3.lastUpdatedTime;
        p3Timer.startTimer();
     }

    board.render();
    globalTimer.startTimer();
    p1Timer.startTimer();
    p2Timer.startTimer();
    setTimeout(toggleTurn, 1);
}

var initialize = function() {
    getPlayerNames();
    board = new Board(boardHTML, columnsHTML, twoPlayerBoard);

    if(threePlayers) {
        p3Container.className = 'opponent';
        board = new Board(boardHTML, columnsHTML, threePlayerBoard);
        p3 = new Player('Player 3');
        p3Timer = new Timer(p3TimerHTML, 0, lastUpdatedTime, 0);
    }
    
    p1 = new Player('Player 1');
    p2 = new Player('Player 2');
    p1Timer = new Timer(p1TimerHTML, 0, lastUpdatedTime, 0);
    p2Timer = new Timer(p2TimerHTML, 0, lastUpdatedTime, 0);
    globalTimer = new Timer(globalTimerHTML, 0, lastUpdatedTime, 0); 

    if(isNewGame) {
        p1.name = p1Name.innerHTML.slice(0, -5);
        p2.name = p2Name.innerHTML.slice(0, -5);
        (threePlayers) ? p3.name = p3Name.innerHTML.slice(0, -5) : '';
        turn = Math.random() > 0.5 ? 'p1' : 'p2';
        globalTimer.startTimer();
        toggleTurn();
        board.render();
        flipTurn();

    } else {
        loadSavedGame();
    }
}

window.onload = function() {
    //data persistence
    savedGames = JSON.parse(localStorage['savedGames'] || '[]');
    savedTimers = JSON.parse(localStorage['savedTimers'] || '[]');
    savedGameIndex = JSON.parse(localStorage['gameIndex'] || '[]');
    if(window.location.href.indexOf('game.html') > -1) {
        p1Name = document.getElementById('p1');
        p2Name = document.getElementById('p2');
        p3Name = document.getElementById('p3');
        p1TimerHTML = document.getElementById('p1Time');
        p2TimerHTML = document.getElementById('p2Time');
        p3TimerHTML = document.getElementById('p3Time');
        globalTimerHTML = document.getElementById('time');
        columnsHTML = document.getElementsByClassName('column');
        boardHTML = document.getElementById('board');
        turn1HTML = document.getElementById('turn1');
        turn2HTML = document.getElementById('turn2');
        turn3HTML = document.getElementById('turn3');
        p3Container = document.getElementById('p3Container');
        resetBtn = document.getElementById('reset');
        popup = document.getElementById('popup');
        popupMessage = document.getElementById('message');
        popupWinner = document.getElementById('winner');
        resetBtn.addEventListener('click', resetGame);
        document.getElementById('gameRestart').addEventListener('click', restartGame);
        document.getElementById('gameSave').addEventListener('click', saveGame);
        isNewGame = JSON.parse(localStorage['newGame']);
        initialize();
    }
} 