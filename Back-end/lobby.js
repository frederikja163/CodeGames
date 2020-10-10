class Lobby
{
    constructor(data, clients)
    {
        this.data = data;
        this.clients = clients;
    }

    AddClient(client)
    {
        client.onSetName = (name) => this.onSetName(client, name);
        client.onKickPlayer = (pid, reason) => this.onKickPlayer(client, pid, reason);
        client.onSetWords = (words) => this.onSetWords(client, words);
        client.onAddWords = (words) => this.onAddWords(client, words);
        client.onRemoveWords = (words) => this.onRemoveWords(client, words);
        client.onSetTeam = (pid, team) => this.onSetTeam(client, pid, team);
        client.onSetTeamCount = (count) => this.onSetTeamCount(client, count);
        client.onSetSpymaster = (team, pid) => this.onSetSpymaster(client, team, pid);
    }

    RemovePlayer(pid)
    {
        let player = this.data.players.find(p => p.pid === pid);
        if (player.spymaster)
        {
            let newSpymaster = this.data.players.find(p => p.team === player.team && p.pid != pid);
            if (newSpymaster != null)
            {
                newSpymaster.spymaster = true;
                this.spymasterChanged(newSpymaster.pid);
            }
        }
    }
    
    onSetName(client, name)
    {
        let player = this.data.players.find(p => p.pid == client.pid);
        player.name = name;
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].nameChanged(this.data, player.pid, name);
        }
    }

    onKickPlayer(client, pid, reason)
    {
        let playerInd = this.data.players.findIndex(p => p.pid === pid);
        if (!this.isOwner(client) || playerInd == -1 || client.pid === pid)
        {
            return;
        }
        this.RemovePlayer(pid);
        this.data.players.splice(playerInd, 1);
        let kickedPlayer = this.clients.splice(playerInd, 1)[0];
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].playerKicked(this.data, pid, reason);
        }
        kickedPlayer.playerKicked(this.data, pid, reason);
        kickedPlayer.reset();
    }
    
    onSetWords(client, words)
    {
        if (!this.isOwner(client)){
            return;
        }
        this.data.options.words = words;
        this.wordsChanged(words);
    }

    onAddWords(client, words)
    {
        if (!this.isOwner(client)){
            return;
        }
        this.data.options.words = this.data.options.words.concat(words);
        this.wordsChanged(words);
    }

    onRemoveWords(client, words)
    {
        if (!this.isOwner(client)){
            return;
        }
        this.data.options.words = this.data.options.words.filter(w => !words.includes(w));
        this.wordsChanged(words);
    }

    onSetTeam(client, pid, team)
    {
        let player = this.data.players.find(p => p.pid === pid);
        if (!this.isOwner(client) || player === undefined || team < 0 || team > this.data.options.teamCount){
            return;
        }
        if (player.spymaster)
        {
            let newSpymaster = this.data.players.find(p => p.team === player.team && p.pid != pid);
            player.spymaster = false;
            if (newSpymaster != undefined)
            {
                newSpymaster.spymaster = true;
                this.spymasterChanged(newSpymaster.pid);
            }
        }
        player.team = team;
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].teamChanged(this.data, pid);
        }
        if (this.findSpymaster(team) === undefined && team > 0){
            player.spymaster = true;
            this.spymasterChanged(player.pid);
        }
    }

    onSetTeamCount(client, count)
    {
        if (!this.isOwner(client) || count < 1){
            return;
        }
        for (let i = 0; i < this.data.players.length; i++)
        {
            let player = this.data.players[i];
            if (player.team > count){
                player.team = 0;
                player.spymaster = false;
                for (let i = 0; i < this.clients.length; i++)
                {
                    this.clients[i].teamChanged(this.data, player.pid);
                }
            }
        }
        this.data.options.teamCount = count;
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].teamCountChanged(this.data);
        }
    }

    onSetSpymaster(client, team, pid)
    {
        let player = this.data.players.find(p => p.pid === pid);
        let curSpymaster = this.findSpymaster(team);
        if (!this.isOwner(client) || player === undefined  || curSpymaster === undefined || player.team != team || team <= 0 || team > this.data.options.teamCount){
            return;
        }
        curSpymaster.spymaster = false,
        player.spymaster = true;
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].spymasterChanged(this.data, player.pid)
        }
    }

    wordsChanged(words){
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].wordsChanged(this.data, words);
        }
    }

    isOwner(client){
        return this.data.players[0].pid == client.pid;
    }

    findSpymaster(team)
    {
        return this.data.players.find(p => p.spymaster && p.team == team);
    }

    spymasterChanged(pid)
    {
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].spymasterChanged(this.data, pid)
        }
    }
}

module.exports = {
    Lobby
}