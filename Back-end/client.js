class Client{
    constructor(socket)
    {
        let send = (message, arg1, arg2, arg3) =>{
            socket.emit(message, arg1, arg2, arg3);
        };
        socket.on("joinRoom", (rid) => this.onJoinRoom(rid));
        socket.on("disconnect", () => this.onDisconnected());
        socket.on("setName", (name) => this.onSetName(name));

        //======[Server protocol]======
        this.pid = socket.id;
        this.room = null;

        //Incoming
        this.onJoinRoom = (rid) => {};
        this.onDisconnected = () => {};
        this.onSetName = (name) => {};

        //Outgoing
        this.roomJoined = (room, rid) => send("roomJoined", room, rid);
        this.playerJoined = (room, player) => send("playerJoined", room, player);
        this.playerLeft = (room, player) => send("playerLeft", room, player);
        this.nameChanged = (room, player, name) => send("nameChanged", room, player, name);
    }
}

module.exports =
{
    Client
}