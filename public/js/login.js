'use strict';

// Regarde s'il ya un token et s'il correspond à la bonne personne, on affiche direct le site, sinon on affiche la page de connexion.
function init() {

    // On récupère le cookie et on regarde si il existe dans la base de données.

    // Si oui on affiche la page normal.
    if (0) {
        $('#menu').show();
        $('#content').show();
        $('#login').hide();
    } else {
        // Sinon, on affiche la page de login.
        $('#menu').hide();
        $('#content').hide();
        $('#login').show();
    }

}

// Si l'utilisateur soumet form-login
$('#form-login').on('submit', function(e) {
    e.preventDefault();

    if ($('#email-login').val() && $('#pass-login').val()) {
        // On envoie les donnees par socket
        socket.emit('login', {email: $('#email-login').val() ,password: $('#pass-login').val()});
        $('#form-login').trigger("reset");
    }
    // $('#form-login').reset();
});

// Reponse du serveur, on met le pseudo et le token en cookie.
socket.on('login', (data) => {
    Cookies.set('pseudo', data.pseudo, { expires: 7 });
    Cookies.set('token', data.token, { expires: 7 });
    $('#menu').show();
    $('#content').show();
    $('#login').hide();

});

// Mauvais login.
socket.on('err-login', (code) => {

});