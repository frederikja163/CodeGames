var io = require("socket.io").listen(9999);
var {Room} = require("./room.js");
var {Client} = require("./client.js");
var Command = require("./commands.js");

Room.rooms = [];
let clients = [];
io.on("connection", socket =>
{
    let client = new Client(socket);
    Room.OnConnected(client);
    let i = clients.length - 1;
    clients.push(client);
    socket.on("disconnect", () => clients.splice(i, 1));
});

Command.initialize(Room.rooms, clients);

/*TODO: Debug commands
    Fix clients command.
    Log [room] - Enables logging of all recieved and given messages.
    Room [room] - custom json string
    Memory - Lists memory size of all rooms combined


    Analytics
*/