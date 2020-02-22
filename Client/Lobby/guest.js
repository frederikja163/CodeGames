class Guest
{
    constructor()
    {
        function getPlayerIndex()
        {
            for (var i = 0; i < room.players.length; i++)
            {
                if (socket.id == room.players[i].id)
                {
                    return i;
                }
            }
        }
        this.playerIndex = getPlayerIndex();

        socket.on("playerJoined", (r, id) => 
        {
            room = r;
            this.playerIndex = getPlayerIndex();
        });

        socket.on("updatedName", (r, name) =>
        {
            room = r;
        });

        socket.on("playerLeft", (r, id) =>
        {
            room = r;
            this.playerIndex = getPlayerIndex();
        });

        Input.onKeyTyped.push((keyCode) => 
        {
            var name = room.players[this.playerIndex].name;
            if (keyCode == 8)
            {
                name = name.slice(0, -1);
            }
            else if ((65 <= keyCode && keyCode <= 90)||
                    (48 <= keyCode && keyCode <= 57) ||
                    keyCode == 32)
            {
                name += char(keyCode);
            }
            room.players[this.playerIndex].name = name;
            socket.emit("updateName", name)
        });
    }

    onResize()
    {
        
    }

    update()
    {

    }

    draw()
    {
        var txtSize = 40;

        fill(color(0, .6, 1));
        textSize(txtSize);
        text("Players in room", txtSize * 2, txtSize * 2);

        for(var i = 0; i < room.players.length; i++)
        {
            fill(color(1));
            text(room.players[i].name, txtSize * 2, i * txtSize * 2 + txtSize * 4);
        }
    }
}