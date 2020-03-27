const {Lobby} = require("./lobby");
const {Game} = require("./game");
const {Party} = require("./party");
const io = require("./io");

exports.OnConnected = (s) =>
{
    var socket = new Socket(s);
    socket.joinRoom = joinRoom;
}

class Socket
{
    constructor(socket)
    {
        this.socket = socket;
        this.id = () => this.socket.id;

        this.resetLobby();
    }

    resetLobby()
    {
        var empty = () => {};
        //Recieving
        this.joinRoom = empty;
        this.socket.on("joinRoom", (rid) => this.joinRoom(this, rid));

        this.updateName = empty;
        this.socket.on("updateName", (name) => this.updateName(this, name));

        this.startGame = empty;
        this.socket.on("startGame", () => this.startGame(this));

        this.kickPlayer = empty;
        this.socket.on("kickPlayer", (pid) => this.kickPlayer(this, pid));

        this.disconnected = empty;
        this.socket.on("disconnect", () => this.disconnected(this));

        //Sending
        this.roomJoined = (room) => this.sendToClient(this.id(), "roomJoined", room);
        this.playerJoined = (room, pid) => this.sendToRoom("playerJoined", room, pid);
        this.updatedName = (room, name) => this.sendToRoom("updatedName", room, name);
        this.startedGame = (room) => this.sendToRoom("startedGame", room);
        this.disconnect = (sid) => io.disconnect(sid);
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