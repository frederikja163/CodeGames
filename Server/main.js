const io = require("socket.io").listen(50464);

io.on("connection", (socket) =>
{
	socket.on("JoinRoom", (id) =>
	{
		if(id === "")
		{
			socket.emit('RoomJoined', new Room(generateID(Random(3, 5)), new Player(socket.id, "player" + 1)));
		}
		else
		{
			socket.emit('RoomJoined', new Room(id, new Player(socket.id, "player" + 1)));
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