'use strict';

// Regarde s'il ya un token et s'il correspond à la bonne personne, on affiche direct le site, sinon on affiche la page de connexion.
function init() {

    // On récupère le cookie et on regarde si il existe dans la base de données.

    $('#register').hide();
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

