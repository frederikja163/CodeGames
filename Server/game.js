const {Room, Player, Options} = require('./room');

class Game
{
    constructor(socket, room)
    {
        this.socket = socket;
        this.room = room;
        
        this.socket.startedGame(this.room);
    }

    addPlayer(socket)
    {
        
    }
}

module.exports = {
    Game
}