const {Room, Player, Options, Word} = require('./room');
const Random = require("./random");

const words = [
                "time",
                "year",
                "people",
                "way",
                "day",
                "man",
                "thing",
                "woman",
                "life",
                "child",
                "world",
                "school",
                "state",
                "family",
                "student",
                "group",
                "country",
                "problem",
                "hand",
                "part",
                "place",
                "case",
                "week",
                "company",
                "system",
                "program",
                "question",
                "work",
                "government",
                "number",
                "night",
                "point",
                "home",
                "water",
                "room",
                "mother",
                "area",
                "money",
                "story",
                "fact",
                "month",
                "lot",
                "right",
                "study",
                "book",
                "eye",
                "job",
                "word",
                "business",
                "issue",
                "side",
                "kind",
                "head",
                "house",
                "service",
                "friend",
                "father",
                "power",
                "hour",
                "game",
                "line",
                "end",
                "member",
                "law",
                "car",
                "city",
                "community",
                "name",
                "president",
                "team",
                "minute",
                "idea",
                "kid",
                "body",
                "information",
                "back",
                "parent",
                "face",
                "others",
                "level",
                "office",
                "door",
                "health",
                "person",
                "art",
                "war",
                "history",
                "party",
                "result",
                "change",
                "morning",
                "reason",
                "research",
                "girl",
                "guy",
                "moment",
                "air",
                "teacher",
                "force",
                "education"]

const width = 5;
const height = 5;

class Game
{
    constructor(socket, room)
    {
        this.room = room;
        
        this.state = "game";
        this.room.board = [];
        var txt = [];

        //Generate word list.
        for (var x = 0; x < width; x++)
        {
            this.room.board[x] = []
            for (var y = 0; y < height; y++)
            {
                //Make sure there are no duplicates.
                do
                {
                    txt[x * width + y] = Random.randomWord(words);
                } while(txt.findIndex(t => t === txt[x * width + y]) != x * width + y);

                var word = new Word(txt[x * width + y]);
                this.room.board[x][y] = word;
            }
        }

        function generateType(type, count)
        {
            for(var i = 0; i < count; i++)
            {
                var pos;
                do
                {
                    pos = Random.randomPosition(width, height);
                } while(this.room.board[pos.x, pos.y] != "white");
                this.room.board[pos.x, pos.y] = type;
            }
        }

        this.generateType("killer", 1);
        this.generateType("blue", 9);
        this.generateType("red", 8);

        socket.startedGame(this.room);
    }

    addPlayer(socket)
    {
    }
}

module.exports = {
    Game
}