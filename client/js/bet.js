let balance = 0;

// Récupère la balance du joueur à chaque rechargement de la page.
function getBalance(logged) {
    if (logged) {
        socket.emit('balance', {email: Cookies.get('email') ,token: Cookies.get('token')});
    }
}

// Si la balance du joueur existe alors, on l'affiche.
socket.on('balance', (data) => {
    document.getElementById('balance-amount').innerHTML = data.balance;
    balance = data.balance;
});

// Sinon on affiche l'erreur dans la console.
socket.on('err-balance', (err) => {
    console.log(err);
});


// Quand on click sur le boutton pour parier.
$('#betting-section-button').on('click', function(e) {


    let val = $("#betting-section-bet-input").val();

    // val numérique, val > 0, val < balance.
    if (state === "LOADING" && val && !isNaN(val) && val > 0  && val < balance) {
        // On désactive le bouton.
        document.getElementById('betting-section-button').disabled = true;
        document.getElementById('betting-section-button').style.backgroundColor = '#7a7a7a';
        
        // On permet l'activation du bouton cashout.
        bool_bet_placed = true;

        // On ajoute le bet dans la base de données.
        socket.emit('add-bet', {bet: val, email: Cookies.get('email'), token: Cookies.get('token')});

        console.log($("#betting-section-bet-input").val());
    }

    if (state === "PROGRESS") {
        
    }

    console.log(state);
});