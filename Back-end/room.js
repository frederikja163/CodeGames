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
    }

    AddClient(client)
    {
        this.data.players.push(new PlayerData(client.pid));
        client.roomJoined(this.data, this.data.rid);
    }

    static OnConnected(client)
    {
        client.onJoinRoom = Room.JoinRoom;
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