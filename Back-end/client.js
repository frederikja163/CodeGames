class Client{
    constructor(socket)
    {
        let send = (message, arg1, arg2, arg3) =>{
            socket.emit(message, arg1, arg2, arg3);
        };
        socket.on("joinRoom", (rid) => this.onJoinRoom(rid));
        socket.on("leaveRoom", (rid) => this.onLeaveRoom(rid));
        socket.on("disconnect", () => this.onDisconnected());
        socket.on("setName", (name) => this.onSetName(name));

        //======[Server protocol]======
        this.socket = socket;
        this.pid = socket.id;
        this.room = null;

        //===[Global]===
        //From-Client
        this.onJoinRoom =       (rid) => {};
        this.onLeaveRoom =      () => {};
        this.onDisconnected =   () => {};
        //To-Client
        this.roomJoined =       (room, rid) => send("roomJoined", room, rid);
        this.roomLeft =         () => send("roomLeft");
        this.playerJoined =     (room, player) => send("playerJoined", room, player);
        this.playerLeft =       (room, player) => send("playerLeft", room, player);

        //===[Lobby]===
        //From-Client
        this.onSetName =        (name) => {};
        //To-Client
        this.nameChanged =      (room, player, name) => send("nameChanged", room, player, name);

        //===[Game]===
        //From-Client
        //To-Client
    }
}

module.exports =
{
    Client
}