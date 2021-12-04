// Nouvelle partie -> afficher le compteur
socket.on('game_starting', (data) => {
    console.log(data);
    countdown();
});

// La partie commence, afficher la prochaine valeur du crash dans le chat
socket.on('game_started', (crash) => {
    console.log('crash @' + crash);
    createRound(crash);
    current_elapsed = 0;
    interval = setInterval(updateOnTick, tick_client, current_elapsed);
});

// La partie continue, tick tout les tick_rate (150 ms), cf server/game.js
socket.on('game_tick', (elapsed) => {
    if (!interval) interval = setInterval(updateOnTick, tick_client, current_elapsed);
    current_elapsed = elapsed;
});

// La partie a crash, changer l'affichage
socket.on('game_crash', (data) => {
    console.log(data);
    gameCrashed(data.game_crash);
    clearInterval(interval);
});