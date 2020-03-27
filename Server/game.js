const {Room, Player, Options} = require('./room');

class Game
{
    constructor(socket, room)
    {
        this.room = room;
        
        socket.startedGame(this.room);
    }

    addPlayer(socket)
    {
    }
}

module.exports = {
    Game
}