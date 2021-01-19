const {RoomData, PlayerData, Options, Word} = require("./data");

class Game
{
    constructor(data, clients)
    {
        this.data = data;
        this.clients = clients;

        let wordOptions = this.data.options.words.slice();
        this.fullWords = [];
        this.playerWords = [];
        let emptyWords = [];
        for (let i = 0; i < 25; i++)
        {
            let index = Math.floor(Math.random() * wordOptions.length);
            let word = wordOptions[index];
            this.playerWords[i] = new Word(word, -2);
            this.fullWords[i] = new Word(word, 0);
            emptyWords[i] = i;
            wordOptions.splice(index, 1);
        }

        let generateTeams = (count, team) =>
        {
            while (count-- > 0 && emptyWords.length != 0)
            {
                let emptyIndex = Math.floor(Math.random() * emptyWords.length);
                let index = emptyWords[emptyIndex];
                this.fullWords[index].team = team;
                emptyWords.splice(emptyIndex, 1);
            }
        }
        generateTeams(6, 1);
        generateTeams(5, 2);
        generateTeams(3, 3);
        generateTeams(1, -1);

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
        if (player.team == 0 || player.spymaster || index < 0 || index >= this.fullWords.length)
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
        if (player.team == 0 || player.spymaster || index < 0 || index >= this.fullWords.length)
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