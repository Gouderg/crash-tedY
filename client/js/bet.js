// Récupère la balance du joueur à chaque rechargement de la page.
function getBalance(logged) {
    if (logged) {
        socket.emit('balance', {email: Cookies.get('email') ,token: Cookies.get('token')});
    }
}

// Si la balance du joueur existe alors, on l'affiche.
socket.on('balance', (data) => {
    document.getElementById('balance-amount').innerHTML = data.balance;
});

// Sinon on affiche l'erreur dans la console.
socket.on('err-balance', (err) => {
    console.log(err);
});


// Quand on click sur le boutton pour parier.
$('#betting-section-button').on('click', function(e) {
    // e.preventDefault();

    document.getElementById('betting-section-button').disabled = true;
    document.getElementById('betting-section-button').style.backgroundColor = '#7a7a7a';


    if ($("#betting-section-bet-input").val()) {
        console.log($("#betting-section-bet-input").val());
    }

    console.log(state);
});