// Recupere la balance du joueur a chaque rechargement de la page
function getBalance(logged) {
    if (logged) {
        socket.emit('balance', {email: Cookies.get('email') ,token: Cookies.get('token')});
    }
}

socket.on('balance', (data) => {
    console.log(data);
    $('#balance-amount').text(data.balance);
});

socket.on('err-balance', (err) => {
    console.log(code);
});