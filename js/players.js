'use strict'

var p1Name = null;
var p2Name = null;
var p3Name = null;
var p3Tag = null;
var btnPlay = null;
var btnAdd = null;
var btnAddContainer = null;
var playerNames = [];

//Funcion para agregar el input del 3 jugador con el boton +
var displayInput = function() {
    if(btnAddContainer.className === '' || btnAddContainer.className === 'shift-right') {
        p3Tag.className = 'tag';
        p3Name.className = ' ';
        btnAddContainer.className = 'shift-left';
        btnAdd.className += ' del';
        btnAdd.innerHTML = '-';
    } else {
        p3Tag.className = 'hidden';
        p3Name.className = 'hidden';
        btnAddContainer.className = 'shift-right';
        btnAdd.className = 'btn';
        btnAdd.innerHTML = '+';
    }
}

//Funcion para validar los nombres ingresados en los inputs
var validateInput = function() {
    var isValid = true;

    if(p3Name.className === ' ' && p3Name.value.length < 3) {
        p3Name.value = '';
        p3Name.placeholder = 'Too short!';
        isValid = false;
    }

    if(p1Name.value.length < 3) {
        p1Name.value = '';
        p1Name.placeholder = 'Too short!';
        isValid = false;
    }

    if(p2Name.value.length < 3) {
        p2Name.value = '';
        p2Name.placeholder = 'Too short!';
        isValid = false;
    }
    return isValid;
}

//Funcion para guardar los nombres ingresados por los jugadores
var savePlayerNames = function() {
    if(p3Name.value.length > 0 ) {
        playerNames.push({namep1: p1Name.value, namep2: p2Name.value, namep3: p3Name.value});
    } else {
        playerNames.push({namep1: p1Name.value, namep2: p2Name.value});
    }
    localStorage['playersNames'] = JSON.stringify(playerNames);
}

var errorBtn = function() {
    btnPlay.innerHTML = 'Invalid Names';
    btnPlay.className += ' error';
    setTimeout(errorMsg, 3000);
}

var errorMsg = function() {
    btnPlay.className = 'btn-players';
    btnPlay.innerHTML = 'Play!';
}

var nextPage = function() {
    savePlayerNames();
    var newGame = true;
    localStorage['newGame'] = JSON.stringify(newGame);
    location.href = 'game.html';
}

window.onload = function() {
    p1Name = document.getElementById('p1Name');
    p2Name = document.getElementById('p2Name');
    p3Name = document.getElementById('p3Name');
    p3Tag = document.getElementById('p3Tag');
    btnPlay = document.getElementById('namesPlay')
    btnAdd = document.getElementById('addPlayer');
    btnAddContainer = document.getElementById('btnContainer');

    btnAdd.addEventListener('click', function() {
        displayInput();
    });
    btnPlay.addEventListener('click', function() {
        (validateInput()) ? nextPage() : errorBtn();
    });
} 