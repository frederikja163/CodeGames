const {Room, Player, Options} = require('./room');

class Lobby
{
    constructor(socket, room)
    {
        this.room = room;
        this.addPlayer(socket);
    }

    addPlayer(socket)
    {
        socket.updateName = (socket, name) => this.updateName(socket, name);
        
        socket.kickPlayer = (socket, pid) => this.kickPlayer(socket, pid);
    }

    updateName(socket, name)
    {
        if (name.length <= 15)
        {
            var player = this.room.players.find(p => p.pid === socket.id());
            player.name = name;
            socket.updatedName(this.room, name);
        }
    }

    kickPlayer(socket, pid)
    {
        if (socket.id() === this.room.players[0].pid && pid != this.room.players[0].pid)
        {
            var player = this.room.players.find(p => p.pid == pid);
            if (player != undefined)
            {
                socket.disconnect(player.pid);
            }
        }
    }
}

module.exports = {
    Lobby
}