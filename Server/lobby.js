const {Room, Player, Options} = require('./room');
var rooms = [];

class Lobby
{
    constructor(socket)
    {
        this.socket = socket;
        
        this.socket.joinRoom = (rid) =>
        {
            this.joinRoom(rid);
            this.socket.updateName = (name) => this.updateName(name);
            
            this.socket.startGame = () => this.startGame();
            
            this.socket.kickPlayer = (pid) => this.kickPlayer(pid);
            
            this.socket.disconnect = () => this.disconnect();
        }
    }

    joinRoom(rid)
    {
        if(rid === "")
        {
            var num = 3;
            var rid = generateID(num);
            while (rooms.find(r => r.rid = rid) != null)
            {
                num++;
                rid = generateID(num);
            }
            this.room = new Room(rid, new Player(this.socket.id(), "PLAYER1"));
        }
        else
        {
            for (var i = 0; i < rooms.length; i++)
            {
                if (rooms[i].rid === rid)
                {
                    this.room = rooms[i];
                    var player = new Player(this.socket.id(), "PLAYER" + (this.room.players.length + 1))
                    this.room.players.push(player);

                    this.socket.playerJoined(this.room, this.socket.id());
                    this.socket.roomJoined(this.room);
                    return;
                }
            }
            this.room = new Room(rid, new Player(this.socket.id(), "PLAYER1"));
        }
        rooms.push(this.room);
        this.socket.roomJoined(this.room);
    }

    updateName(name)
    {
        if (name.length <= 15)
        {
            var player = this.room.players.find(p => p.pid === this.socket.id());
            player.name = name;
            this.socket.updatedName(this.room, name);
        }
    }

    startGame()
    {
        if (this.room.players[0].pid === this.socket.id())
        {
            this.socket.startedGame(this.room);
        }
    }

    kickPlayer(pid)
    {
        if (this.room.players[0].pid == this.socket.id())
        {
            var player = this.room.players.find(p => p.pid == pid);
            if (pid == undefined)
            {   
                this.socket.kickPlayer(pid);
                this.room.players = this.room.filter(p => p.pid == pid);
                this.socket.playerLeft(this.room, pid);
            }
        }
    }

    disconnect()
    {
        this.room.players = this.room.players.filter(p => p.pid != this.socket.id());

        this.socket.playerLeft(this.room, this.socket.id());
        
        if (this.room.players.length == 0)
        {
            rooms = rooms.filter(r => r.rid != this.room.rid);
        }
        return;
    }
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

module.exports = {
    Lobby
}