'use strict';

var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

var pseudo = prompt('Votre pseudo: ');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat-msg', {pseudo: pseudo ,msg: input.value});
        input.value = '';
    }
});

socket.on('chat-msg', function(content) {
    var item = document.createElement('li');
    item.textContent = content.date + ' ' + content.pseudo + ' ' + content.msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});