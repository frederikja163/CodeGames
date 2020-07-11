const { Lobby } = require("./lobby");

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
        this.clients = [];
        this.state = new Lobby(this.data, this.clients);
    }

    static OnConnected(client)
    {
        client.onJoinRoom = (rid) => Room.JoinRoom(client, rid);
    }

    AddClient(client)
    {
        let player = new PlayerData(client.pid);
        this.data.players.push(player);
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].playerJoined(this.data, player);
        }
        this.clients.push(client);
        client.roomJoined(this.data, this.data.rid);

        client.onDisconnected = () => this.onDisconnected(client);
        client.onJoinRoom = (rid) => this.onJoinRoom(client, rid);
        this.state.AddClient(client);
    }

    onJoinRoom(client, rid)
    {
        this.onDisconnected(client);
        Room.JoinRoom(client, rid);
    }

    onDisconnected(client)
    {
        let playerInd = this.players.findIndex(p => p.pid === client.pid);
        let player = this.data.players[playerInd];
        this.clients.splice(playerInd, 1);
        this.data.players.splice(playerInd, 1);
        for (let i = 0; i < this.players.length; i++)
        {
            this.clients[i].playerLeft(this.data, player);
        }

        if (this.clients.length <= 0)
        {
            Room.rooms = Room.rooms.filter(r => r.rid != this.data.rid);
        }
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