function getCrashValue () {
    let crash = Math.round(0.99/(1 - Math.random()) * 100) / 100;
    if (crash < 1.01) crash = 1.01;
    return crash;
}

function growthFunction (elapsed) {
    return Math.floor(100 * Math.pow(Math.E, 0.00006 * elapsed)) / 100;
}

// env vars (ms)
let aftercrash_time = 3000;
let restart_time = 5000;
let tick_rate = 150;

function Game (io) {
    let db = require('./db');

    let state = 'ENDED'; // 'STARTING' | 'BLOCKING' | 'IN_PROGRESS' |  'ENDED'
    let start_time;
    let crash;
    let id_game = 0;

    function createGame () {
        state = 'STARTING';
        // hash game and add to db.
        id_game += 1;
        db.add_hash_game_db(id_game + Date.now(), (e) => {console.log(e);});

        // TODO : Add game to db
        crash = getCrashValue();
        // crash = 1.25;
        console.log('Game n°' + id_game + ', ' + state + ' (crash @' + crash + ')');
        
        start_time = new Date(Date.now() + restart_time);

        io.emit('game_starting', {
            time_till_start: restart_time
        });

        setTimeout(blockGame, restart_time);
    }

    function blockGame () {
        state = 'BLOCKING';
        console.log(state);

        // TODO : If a player joins, wait 100ms more

        setTimeout(startGame, 100);
    }

    function startGame () {
        state = 'IN_PROGRESS';
        console.log(state);

        start_time = new Date();

        io.emit('game_started', crash);

        callTick();
    }

    function callTick () {
        setTimeout(runTick, tick_rate);
    }

    function runTick () {
        let elapsed = new Date() - start_time;
        let current_crash = growthFunction(elapsed);

        if (current_crash >= crash) {
            endGame();
        } else {
            tick(elapsed);
        }
    }

    function tick (elapsed) {
        io.emit('game_tick', elapsed);
        callTick();
    }

    function endGame () {
        state = 'ENDED';
        console.log(state);

        let crash_time = Date.now();
        
        io.emit('game_crash', {
            game_crash: crash
        });

        setTimeout(createGame, (crash_time + aftercrash_time) - crash_time);
    }

    createGame();
}


module.exports = Game;