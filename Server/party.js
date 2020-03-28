const {Lobby} = require("./lobby");
const {Game} = require("./game");
const {Room, Player, Options} = require("./room");

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
            var rid = generateID(num);
            while (parties.find(p => p.room.rid === rid) != null)
            {
                num++;
                rid = generateID(num);
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

function Random(min, max)
{
  	return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateID(number)
{
	const validChars = "abcdefghijklmnopqrstuvxyz1234567890";
	var str = "";
	for (var i = 0; i < number; i++)
	{
		var char = validChars.charAt(Random(0, validChars.length - 1));
		str += char;
	}
	return str;
}