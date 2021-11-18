const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;



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
  socket.on('chat-msg', msg => {
    let now = new Date();
    msg['date'] = displayZero(now.getHours()) +':'+ displayZero(now.getMinutes());
    io.emit('chat-msg', msg);
  });
});

// Serveur écoute sur le port 3000.
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});