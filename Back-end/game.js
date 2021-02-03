const {RoomData, PlayerData, Options, GameData, Word} = require("./data");

class Game
{
    constructor(data, clients)
    {
        this.data = data;
        this.clients = clients;
        
        this.data.game.activeTeam = 1;
        
        let options = this.data.options;
        let wordOptions = options.words.slice();
        this.fullWords = [];
        this.playerWords = [];
        let emptyWords = [];
        for (let i = 0; i < options.wordCount; i++)
        {
            let index = Math.floor(Math.random() * wordOptions.length);
            let word = wordOptions[index];
            this.fullWords[i] = new Word(word, 0, []);
            this.playerWords[i] = new Word(word, -2, this.fullWords[i].marked);
            emptyWords[i] = i;
            wordOptions.splice(index, 1);
        }

        let generateTeams = (team, count) =>
        {
            while (count-- > 0 && emptyWords.length != 0)
            {
                let emptyIndex = Math.floor(Math.random() * emptyWords.length);
                let index = emptyWords[emptyIndex];
                this.fullWords[index].team = team;
                emptyWords.splice(emptyIndex, 1);
            }
        }
        generateTeams(-1, options.teamWordCount[0]);
        for (let i = 1; i <= options.teamCount; i++)
        {
            generateTeams(i, options.teamWordCount[i]);
        }

        this.ForeachClient(client => 
            {
                client.gameStarted(this.data);
            });

        this.onGameEnded = (winner) => {};
    }

    AddClient(client)
    {
        let playerInd = this.clients.findIndex(c => c.pid == client.pid);
        let player = this.data.players[playerInd];
        if (player.team == -1)
        {
            this.data.game.words = null;
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
        if (this.isSpymastersTurn() || player.team != this.data.game.activeTeam)
        {
            return;
        }
        this.EndRound();
    }

    EndRound()
    {
        this.data.game.word = null;
        this.data.game.wordCount = null;
        do
        {
            this.data.game.activeTeam  += 1;
            if (this.data.game.activeTeam > this.data.options.teamCount)
            {
                this.data.game.activeTeam = 1;
            }
        } while (this.data.game.teamsOut.find(t => t === this.data.game.activeTeam))

        this.ForeachClient(client => client.roundEnded(this.data));
    }

    RemovePlayer(pid)
    {
        let playerInd = this.clients.findIndex(c => c.pid == pid);
        let player = this.data.players[playerInd];
        if (player.spymaster || !this.data.players.find(p => p.team === player.team && !p.spymaster && p.pid != pid))
        {
            // Draw.
            this.endGame(0);
        }
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
        }
        else
        {
            this.fullWords[index].marked.splice(markIndex, 1);
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
        let word = this.fullWords[index];
        this.playerWords[index] = word;
        word.selectedBy = player.team;
        for (let i = word.marked.length - 1; i >= 0; i--)
        {
            let markedPlayer = this.data.players.find(p => p.pid == word.marked[i]);
            if (markedPlayer.team === this.data.game.activeTeam)
            {
                word.marked.splice(i, 1);
            }
        }
        this.ForeachClient(client => client.wordSelected(this.data, index));
        if (!this.fullWords.find(w => w.team === player.team && w.selectedBy === null))
        {
            // Winner.
            this.endGame(this.data.game.activeTeam);
        }
        if (player.team != this.fullWords[index].team)
        {
            if (this.fullWords[index].team === -1)
            {
                this.data.game.teamsOut.push(this.data.game.activeTeam);
                this.ForeachClient(client => client.teamOut(this.data, this.data.game.activeTeam));
                if (this.data.game.teamsOut.length >= this.data.options.teamCount - 1)
                {
                    if (this.data.options.teamCount === 1)
                    {
                        this.endGame(0);
                        return;
                    }
                    // Last remaining team wins.
                    for (let i = 1; i <= this.data.options.teamCount; i++)
                    {
                        if (!this.data.game.teamsOut.find(t => t === i))
                        {
                            this.endGame(i);
                            return;
                        }
                    }
                }
            }
            this.EndRound();
        }
    }

    endGame(winner)
    {
        this.data.game = new GameData();
        this.data.players.forEach(p => {if (p.team === -1) p.team = 0;});
        this.clients.forEach(c => c.gameEnded(this.data, this.fullWords, winner));
        this.onGameEnded();
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
            if (player.team == 0 || player.spymaster)
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