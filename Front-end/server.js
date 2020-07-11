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
        socket.on("roomLeft", () => this.onRoomLeft());
        socket.on("playerJoined", (room, player) => this.onPlayerJoined(room, player));
        socket.on("playerLeft", (room, player) => this.onPlayerLeft(room, player));

        socket.on("nameChanged", (room, player, name) => this.onNameChanged(room, player, name));

        //======[Server protocol]======
        this.room = null;
        this.rid = null;

        //===[Global]===
        //From-Server
        this.onRoomJoined =     (room, rid) => {};
        this.onRoomLeft =       () => {};
        this.onPlayerJoined =   (room, player) => {};
        this.onPlayerLeft =     (room, player) => {};
        //To-Server
        this.joinRoom =         (rid) => send("joinRoom", rid);
        this.leaveRoom =        () => send("leaveRoom");
        
        //===[Lobby]===
        //From-Server
        this.onNameChanged =    (room, player, name) => {};
        //To-Server
        this.setName =          (name) => send("setName", name);

        //===[Game]==
        //From-Server
        //To-Server
    }
}
