'use strict'

var gameLI = null;
var btnBack = null;
var btnNext = null;
var btnLoad = null;
var savedGamesHTML = null;
var p1HTML = null;
var p2HTML = null;
var p3HTML = null;
var dateHTML = null;
var listSection = null;
var empty = null;
var arrGameLI = null;
var savedGameIndex = null;
var start = 0;
var end = 5;

var loadGame = function() {
    var newGame = false;
    localStorage['newGame'] = JSON.stringify(newGame);
    location.href = 'game.html';
}

var selectGame = function(e) {
    var gameIndex = arrGameLI.indexOf(e.target);
    savedGameIndex = gameIndex;
    localStorage['gameIndex'] = JSON.stringify(savedGameIndex);
}

//Cambia la seccion de la lista modificando los parametros de inicio y finalizacion
var navigation = function(e) {
    var btn = e.target.id;
    if(btn === 'savedNext') {
        start += 5;
        end += 5;
    } else {
        if(start >= 5) {
            start -= 5;
            end -= 5;
        }
    }
    loadSavedGamesData();
}

//Funcion que habilita/desabilita el boton Next dependiendo si la pagina esta llena y lo mismo con el boton Back
var displayButtons = function() {
    (listSection.length < 5) ? btnNext.className += ' disabled' : btnNext.className = 'navigation btn-controls';
    (start >= 5) ? btnBack.className = 'navigation btn-controls' : btnBack.className += ' disabled';
}

//Funcion para mostrar solo los primeros 5 juegos guardados
var loadSavedGamesData = function() {
    listSection = arrGameLI.slice(start, end);

    for(var i = 0; i < savedGames.length; i++) {
        p1HTML[i].innerHTML = savedGames[i].p1.name;
        p2HTML[i].innerHTML = savedGames[i].p2.name;
        if(savedGames[i].p3 != null) {
            p3HTML[i].className = 'game-info p3';
            p3HTML[i].innerHTML = 'VS ' + savedGames[i].p3.name;
        }
        dateHTML[i].innerHTML =  savedGames[i].date;
    }

    for(var l = 0; l < savedGames.length; l++) {
        gameLI[l].className = 'game hidden';
    }

    for(var j = 0; j < listSection.length; j++) {
        listSection[j].className = 'game';
    }
    displayButtons();
}

var showEmptyList = function() {
    empty.className = '';
    btnBack.className += ' disabled';
    btnNext.className += ' disabled';
}

var renderList = function() {
    var storedGames = JSON.parse(localStorage['savedGames']).length;
    var html = '';

    for(var i = 0; i < storedGames; i++) {
        html += '<li tabindex="-1" class="game hidden">';
        html += '<div class="match-container">';
        html += '<div class="game-info p1"></div>';
        html += '<p>VS</p>';
        html += '<div class="game-info p2"></div>';
        html += '<div class="game-info p3 hidden"></div>';
        html += '</div>';
        html += '<p class="date"></p>';
        html += '</li>';
    }
    savedGamesHTML.innerHTML = html;
    arrGameLI = Array.from(gameLI);
    loadSavedGamesData();
}

window.onload = function() {
    savedGameIndex = JSON.parse(localStorage['gameIndex'] || '[]');
    savedGames = JSON.parse(localStorage['savedGames']);
    savedGamesHTML = document.getElementById('list');
    gameLI = document.getElementsByClassName('game');
    p1HTML = document.getElementsByClassName('game-info p1');
    p2HTML = document.getElementsByClassName('game-info p2');
    p3HTML = document.getElementsByClassName('game-info p3');
    dateHTML = document.getElementsByClassName('date');
    empty = document.getElementById('empty');
    btnBack = document.getElementById('savedBack');
    btnNext =  document.getElementById('savedNext');
    btnLoad =  document.getElementById('loadGame');
    btnLoad.addEventListener('click', loadGame);
    btnNext.addEventListener('click', navigation);
    btnBack.addEventListener('click', navigation);
    (savedGames.length > 0) ? renderList() : showEmptyList();
    arrGameLI.forEach(elem => elem.addEventListener('click', selectGame));
} 