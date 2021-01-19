const {RoomData, PlayerData, Options, GameData, Word} = require("./data");

class Game
{
    constructor(data, clients)
    {
        this.data = data;
        this.clients = clients;

        this.data.game = new GameData();

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
        if (player.spymaster)
        {
            client.onGiveWord = (word, wordCount) => this.onGiveWord(client, word, wordCount);
        }
        else if (player.team != 0)
        {
            client.onMarkWord = (index) => this.onMarkWord(client, index);
            client.onSelectWord = (index) => this.onSelectWord(client, index);
            client.onEndRound = () => this.onEndRound(client);
        }
    }

    onGiveWord(client, word, wordCount)
    {
        if (!this.isSpymastersTurn())
        {
            return;
        }
        this.data.game.word = word;
        this.data.game.wordCount = wordCount;
        this.ForeachClient(c => {c.wordGiven(this.data)});
    }

    onEndRound(client)
    {
        let playerInd = this.clients.findIndex(c => c.pid == client.pid);
        let player = this.data.players[playerInd];
        if (this.isSpymastersTurn())
        {
            return;
        }
        this.EndRound();
    }

    EndRound()
    {
        this.data.game.word = null;
        this.data.game.wordCount = null;
        this.data.game.activeTeam  += 1;
        if (this.data.game.activeTeam > this.data.options.teamCount)
        {
            this.data.game.activeTeam = 1;
        }

        this.ForeachClient(client => client.roundEnded(this.data));
    }

    RemovePlayer(pid)
    {
        
    }

    onMarkWord(client, index)
    {
        if (index < 0 || index >= this.fullWords.length)
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
        if (index < 0 || index >= this.fullWords.length)
        {
            return;
        }

        let playerInd = this.clients.findIndex(c => c.pid == client.pid);
        let player = this.data.players[playerInd];
        if (this.isSpymastersTurn() || player.team != this.data.game.activeTeam)
        {
            return;
        }
        this.playerWords[index] = this.fullWords[index];
        this.ForeachClient(client => client.wordSelected(this.data, index));
        if (player.team != this.fullWords[index].team)
        {
            this.EndRound();
        }
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
                this.data.game.words = this.fullWords;
            }
            else
            {
                this.data.game.words = this.playerWords;
            }
            method(this.clients[i]);
        }
    }

    isSpymastersTurn()
    {
        return this.data.game.word === null && this.data.game.wordCount === null;
    }
}

module.exports =
{
    Game
}