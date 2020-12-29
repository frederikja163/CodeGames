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
            words[i] = new Word(wordOptions[index], -2);
            wordOptions.splice(index, 1);
        }
        this.playerWords = words.slice();
        
        for (let i = 0; i < 25; i++)
        {
            words[i] = new Word(words[i].word, Math.floor(Math.random() * 5 - 2));
        }
        this.fullWords = words.slice();

        this.ForeachClient(client => client.gameStarted(this.data));
    }

    AddClient(client)
    {

    }

    RemovePlayer(pid)
    {
        
    }

    ForeachClient(method)
    {
        for (let i = 0; i < this.clients.length; i++)
        {
            let player = this.data.players[i];
            if (player.team == 0 || player.spymaster)
            {
                this.data.words = this.fullWords;
            }
            else
            {
                this.data.words = this.playerWords;
            }
            method(this.clients[i]);
        }
    }
}

module.exports =
{
    Game
}