const io = require("./io");
const server = require("./server");

io.on("connection", server.OnConnected);