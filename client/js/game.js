socket.on('test-tick', (data) => {
    console.log(data);
});

socket.on('game_starting', (data) => {
    console.log(data);
    countdown();
});

socket.on('game_started', (crash) => {
    console.log('crash @' + crash);
    createRound(crash);
});

socket.on('game_tick', (elapsed) => {
    console.log(elapsed);
    updateOnTick(elapsed);
});

socket.on('game_crash', (data) => {
    console.log(data);
    gameCrashed(data.game_crash);
});


