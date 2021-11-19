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
        if (rows === [] || rows[0].token !== data.token) {
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
    con.connect(function(err) { if (err) throw err;});
    con.query('SELECT * FROM user WHERE email = ? AND password = ?',[data.email, data.password], function(err, rows, fields) {
      if (err) throw err;
      // User not found.
      if (rows === []) {
        socket.emit('err-login', {code: 404}); 
      } else {
        let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
        socket.emit('login', {email: rows[0].email, token: token}); 
        let sql = "UPDATE user SET token = ? WHERE email = ?"
        con.query(sql,[token, rows[0].email], function (err, result) {if (err) throw err;});
      }
    });
  });

  // Register.
});

// Serveur écoute sur le port 3000.
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});