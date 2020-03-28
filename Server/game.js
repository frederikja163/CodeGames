const {Room, Player, Options, Word} = require('./room');
const Random = require("./random");

const words = ["bunny", "rabbit", "england", "london"];

class Game
{
    constructor(socket, room)
    {
        this.room = room;
        
        this.state = "game";
        this.room.board = []
        for (var x = 0; x < 5; x++)
        {
            this.room.board[x] = []
            for (var y = 0; y < 5; y++)
            {
                var txt = Random.randomWord(words);
                var word = new Word(txt);
                this.room.board[x][y] = word;
            }
        }

        socket.startedGame(this.room);
    }

    addPlayer(socket)
    {
    }
}

module.exports = {
    Game
}