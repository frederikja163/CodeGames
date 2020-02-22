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
            var r = new Room(generateID(Random(3, 5)), new Player(this.socket.id, "player1"));
            rooms.push(r)
            client.roomJoined(this.socket.id, r);
        }
        else
        {
            for (var i = 0; i < rooms.length; i++)
            {
                if (rooms[i].id === rid)
                {
                    var player = new Player(this.socket.id, "player" + (rooms[i].players.length + 1))
                    rooms[i].players.push(player);

                    client.playerJoined(rooms[i], this.socket.id);
                    client.roomJoined(this.socket.id, rooms[i]);
                    return;
                }
            }
            var r = new Room(rid, new Player(this.socket.id, "player1"));
            rooms.push(r);
            client.roomJoined(this.socket.id, r);
        }
    }

    disconnect()
    {
        for (var i = 0; i < rooms.length; i++)
        {
            for(var j = 0; j < rooms[i].players.length; j++)
            {
                if (rooms[i].players[j].id == this.socket.id)
                {
                    rooms[i].players.splice(j, 1);

                    client.playerLeft(rooms[i], this.socket.id);
                    
                    if (rooms[i].players.length == 0)
                    {
                        rooms.splice(i, 1);
                    }
                    return;
                }
            }
        }
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