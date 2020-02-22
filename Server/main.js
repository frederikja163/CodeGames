const io = require("./client");
const server = require("./server");

io.on("connection", server.OnConnected);