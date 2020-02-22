const io = require("socket.io").listen(50464);
const server = require("./server");

io.on("connection", server.OnConnected);