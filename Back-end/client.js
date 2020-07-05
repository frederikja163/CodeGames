class Client{
    constructor(socket)
    {
        let send = (message, arg1, arg2) =>{
            socket.emit(message, arg1, arg2);
            console.log(message);
        };
        socket.on("joinRoom", (rid) => this.onJoinRoom(this, rid))

        //======[Server protocol]======
        this.pid = socket.id;

        //Incoming
        this.onJoinRoom = (client, rid) => {};

        //Outgoing
        this.roomJoined = (room, rid) => send("roomJoined", room, rid);
    }
}

module.exports =
{
    Client
}