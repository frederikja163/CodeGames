const { Lobby } = require("./lobby");

class RoomData
{
    constructor(rid)
    {
        this.rid = rid;
        this.players = [];
        this.options = new Options();
    }
}

class PlayerData
{
    constructor(pid)
    {
        this.pid = pid;
        this.name = "Player";
        this.team = -1;
        this.spymaster = false;
    }
}

class Options
{
    constructor()
    {
        this.words = [];
        this.teamCount = 2;
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
        if (this.state instanceof Lobby)
        {
            player.team = 0;
        }
        this.data.players.push(player);
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].playerJoined(this.data, player.pid);
        }
        this.clients.push(client);
        client.roomJoined(this.data, this.data.rid, client.pid);

        client.onDisconnected = () => this.onDisconnected(client);
        client.onJoinRoom = (rid) => this.onJoinRoom(client, rid);
        client.onLeaveRoom = () => this.onLeaveRoom(client);
        this.state.AddClient(client);
    }

    onJoinRoom(client, rid)
    {
        this.onDisconnected(client);
        Room.JoinRoom(client, rid);
    }

    onLeaveRoom(client){
        this.onDisconnected(client);
        client.roomLeft();
        Room.OnConnected(client);
    }

    onDisconnected(client)
    {
        let playerInd = this.clients.findIndex(p => p.pid === client.pid);
        let player = this.data.players[playerInd];
        this.clients.splice(playerInd, 1);
        this.data.players.splice(playerInd, 1);
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].playerLeft(this.data, player.pid);
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

        if (rid === null || rid === undefined || rid === "")
        {
            const ridChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6' ,'7', '8', '9', '0'];
            rid = "";
            let minCount = 3;
            do
            {
                let i = Math.floor(Math.random() * ridChars.length);
                rid = rid + ridChars[i];
            } while(Room.rooms[rid] != undefined || --minCount > 0)
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