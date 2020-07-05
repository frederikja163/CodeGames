class Client{
    constructor(socket)
    {
        let send = (message, arg1, arg2, arg3) =>{
            socket.emit(message, arg1, arg2, arg3);
        };
        socket.on("roomJoin", (rid) => this.onJoinRoom(rid));
        socket.on("disconnect", () => this.onDisconnected());
        socket.on("nameChange", (name) => this.onNameChange(name));

        //======[Server protocol]======
        this.pid = socket.id;
        this.room = null;

        //Incoming
        this.onRoomJoin = (rid) => {};
        this.onDisconnected = () => {};
        this.onNameChange = (name) => {};

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