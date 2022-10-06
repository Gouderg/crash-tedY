'use strict';

var chatbox = document.getElementById('chatbox-list-messages');
var form = document.getElementById('chatbox-message-form');
var input = document.getElementById('chatbox-message-input');



form.addEventListener('submit', function(e) {
    let pseudo = Cookies.get('pseudo');
    let role = Cookies.get('role');
    e.preventDefault();
    if (input.value) {
        socket.emit('chat-msg', {pseudo: pseudo, msg: input.value, role: role});
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