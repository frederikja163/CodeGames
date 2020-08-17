var io = require("socket.io").listen(9999);
var {Room} = require("./room.js");
var {Client} = require("./client.js");
var Command = require("./commands.js");

Room.rooms = [];
let clients = [];
io.on("connection", socket =>
{
    let i = clients.length;
    let client = new Client(socket);
    clients.push(client);
    Room.OnConnected(client);
    socket.on("disconnect", () => clients.splice(i, 1));
});

Command.initialize(Room.rooms, clients);

//TODO: Security error: Can join other room if randomly generating 4 character long ID
/*TODO: Debug commands
    Log [room] - Enables logging of all recieved and given messages.
    Clients - Lists all clients connected to the server
    Room [room] - custom json string
    Memory - Lists memory size of all rooms combined


    Analytics
*/