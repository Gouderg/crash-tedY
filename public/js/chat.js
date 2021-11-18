'use strict';

var socket = io();

var chatbox = document.getElementById('chatbox-list-messages');
var form = document.getElementById('chatbox-message-form');
var input = document.getElementById('chatbox-message-input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat-msg', {pseudo: pseudo ,msg: input.value});
        input.value = '';
    }
});

socket.on('chat-msg', function(content) {
    var div = '<div class="chatbox-message">'+
                '<span class="chatbox-message-date"> '+ content.date+' </span>'+
                '<span class="chatbox-message-author"> '+content.pseudo+' </span>'+
                '<span>:</span>'+
                '<span class="chatbox-message-message"> '+content.msg+' </span>'+
              '</div>';   

    chatbox.innerHTML += div;
    chatbox.scrollTop = chatbox.scrollHeight;
});