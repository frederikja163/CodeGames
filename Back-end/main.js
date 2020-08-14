var io = require("socket.io").listen(9999);
var {Room} = require("./room.js");
var {Client} = require("./client.js");
var Command = require("./commands.js");

io.on("connection", socket =>
{
    Room.OnConnected(new Client(socket));
});
Room.rooms = [];

Command.initialize(Room.rooms);

//TODO: Security error: Can join other room if randomly generating 4 character long ID
/*TODO: Debug commands
    Rooms - Lists all rooms by id and room count
    Room [Id] - Lists information about a single room
    Memory - Lists memory size of all rooms combined


    Analytics
*/