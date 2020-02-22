const io = require("socket.io").listen(50464);

function roomJoined(sid, room)
{
    io.to(sid).emit("RoomJoined", room);
}

function playerJoined(room, pid)
{
    for (var i = 0; i < room.players.length; i++)
    {
        io.to(room.players[i].id).emit("PlayerJoined", room, pid);
    }
}

function playerLeft(room, pid)
{
    for (var i = 0; i < room.players.length; i++)
    {
        io.to(room.players[i].id).emit("PlayerLeft", room, pid);
    }
}

module.exports =
{
    roomJoined,
    playerJoined,
    playerLeft
}