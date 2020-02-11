const io = require("socket.io").listen(50464);
const {Room, Player, Options} = require('./room');
var rooms = [];

io.on("connection", (socket) =>
{
	socket.on("JoinRoom", (id) =>
	{
		if(id === "")
		{
			var r = new Room(generateID(Random(3, 5)), new Player(socket.id, "player1"));
			rooms.push(r)
			socket.emit("RoomJoined", r);
		}
		else
		{
			for (var i = 0; i < rooms.length; i++)
			{
				if (rooms[i].id === id)
				{
					var player = new Player(socket.id, "player" + rooms[i].players.length)
					for(var j = 0; j < rooms[i].players.length; j++)
					{
						io.to(rooms[i].players[j]).emit("PlayerJoined", player);
					}

					rooms[i].players.push(player);
					socket.emit("RoomJoined", rooms[i]);
					return;
				}
			}
			var r = new Room(id, new Player(socket.id, "player1"));
			rooms.push(r);
			socket.emit("RoomJoined", r);
		}
	});

	socket.on("disconnect", () =>
	{
		for (var i = 0; i < rooms.length; i++)
		{
			for(var j = 0; j < rooms[i].players.length; j++)
			{
				if (rooms[i].players[j].id == id)
				{
					rooms[i].players.removeAt(j);
					for (var k = 0; k < rooms[i].players.length; k--)
					{
						io.to(rooms[i].players[j]).emit("PlayerLeft", socket.id);
					}
					return;
				}
			}
		}
	});
});

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