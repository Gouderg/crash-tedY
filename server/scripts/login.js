const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'ted',
    password: 'CRaSHTeDy19$$',
    database: 'crashteddy'
});

// Tcheck si un objet est vide.
function isObjEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }


// Token-check.
let token_check = function(socket) {
    socket.on('tocken-check', (data) => {
        // Tcheck bdd
        con.connect(function(err) { if (err) throw err;});
        
        con.query('SELECT * FROM user WHERE email = ?',[data.email], function(err, rows, fields) {
        if (err) throw err;
        if (isObjEmpty(rows) || rows[0].token !== data.token) {
            // Not found.
            socket.emit('err-tocken', {code: 404}); 
        } else {
            // Tocken ok.
            socket.emit('tocken', {code: 200});
        }
        });
    });
}

// Login.
let login = function(socket) {
    socket.on('login', (data) => {
        // Connexion à la base de données.
        con.connect(function(err) { if (err) throw err;});

        // Requête.
        con.query('SELECT * FROM user WHERE email = ? AND password = ?',[data.email, data.password], function(err, rows, fields) {
            if (err) throw err;
            
            // User not found.
            if (isObjEmpty(rows)) {
                socket.emit('err-login', {code: 404}); 
            } else {
                // On crée le token utilisateur.
                let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
                socket.emit('login', {email: rows[0].email, token: token, pseudo: rows[0].pseudo}); 
            
                // On ajoute le token à la base de donnée.
                let sql = "UPDATE user SET token = ? WHERE email = ?";
                con.query(sql,[token, rows[0].email], function (err, result) {if (err) throw err;});
            }
        });
    });
}

// Register.
let register = function(socket) {
    socket.on('register', (data) => {
      // Connexion à la base de données.
      con.connect(function(err) { if (err) throw err;});
    
      // On regarde si l'utilisateur existe, s'il existe, on renvoie une erreur.
      con.query('SELECT * FROM user WHERE email = ?', [data.email], function (err, rows, fields) {
        if (err) throw err;
        
        if (!isObjEmpty(rows)) {
          socket.emit('err-register', {code: 409});
        } else {
          // On calcule un nouveau token.
          let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
      
          // On ajoute l'ulisateur à la base de données.
          let sql = "INSERT INTO user (email, password, pseudo, token, balance) VALUES (?, ?, ?, ?, 0)";
          con.query(sql,[data.email, data.password, data.pseudo, token], function (err, result) {if (err) throw err;});
      
          // On renvoit le token à l'utilisateur.
          socket.emit('register', {email: data.email, token: token, pseudo: data.pseudo}); 
        }
      });
    });
}

exports.token_check = token_check;
exports.login = login;
exports.register = register;