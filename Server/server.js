const {Lobby} = require("./lobby");

function OnConnected(socket)
{
    var lobby = new Lobby(socket);

    socket.on("joinRoom", (roomId) => lobby.joinRoom(roomId));

	socket.on("disconnect", () => lobby.disconnect());
}

module.exports =
{
    OnConnected
}