'use strict';

// On créer une socket qui va être utilisé pour communiquer avec le serveur.
var socket = io();

// Regarde s'il ya un token et s'il correspond à la bonne personne, on affiche direct le site, sinon on affiche la page de connexion.
function init() {
    // On récupère le cookie et on regarde s'il existe dans la base de données.
    let email = Cookies.get('email');
    let token = Cookies.get('token');

    if (email !== "undefined" && token !== "undefined") {
        socket.emit('token-check', {email: email, token: token});
    } else {
        // Sinon, on affiche la page de login.
    }
}

// Réponse du serveur si le token enregistrer dans les cookies est ok, on affiche la page normalement.
socket.on('token', (data) => {
    console.log(data);
    $('#login-register').hide();
});

// Réponse du serveur si le token n'est pas valide, on se connecte.
socket.on('err-token', (data) => {
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

// Réponse du serveur, on met le pseudo et le token en cookie.
socket.on('login', (data) => {
    Cookies.set('email', data.email, { expires: 7 });
    Cookies.set('token', data.token, { expires: 7 });
    Cookies.set('pseudo', data.pseudo, { expires: 7 });
    
    $('#login-register').hide();
    location.reload();
});

// Mauvais login.
socket.on('err-login', (code) => {
    // On affiche l'erreur
    console.log(code);
});

// Si l'utilisateur soumet le formulaire de register.
$('#form-register').on('submit', function(e) {
    e.preventDefault();

    // Si toutes les données sont validés.
    if ($('#email-register').val() && $('#pseudo-register').val() && $('#comfpass-register').val() && $('#pass-register').val()) {
        // Mot de passe différent
        if ($('#pass-register').val() !== $('#comfpass-register').val()) {
            // On affiche un mot de passe.      
        } else {
            // On encrypte le mot de passe.
    
            // On envoie à la base de donnée.
            socket.emit('register', {email: $('#email-register').val(), pseudo: $('#pseudo-register').val(), password: $('#pass-register').val()});
            $('#form-register').trigger("reset");
        }
    }
});


// Réponse du serveur pour la création du profil - register.
socket.on('register', (data) => {
    Cookies.set('email', data.email, { expires: 7 });
    Cookies.set('token', data.token, { expires: 7 });
    Cookies.set('pseudo', data.pseudo, { expires: 7 });

    $('#login-register').hide();
    location.reload();
    console.log(data.balance);
});

socket.on('err-register', (code) => {
    console.log(code);
});

