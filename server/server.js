const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

let Chat = require('./scripts/chat');
let Login = require('./scripts/login');
let Game = require('./scripts/game');
let Bet = require('./scripts/bet');

let path = __dirname.replace('\server', '');

// Permet de relier des chemins statiques pour les autres fichiers.
app.use(express.static(path + '\client'));

// Emplacement du site.
app.get('/', (req, res) => {
  res.sendFile(path + '/client/index.html');
});

io.on('connection', (socket) => {

  Chat.dispatch_message(socket, io);

  Login.token_check(socket);
  Login.login(socket);
  Login.register(socket);

  Bet.get_balance(socket);

});

// Serveur écoute sur le port 3000.
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

let g = new Game(io);