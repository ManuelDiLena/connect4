'use strict';

var submitBtn = null;
var formElements = null;

//Funcion para abrir la herramienta de correo determinado y llena el asunto y cuerpo con los valores del Nombre y Mensaje
var sendEmail = function(name, message) {
    window.open('mailto:manuel.dilena.29@gmail.com?subject=' + 'Connect4 - Contact: '
     + encodeURIComponent(name) +'&body=' + encodeURIComponent(message));
}

//Funcion para comprobar los campos vacios, el numero de caracteres y el correo electronico
var validateForm = function() {
    var alphaNum = /^[a-zA-Z0-9]*$/; //alphanumeric characters only
    var validEmail = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/; //regex with multiple email formats
    var name = '';
    var message = '';
    var isValid = true;

    for(var i = 0; i < formElements.length; i++) {
        if(formElements[i].id === 'name') {
            if(!alphaNum.test(formElements[i].value)) {
                formElements[i].value = '';
                formElements[i].placeholder = 'Invalid characters';
                isValid = false;
            }

            if(formElements[i].value.length < 3) {
                formElements[i].value = '';
                formElements[i].placeholder = 'Please enter more than 3 characters';
                isValid = false;
            }
            name = formElements[i].value;
        }

        if(formElements[i].id === 'email') {
            if(!validEmail.test(formElements[i].value)) {
                formElements[i].value = '';
                formElements[i].placeholder = 'Invalid Email format';
                isValid = false;
            }
        }

        if(formElements[i].id === 'message') {
            if(formElements[i].value.length < 5) {
                formElements[i].value = '';
                formElements[i].placeholder = 'Please enter more than 5 characters';
                isValid = false;
            }
            message = formElements[i].value;
        }   
       
    }

    (isValid) ? sendEmail(name, message) : styleBtn();
}

var styleBtn = function() {
    submitBtn.innerHTML = 'Unable to send Email';
    submitBtn.className += 'error';
    setTimeout(errorMsg, 3000);
}

var errorMsg = function() {
    submitBtn.className = ' ';
    submitBtn.innerHTML = 'Send Message';
}

window.onload = function() {
    formElements = document.getElementsByClassName('entry');
    submitBtn = document.getElementById('submit');
    submitBtn.onclick = validateForm;
} 