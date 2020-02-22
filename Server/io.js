const io = require("socket.io");

var server = io.listen(50464);

module.exports =
{
    server
}