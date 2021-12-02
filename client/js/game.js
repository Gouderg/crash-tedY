socket.on('test-tick', (data) => {
    console.log(data);
});

socket.on('game_starting', (data) => {
    console.log(data);
});

socket.on('game_started', (data) => {
    console.log('crash @' + data);
});

socket.on('game_tick', (data) => {
    console.log(data);
});

socket.on('game_crash', (data) => {
    console.log(data);
});


