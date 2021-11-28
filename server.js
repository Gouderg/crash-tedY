const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

var Chat = require('./chat');
var Login = require('./login');

// Permet de relier des chemins statiques pour les autres fichiers.
app.use(express.static(__dirname + '/public'));

// Emplacement du site.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {

  Chat.dispatch_message(socket, io);

  Login.token_check(socket);
  Login.login(socket);
  Login.register(socket);

});

// Serveur écoute sur le port 3000.
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});