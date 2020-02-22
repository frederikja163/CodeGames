const {Room, Player, Options} = require('./room');
const client = require('./client');
var rooms = [];

class Lobby
{
    constructor(socket)
    {
        this.socket = socket;
    }

    joinRoom(rid)
    {
        if(rid === "")
        {
            this.room = new Room(generateID(Random(3, 5)), new Player(this.socket.id, "PLAYER1"));
        }
        else
        {
            for (var i = 0; i < rooms.length; i++)
            {
                if (rooms[i].id === rid)
                {
                    this.room = rooms[i].id;
                    var player = new Player(this.socket.id, "PLAYER" + (this.room.players.length + 1))
                    this.room.players.push(player);

                    client.playerJoined(this.room, this.socket.id);
                    client.roomJoined(this.socket.id, this.room);
                    return;
                }
            }
            this.room = new Room(rid, new Player(this.socket.id, "PLAYER1"));
        }
        rooms.push(this.room);
        client.roomJoined(this.socket.id, this.room);
    }

    updateName(name)
    {
        for (var i = 0; i < this.room.players.length; i++)
        {
            if (this.socket.id === this.room.players[i].id)
            {
                this.room.players[i].name = name;

                client.updatedName(this.room, name);
            }
        }
    }
    
    disconnect()
    {
        this.room.players.splice(j, 1);

        client.playerLeft(this.room, this.socket.id);
        
        if (this.room.players.length == 0)
        {
            rooms.splice(i, 1);
        }
        return;
    }
    
}

module.exports =
{
    Lobby
};

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