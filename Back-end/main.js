var io = require("socket.io").listen(9999);
var {Room} = require("./room.js");
var {Client} = require("./client.js");
var Command = require("./commands.js");

Room.rooms = [];
io.on("connection", socket =>
{
    Room.OnConnected(new Client(socket));
});

Command.initialize(Room.rooms);

/*TODO: Debug commands
    Fix clients command.
    Log [room] - Enables logging of all recieved and given messages.
    Room [room] - custom json string
    Memory - Lists memory size of all rooms combined


    Analytics
*/