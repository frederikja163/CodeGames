const io = require("socket.io").listen(50464);

exports.on = (protocol, callbck) => io.on(protocol, callbck);

exports.emit = (sid, protocol, param1, param2) => io.to(sid).emit(protocol, param1, param2);