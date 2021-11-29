
// Affiche les zéros des minutes et des heures.
function displayZero(nombre) {
    return nombre < 10 ? '0' + nombre : nombre;
}
  
  
// Chat (Reçoit un message et le renvoie à toute le monde).
let dispatch_message = function (socket, io) {
    socket.on('chat-msg', msg => {
        let now = new Date();
        msg['date'] = displayZero(now.getHours()) +':'+ displayZero(now.getMinutes());
        io.emit('chat-msg', msg);
    });
};


exports.dispatch_message = dispatch_message;