const {Lobby} = require("./lobby");
const io = require("./io");

exports.OnConnected = (socket) =>
{
    var client = new Client(socket);
    var lobby = new Lobby(client);
}

class Client
{
    constructor(socket)
    {
        this.socket = socket;
        this.id = () => this.socket.id;

        var empty = () => {};

        //Recieving
        this.joinRoom = empty;
        this.socket.on("joinRoom", (rid) => this.joinRoom(rid));

        this.updateName = empty;
        this.socket.on("updateName", (name) => this.updateName(name));

        this.startGame = empty;
        this.socket.on("startGame", () => this.startGame());

        this.kickPlayer = empty;
        this.socket.on("kickPlayer", (pid) => this.kickPlayer(pid));

        this.disconnect = empty;
        this.socket.on("disconnect", () => this.disconnect());

        //Sending
        this.roomJoined = (room) => this.sendToClient(this.id(), "roomJoined", room);
        this.playerJoined = (room, pid) => this.sendToRoom("playerJoined", room, pid);
        this.updatedName = (room, name) => this.sendToRoom("updatedName", room, name);
        this.startedGame = (room) => this.sendToRoom("startedGame", room);
        this.kickedPlayer = (sid) => this.sendToClient(sid, "kickedPlayer");
        this.playerLeft = (room, pid) => this.sendToRoom("playerLeft", room, pid);
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