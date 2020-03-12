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

        Socket.startedGame = empty;
        Socket.socket.on("startedGame", () => Socket.startedGame());

        Socket.kickedPlayer = empty;
        Socket.socket.on("kickedPlayer", () => Socked.kickedPlayer());

        Socket.playerLeft = empty;
        Socket.socket.on("playerLeft", (room, pid) => Socket.playerLeft(room, pid));

        //Sending
        Socket.joinRoom = (rid) => Socket.socket.emit("joinRoom", rid);
        Socket.updateName = (name) => Socket.socket.emit("updateName", name);
        Socket.startGame = () => Socket.socket.emit("startGame");
        Socket.kickPlayer = (pid) => Socket.socket.emit("kickPlayer");
    }
}