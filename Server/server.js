const {Lobby} = require("./lobby");

exports.OnConnected = (socket) =>
{
    var lobby = new Lobby(socket);

    socket.on("joinRoom", (roomId) => {
        lobby.joinRoom(roomId)
    
        socket.on("updateName", (name) => lobby.updateName(name));
    
        socket.on("startGame", () => lobby.startGame());

        socket.on("kickPlayer", (pid) => lobby.kickPlayer(pid));

        socket.on("disconnect", () => lobby.disconnect());
    });
}