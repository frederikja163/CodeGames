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
        if (this.data.players[0].pid != client.pid)
        {
            return;
        }
        console.log(pid, reason);

        let playerInd = this.data.players.findIndex(p => p.pid == pid);
        if (playerInd == -1)
        {
            return;
        }
        this.data.players.splice(playerInd, 1);
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].playerKicked(this.data, pid, reason);
        }
        this.clients.splice(playerInd, 1);
    }
}

module.exports = {
    Lobby
}