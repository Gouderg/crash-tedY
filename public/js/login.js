'use strict';

// On créer une socket qui va être utilisé pour communiquer avec le serveur.
var socket = io();

// Regarde s'il ya un token et s'il correspond à la bonne personne, on affiche direct le site, sinon on affiche la page de connexion.
function init() {
    // On récupère le cookie et on regarde s'il existe dans la base de données.
    let email = Cookies.get('email');
    let token = Cookies.get('token');

    if (email !== "undefined" && token !== "undefined") {
        socket.emit('tocken-check', {email: email, token: token});
    } else {
        // Sinon, on affiche la page de login.
        $('#menu').hide();
        $('#content').hide();
        $('#login').show();
    }

}

// Réponse du serveur si le token enregistrer dans les cookies est ok, on affiche la page normalement.
socket.on('tocken', (data) => {
    console.log(data);
    $('#menu').show();
    $('#content').show();
    $('#login').hide();
});

// Réponse du serveur si le token n'est pas valide, on se connecte.
socket.on('err-tocken', (data) => {
    $('#menu').hide();
    $('#content').hide();
    $('#login').show();
}); 


// Si l'utilisateur soumet form-login, on envoit une requête au serveur.
$('#form-login').on('submit', function(e) {
    e.preventDefault();

    if ($('#email-login').val() && $('#pass-login').val()) {
        // On envoie les données par socket.
        socket.emit('login', {email: $('#email-login').val() ,password: $('#pass-login').val()});
        $('#form-login').trigger("reset");
    }
});



// Reponse du serveur, on met le pseudo et le token en cookie.
socket.on('login', (data) => {
    Cookies.set('email', data.email, { expires: 7 });
    Cookies.set('token', data.token, { expires: 7 });
    $('#menu').show();
    $('#content').show();
    $('#login').hide();

});

// Mauvais login.
socket.on('err-login', (code) => {
    // On affiche l'erreur
    console.log(code);
});
