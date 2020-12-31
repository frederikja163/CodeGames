var args = process.argv;
var port;
switch (args[2])
{
    case "dev":
    case "development":
        port = 9997;
        break;
    case "rel":
    case "release":
        port = 9999;
        break;
    case "loc":
    case "local":
        port = 9998;
        break;
    default:
        port = 9998;
}

var io = require("socket.io")(port);
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