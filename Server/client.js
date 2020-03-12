const io = require("socket.io").listen(50464);

exports.roomJoined = (sid, room) =>
{
    io.to(sid).emit("roomJoined", room);
}

exports.playerJoined = (room, pid) =>
{
    for (var i = 0; i < room.players.length; i++)
    {
        io.to(room.players[i].pid).emit("playerJoined", room, pid);
    }
}

exports.updatedName = (room, name) =>
{
    for (var i = 0; i < room.players.length; i++)
    {
        io.to(room.players[i].pid).emit("updatedName", room, name);
    }
}

exports.startedGame = (room) =>
{
    for (var i = 0; i < room.players.length; i++)
    {
        io.to(room.players[i].pid).emit("startedGame");
    }
}

exports.kickedPlayer = (sid) =>
{
    io.to(sid).emit("kickedPlayer");
}

exports.playerLeft = (room, pid) =>
{
    for (var i = 0; i < room.players.length; i++)
    {
        io.to(room.players[i].pid).emit("playerLeft", room, pid);
    }
}

exports.on = (str, callbck) =>
{
    io.on(str, callbck);
}