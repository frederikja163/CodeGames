class Server
{
    constructor(ip, port)
    {
        const socket = io(ip + ":" + port);
        
        let send = (message, arg1, arg2, arg3) =>
        {
            socket.emit(message, arg1, arg2, arg3);
        };
        socket.on("roomJoined", (room, rid) => this.onRoomJoined(room, rid));
        socket.on("playerJoined", (room, player) => this.onPlayerJoined(room, player));
        socket.on("playerLeft", (room, player) => this.onPlayerLeft(room, player));
        socket.on("nameChanged", (room, player, name) => this.onNameChanged(room, player, name));

        //======[Server protocol]======
        this.rid = null;

        //Incoming
        this.onRoomJoined = (room, rid) => {};
        this.onPlayerJoined = (room, player) => {};
        this.onPlayerLeft = (room, player) => {};
        this.onNameChanged = (room, player, name) => {};

        //Outgoing
        this.roomJoin = (rid) => send("roomJoin", rid);
        this.nameChange = (name) => send("nameChange", name);
    }
}
