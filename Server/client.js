const io = require("socket.io").listen(50464);

function roomJoined(sid, room)
{
    io.to(sid).emit("roomJoined", room);
}

function playerJoined(room, pid)
{
    for (var i = 0; i < room.players.length; i++)
    {
        io.to(room.players[i].id).emit("playerJoined", room, pid);
    }
}

function playerLeft(room, pid)
{
    for (var i = 0; i < room.players.length; i++)
    {
        io.to(room.players[i].id).emit("playerLeft", room, pid);
    }
}

function on(str, callbck)
{
    io.on(str, callbck);
}

module.exports =
{
    roomJoined,
    playerJoined,
    playerLeft,
    on
}