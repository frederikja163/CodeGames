class Server
{
    constructor(ip, port)
    {
        const socket = io(ip + ":" + port);
        
        let send = (message, arg1, arg2) =>
        {
            socket.emit(message, arg1, arg2);
        };
        socket.on("roomJoined", (room, rid) => this.onRoomJoined(room, rid));
        socket.on("playerJoined", (room, player) => this.onPlayerJoined(room, player));
        socket.on("playerLeft", (room, player) => this.onPlayerLeft(room, player));

        //======[Server protocol]======
        this.rid = null;

        //Incoming
        this.onRoomJoined = (room, rid) => {};
        this.onPlayerJoined = (room, player) => {};
        this.onPlayerLeft = (room, player) => {};

        //Outgoing
        this.joinRoom = (rid) => send("joinRoom", rid);
        this.changeName = (name) => send("changeName", name);
    }
}