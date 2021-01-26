'use strict'

var p1Name = null;
var p2Name = null;
var p3Name = null;
var p3Tag = null;
var btnAdd = null;
var btnAddContainer = null;

window.onload = function() {
    p1Name = document.getElementById('p1Name');
    p2Name = document.getElementById('p2Name');
    p3Name = document.getElementById('p3Name');
    p3Tag = document.getElementById('p3Tag');
    btnAdd = document.getElementById('addPlayer');
    btnAddContainer = document.getElementById('btnContainer')
    btnAdd.addEventListener('click', function() {
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
    });
} 