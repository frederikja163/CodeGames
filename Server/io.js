const socketio = require("socket.io");

var io = socketio.listen(50464);

module.exports =
{
    io
}