const io = require("socket.io").listen(50464);
const {Room, Player, Options} = require('./room');
var rooms = [];

io.on("connection", (socket) =>
{
	socket.on("JoinRoom", (id) =>
	{
		if(id === "")
		{
			socket.emit("RoomJoined", new Room(generateID(Random(3, 5)), new Player(socket.id, "player1")));
		}
		else
		{
			for (var i = 0; i < rooms.length; i++)
			{
				if (rooms[i].id === id)
				{
					var player = new Player(socket.id, "player" + rooms.players.length)
					for(var j = 0; i < rooms.length; j++)
					{
						io.to(rooms[i].players[j]).emit("PlayerJoined", player);
					}

					rooms[i].players.push(player);
					socket.emit("RoomJoined", rooms[i]);
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