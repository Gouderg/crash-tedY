let db = require('./db');

// Token-check.
let token_check = function(socket) {
    socket.on('tocken-check', (data) => {
        db.token_check_db(data, (res) => {
            if (res === 404) {
                socket.emit('err-tocken', {code: 404}); 
            } else {
                socket.emit('tocken', {code: 200});
            }
        });
    });
};

// Login.
let login = function(socket) {
    socket.on('login', (data) => {
        db.login_db(data, (res) => {
            if (res === 404) {
                socket.emit('err-login', {code: 404}); 
            } else {
                socket.emit('login', res); 
            }
        });
    });
};

// Register.
let register = function(socket) {
    socket.on('register', (data) => {
        db.register_db(data, (res) => {
            if (res === 409) {
                socket.emit('err-register', {code: 409});
            } else {
                // On renvoit le token à l'utilisateur.
                socket.emit('register', res); 
            }
        })
    });
};


exports.token_check = token_check;
exports.login = login;
exports.register = register;