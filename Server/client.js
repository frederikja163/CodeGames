const io = require("socket.io").listen(50464);

function roomJoined(sid, room)
{
    io.to(sid).emit("roomJoined", room);
}

function playerJoined(room, pid)
{
    for (var i = 0; i < room.players.length; i++)
    {
        io.to(room.players[i].pid).emit("playerJoined", room, pid);
    }
}

function updatedName(room, name)
{
    for (var i = 0; i < room.players.length; i++)
    {
        io.to(room.players[i].pid).emit("updatedName", room, name);
    }
}

function playerLeft(room, pid)
{
    for (var i = 0; i < room.players.length; i++)
    {
        io.to(room.players[i].pid).emit("playerLeft", room, pid);
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