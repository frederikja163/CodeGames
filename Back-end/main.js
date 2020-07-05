var io = require("socket.io").listen(9999);
var {Room} = require("./room.js");
var {Client} = require("./client.js");

io.on("connection", socket =>
{
    Room.OnConnected(new Client(socket));
});