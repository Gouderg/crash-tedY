const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

// Tcheck si un objet est vide.
function isObjEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
}

var con = mysql.createConnection({
    host: 'localhost',
    user: 'ted',
    password: 'CRaSHTeDy19$$',
    database: 'crashteddy'
});

// Connexion à la base de données.
con.connect(function(err) { if (err) throw err;});

// Vérifie le token dans la bdd.
let token_check_db = function(user, callback) {
    con.query('SELECT * FROM user WHERE email = ?',[user.email], function(err, rows, fields) {
        if (err) throw err;
        if (isObjEmpty(rows) || rows[0].token !== user.token) {
            // Not found.
            callback(404);
        } else {
            // Tocken ok.
            callback(200);
        }
    });
};

// Vérifie l'existence d'un utilisateur et l'ajoute un token si c'est vrai.
let login_db = function(user, callback) {
    con.query('SELECT * FROM user WHERE email = ? AND password = ?',[user.email, user.password], function(err, rows, fields) {
        if (err) throw err;    
        // User not found.
        if (isObjEmpty(rows)) {
            callback(404);
        } else {
            // On crée le token utilisateur.
            let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
            callback({email: rows[0].email, token: token, pseudo: rows[0].pseudo})
        
            // On ajoute le token à la base de donnée.
            let sql = "UPDATE user SET token = ? WHERE email = ?";
            con.query(sql,[token, rows[0].email], function (err, result) {if (err) throw err;});
        }
    });
};

// Ajoute un utilisateur dans la base de données.
let register_db = function(user, callback){
    // On regarde si l'utilisateur existe, s'il existe, on renvoie une erreur.
    con.query('SELECT * FROM user WHERE email = ?', [user.email], function (err, rows, fields) {
        if (err) throw err;
      
        if (!isObjEmpty(rows)) {
            callback(409);
        } else {
            // On calcule un nouveau token.
            let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
            callback({email: user.email, token: token, pseudo: user.pseudo});
            
            // On ajoute l'utilisateur à la base de données.
            let sql = "INSERT INTO user (email, password, pseudo, token, balance) VALUES (?, ?, ?, ?, 1000)";
            con.query(sql,[user.email, user.password, user.pseudo, token], function (err, result) {if (err) throw err;});
        }
    });   
};

// Renvoie la balance qui est dans la base de données.
let get_balance_db = function(user, callback) {
    con.query('SELECT balance FROM user WHERE email = ? AND token = ?',[user.email, user.token], function(err, rows, fields) {
        if (err) throw err;
        if (isObjEmpty(rows)) {
            // Not found.
            callback(NaN);
        } else {
            // Balance ok.
            callback(rows[0].balance);
        }
    });
};

// Ajoute le hash de la game dans la base de données.
let add_hash_game_db = function(hash, callback) {
    con.query('INSERT INTO game (hash_game) VALUES (?)', [hash], function(err, rows, fields) {
        // Trouver une façon de mieux gérer ? Fait planter le serveur si faux.
        if (err) throw err;
    });
};

// Ajoute la valeur du bet dans la base de données.
let add_bet_db = function(user, callback) {
    con.query('INSERT INTO bet (amount_bet, email, hash_game) VALUES (?, ?, ?)', [user.bet, user.email, user.hash], function(err, rows, fields) {

        // Throw error.
        if (err) throw err;
        else {console.log(rows);}
    });
};


exports.token_check_db = token_check_db;
exports.login_db = login_db;
exports.register_db = register_db;
exports.get_balance_db = get_balance_db;
exports.add_hash_game_db = add_hash_game_db;
exports.add_bet_db = add_bet_db;