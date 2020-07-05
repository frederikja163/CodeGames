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

        //======[Server protocol]======
        this.rid = null;
        this.room = null;

        //Outgoing
        this.joinRoom = (rid) => send("joinRoom", rid);
        
        //Incoming
        this.onRoomJoined = (room, rid) => {};
    }
}