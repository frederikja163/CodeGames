class RoomData
{
    constructor(rid)
    {
        this.rid = rid;
        this.players = [];
    }
}

class PlayerData
{
    constructor(pid)
    {
        this.pid = pid;
        this.name = "Player";
        this.role = 'G';
    }
}

class Room
{
    constructor(rid)
    {
        this.data = new RoomData(rid);
        this.players = [];
    }

    AddClient(client)
    {
        let player = new PlayerData(client.pid);
        this.data.players.push(player);
        for (let i = 0; i < this.players.length; i++)
        {
            this.players[i].playerJoined(this.data, player);
        }
        this.players.push(client);
        client.roomJoined(this.data, this.data.rid);

        client.onDisconnected = () => this.onDisconnected(client);
        client.onNameChange = (name) => this.onNameChange(client, name);
    }

    onNameChange(client, name)
    {
        let player = this.data.players.find(p => p.pid == client.pid);
        player.name = name;
        for (let i = 0; i < this.players.length; i++)
        {
            this.players[i].nameChanged(this.data, player, name);
        }
    }

    onDisconnected(client)
    {
        let playerIdx = this.players.findIndex(p => p.pid === client.pid);
        let player = this.data.players[playerIdx];
        this.players.slice(playerIdx);
        this.data.players.slice(playerIdx);
        for (let i = 0; i < this.players.length; i++)
        {
            this.players[i].playerLeft(this.data, player);
        }
    }

    static OnConnected(client)
    {
        client.onJoinRoom = (rid) => Room.JoinRoom(client, rid);
    }

    static JoinRoom(client, rid)
    {
        if (Room.rooms === undefined)
        {
            Room.rooms = [];
        }

        if (rid === null || rid === undefined)
        {
            const ridChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6' ,'7', '8', '9', '0'];
            rid = "";
            do
            {
                let i = Math.floor(Math.random() * ridChars.length);
                rid = rid + ridChars[i];
            } while(Room.rooms[rid] != undefined)
        }

        if (Room.rooms[rid] === undefined)
        {
            Room.rooms[rid] = new Room(rid);
        }
        Room.rooms[rid].AddClient(client);
    }
}

module.exports =
{
    Room
}