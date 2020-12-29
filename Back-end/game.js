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

        this.ForeachClient(client => 
            {
                client.gameStarted(this.data);
            });
    }

    AddClient(client)
    {
        let playerInd = this.clients.findIndex(c => c.pid == client.pid);
        let player = this.data.players[playerInd];
        if (player.team == -1)
        {
            return;
        }
        client.onMarkWord = (index) => this.onMarkWord(client, index);
        client.onSelectWord = (index) => this.onSelectWord(client, index);
    }

    RemovePlayer(pid)
    {
        
    }

    onMarkWord(client, index)
    {
        let playerInd = this.clients.findIndex(c => c.pid == client.pid);
        let player = this.data.players[playerInd];
        if (player.team == 0 || player.spymaster)
        {
            return;
        }

        let markIndex = this.fullWords[index].marked.findIndex(pid => pid == client.pid);
        if (markIndex === -1)
        {
            this.fullWords[index].marked.push(client.pid);
            this.playerWords[index].marked.push(client.pid);
        }
        else
        {
            this.fullWords[index].marked.splice(markIndex, 1);
            this.playerWords[index].marked.splice(markIndex, 1);
        }

        this.ForeachClient(client => client.wordMarked(this.data, index));
    }

    onSelectWord(client, index)
    {
        let playerInd = this.clients.findIndex(c => c.pid == client.pid);
        let player = this.data.players[playerInd];
        if (player.team == 0 || player.spymaster)
        {
            return;
        }
        
        this.playerWords[index] = this.fullWords[index];
        this.ForeachClient(client => client.wordSelected(this.data, index));
    }

    ForeachClient(method)
    {
        for (let i = 0; i < this.clients.length; i++)
        {
            let player = this.data.players[i];
            if (player.team == -1)
            {
                continue;
            }
            else if (player.team == 0 || player.spymaster)
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