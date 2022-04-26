let db = require('./db');

let get_balance = function(socket){
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

exports.get_balance = get_balance;