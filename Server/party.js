const {Lobby} = require("./lobby");
const {Game} = require("./game");
const {Room, Player, Options, Word} = require("./room");
const {Random} = require("./random");

var parties = [];

class Party
{
    constructor(room, socket)
    {
        this.room = room;
        this.state = new Lobby(socket, room);
        this.addPlayer(socket);
    }

    addPlayer(socket)
    {
        var player = new Player(socket.id(), "PLAYER" + (this.room.players.length + 1));
        this.room.players.push(player);

        socket.playerJoined(this.room, socket.id());
        socket.roomJoined(this.room);

        this.state.addPlayer(socket);
        socket.startGame = () => this.startGame(socket);
        socket.disconnected = () => this.disconnected(socket);
    }

    startGame(socket)
    {
        if (socket.id() === this.room.players[0].pid)
        {
            socket.resetLobby();
            this.state = new Game(socket, this.room);
        }
    }

    disconnected(socket)
    {
        this.room.players = this.room.players.filter(p => p.pid != socket.id());

        socket.playerLeft(this.room, socket.id());
        
        if (this.room.players.length == 0)
        {
            parties = parties.filter(p => p.room.rid != this.room.rid);
        }
    }

    static joinRoom(socket, rid)
    {
        if(rid === "")
        {
            var num = 3;
            var rid = Random.generateID(num);
            while (parties.find(p => p.room.rid === rid) != null)
            {
                num++;
                rid = Random.generateID(num);
            }
            var room = new Room(rid);
        }
        else
        {
            var party = parties.find(p => p.room.rid === rid);
            if (party === undefined)
            {
                var room = new Room(rid);
            }
            else
            {
                party.addPlayer(socket);
                return;
            }
        }
        parties.push(new Party(room, socket));
    }
}

module.exports = {
    Party
}
