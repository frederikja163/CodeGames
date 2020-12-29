const {RoomData, PlayerData, Options, Word} = require("./data");

class Game
{
    constructor(data, clients)
    {
        this.data = data;
        this.clients = clients;

        let wordOptions = this.data.options.words.slice();
        let words = [];
        for (let i = 0; i < 25; i++)
        {
            let index = Math.floor(Math.random() * wordOptions.length);
            words[i] = new Word(wordOptions[index], Math.floor(Math.random() * 5 - 2));
            wordOptions.splice(index, 1);
        }
        this.fullWords = words.slice();
        
        this.data.words = words;
        
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].gameStarted(this.data);
        }
    }

    AddClient(client)
    {
    }

    RemovePlayer(pid)
    {
        
    }
}

module.exports =
{
    Game
}