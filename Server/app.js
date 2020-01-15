const io = require("socket.io").listen(50463);

io.on("connection", function(socket)
  {
    console.log("user connected");
    socket.emit("welcome", "Fuck dig simon");
  }
);
