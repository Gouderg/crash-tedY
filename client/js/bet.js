// Recupere la balance du joueur a chaque rechargement de la page
function getBalance(logged) {
    if (logged) {
        socket.emit('balance', {email: Cookies.get('email') ,token: Cookies.get('token')});
    }
}

socket.on('balance', (data) => {
    document.getElementById('balance-amount').innerHTML = data.balance;
});

socket.on('err-balance', (err) => {
    console.log(code);
});

$('#betting-section-button').on('submit', function(e) {
    e.preventDefault();

    document.getElementById('betting-section-button').disabled = true;
    document.getElementById('betting-section-button').style.backgroundColor = '#7a7a7a';
    if ($("#betting-section-bet-input").val()) {
        console.log($("#betting-section-bet-input").val());
        
    }

    console.log('Hello');
});