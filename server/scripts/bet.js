let db = require('./db');
let Game = require('./game');

let get_balance = function(socket) {
    socket.on('balance', (data) => {
        // Tcheck bdd
        db.get_balance_db(data, (res) => {
            if (res) {
                console.log(res === NaN)
                socket.emit('balance', {balance: res});
            } else {
                socket.emit('err-balance', {code: 404}); 
            }
        });

    });
};

let add_bet = function(socket) {
    socket.on('add-bet', (user) => {

        // Vérication email + token.
        // Vérification si email and hash pas 2.
        // Ajout en bdd.

        // Add in bdd.

        user.hash = Game.getHash()
        console.log(user.hash);
        db.add_bet_db(user);
    });
};

exports.get_balance = get_balance;
exports.add_bet = add_bet;