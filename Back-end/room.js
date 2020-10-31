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
        this.spymaster = false;
        this.name = "Player";
        this.team = -1;
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
        this.rid = rid;
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
        client.reset();
        Room.OnConnected(client);
    }

    onDisconnected(client)
    {
        this.state.RemovePlayer(client.pid);
        let playerInd = this.clients.findIndex(p => p.pid === client.pid);
        this.clients.splice(playerInd, 1);
        let player = this.data.players.splice(playerInd, 1)[0];
        for (let i = 0; i < this.clients.length; i++)
        {
            this.clients[i].playerLeft(this.data, player.pid);
        }

        if (this.data.players.length <= 0)
        {
            let idx = Room.rooms.findIndex(r => r.rid === this.rid);
            Room.rooms.splice(idx, 1);
        }
    }

    static JoinRoom(client, rid)
    {
        if (rid === null || rid === undefined || rid === "")
        {
            const ridChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6' ,'7', '8', '9', '0'];
            rid = "";
            let ridLength = 3;
            function generateRid(length)
            {
                let id = "";
                for (let i = 0; i < length; i++)
                {
                    let char = Math.floor(Math.random() * ridChars.length);
                    id = id + ridChars[char];
                }
                return id;
            }
            do
            {
                rid = generateRid(ridLength++);
            } while(Room.rooms.includes(r => r.rid === rid))
        }
        
        let room = Room.rooms.find(r => r.rid === rid);
        if (room === undefined)
        {
            room = new Room(rid);
            Room.rooms.push(room);
        }
        client.room = room;
        room.AddClient(client);
    }
}

module.exports =
{
    Room
}