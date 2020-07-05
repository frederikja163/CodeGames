class Client{
    constructor(socket)
    {
        let send = (message, arg1, arg2) =>{
            socket.emit(message, arg1, arg2);
        };
        socket.on("joinRoom", (rid) => this.onJoinRoom(rid));
        socket.on("disconnect", () => this.onDisconnected());

        //======[Server protocol]======
        this.pid = socket.id;
        this.room = null;

        //Incoming
        this.onJoinRoom = (client, rid) => {};
        this.onDisconnected = (client) => {};

        //Outgoing
        this.roomJoined = (room, rid) => send("roomJoined", room, rid);
        this.playerJoined = (room, player) => send("playerJoined", room, player);
        this.playerLeft = (room, player) => send("playerLeft", room, player);
    }
}

module.exports =
{
    Client
}