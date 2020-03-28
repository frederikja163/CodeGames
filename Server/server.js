const {Party} = require("./party");
const io = require("./io");

exports.OnConnected = (s) =>
{
    var socket = new Socket(s);
    socket.joinRoom = (rid) => 
    {
        Party.joinRoom(socket, rid);
        socket.joinRoom = () => { };
    }
}

class Socket
{
    constructor(socket)
    {
        this.socket = socket;
        this.id = () => this.socket.id;

        this.resetAll();
    }

    resetAll()
    {
        this.resetLobby();
        this.resetGame();

        var empty = () => {};

        //Recieving
        this.startGame = empty;
        this.socket.on("startGame", () => this.startGame());

        this.joinRoom = empty;
        this.socket.on("joinRoom", (rid) => this.joinRoom(rid));

        this.disconnected = empty;
        this.socket.on("disconnect", () => this.disconnected());
        
        //Sending
        this.roomJoined = (room) => this.sendToClient(this.id(), "roomJoined", room);
        this.playerJoined = (room, pid) => this.sendToRoom("playerJoined", room, pid);
        this.startedGame = (room) => this.sendToRoom("startedGame", room);
        this.playerLeft = (room, pid) => this.sendToRoom("playerLeft", room, pid);
    }

    resetLobby()
    {
        var empty = () => {};

        //Recieving
        this.updateName = empty;
        this.socket.on("updateName", (name) => this.updateName(name));

        this.kickPlayer = empty;
        this.socket.on("kickPlayer", (pid) => this.kickPlayer(pid));

        //Sending
        this.updatedName = (room, name) => this.sendToRoom("updatedName", room, name);
        this.disconnect = (sid) => io.disconnect(sid);
    }

    resetGame()
    {
        var empty = () => {};

        //Recieving
        //Sending
    }

    sendToRoom(protocol, room, param1)
    {
        room.players.forEach(p => io.emit(p.pid, protocol, room, param1));
    }

    sendToClient(sid, protocol, param1)
    {
        io.emit(sid, protocol, param1);
    }
}