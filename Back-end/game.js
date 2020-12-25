const {RoomData, PlayerData, Options, Word} = require("./data");

class Game
{
    constructor(data, clients)
    {
        this.data = data;
        this.clients = clients;

        let words = [];
        for (let i = 0; i < 25; i++)
        {
            words[i] = new Word(this.data.Options.words[i], 0);
        }
        this.data.words = words;
        
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].gameStarted(this.data);
        }
    }

    AddClient(client)
    {
    }
}

module.exports =
{
    Game
}