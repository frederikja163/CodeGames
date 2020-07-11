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
    }

    onSetName(client, name)
    {
        let player = this.data.players.find(p => p.pid == client.pid);
        player.name = name;
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].nameChanged(this.data, player, name);
        }
    }
}

module.exports = {
    Lobby
}