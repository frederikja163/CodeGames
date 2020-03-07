class Socket
{
    static initialiaze()
    {
        Socket.socket = io("http://95.217.87.22:50464");
        Socket.id = () => Socket.socket.id;

        var empty = () => {};

        //Recieving
        Socket.roomJoined = empty;
        Socket.socket.on("roomJoined", (room) => Socket.roomJoined(room));

        Socket.playerJoined = empty;
        Socket.socket.on("playerJoined", (room, pid) => Socket.playerJoined(room, pid));

        Socket.updatedName = empty;
        Socket.socket.on("updatedName", (room, name) => Socket.updatedName(room, name));

        Socket.playerLeft = empty;
        Socket.socket.on("playerLeft", (room, pid) => Socket.playerLeft(room, pid));

        //Sending
        Socket.joinRoom = (rid) => Socket.socket.emit('joinRoom', rid);
        Socket.updateName = (name) => Socket.socket.emit("updateName", name);
    }
}