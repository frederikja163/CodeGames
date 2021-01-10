const {RoomData, PlayerData, Options, GameData, Word} = require("./data");

class Game
{
    constructor(data, clients)
    {
        this.data = data;
        this.clients = clients;

        this.data.game = new GameData();

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
            words[i] = new Word(words[i].word, Math.floor(Math.random() * 4 - 1));
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
        if (this.isSpymastersTurn())
        {
            return;
        }
        this.data.game.word = word;
        this.data.game.wordCount = wordCount;
        this.ForeachClient(c => {c.wordGiven(this.data)});
    }

    onEndRound(client)
    {
        if (!this.isSpymastersTurn())
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
        if (this.data.game.activeTeam == this.data.options.teamCount)
        {
            this.data.game.activeTeam = 1;
        }
    }

    RemovePlayer(pid)
    {
        
    }

    onMarkWord(client, index)
    {
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
        if (this.isSpymastersTurn())
        {
            return;
        }
        else if (player.team != this.data.game.activeTeam)
        {
            this.EndRound();
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
        return this.data.game.word != null || this.data.game.wordCount != null;
    }
}

module.exports =
{
    Game
}