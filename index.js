const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const { randomBytes, randomInt } = require('crypto');
const port = process.env.PORT || 3000;

var con = mysql.createConnection({
    host: 'localhost',
    user: 'ted',
    password: 'CRaSHTeDy19$$',
    database: 'crashteddy'
});



// Affiche les zéros des minutes et des heures.
function displayZero(nombre) {
  return nombre < 10 ? '0' + nombre : nombre;
}

// Tcheck si un objet est vide.
function isObjEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

// Permet de relier des chemins statiques pour les autres fichiers.
app.use(express.static(__dirname + '/public'));

// Emplacement du site.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {

  // Chat.
  socket.on('chat-msg', msg => {
    let now = new Date();
    msg['date'] = displayZero(now.getHours()) +':'+ displayZero(now.getMinutes());
    io.emit('chat-msg', msg);
  });

  // Token-check.
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

  // Login.
  socket.on('login', (data) => {
    // Connexion à la base de données.
    con.connect(function(err) { if (err) throw err;});
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

  // Register.
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
});

// Serveur écoute sur le port 3000.
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});