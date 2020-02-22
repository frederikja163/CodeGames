class Guest
{
    constructor()
    {
        function playerIndex()
        {
            for (var i = 0; i < room.players.length; i++)
            {
                if (socket.id == room.players[i].id)
                {
                    return i;
                }
            }
        }

        socket.on("PlayerJoined", (r, id) => 
        {
            room = r;
        });

        socket.on("PlayerLeft", (r, id) =>
        {
            room = r;
        });

        Input.onKeyTyped.push((keyCode) => 
        {
            var name = room.players[playerIndex()].name;
            if (keyCode == 8)
            {
                name = name.slice(0, -1);
            }
            else if ((keyCode > 47 && keyCode < 58) || (keyCode > 64 && keyCode < 91) || keyCode == 32)
            {
                name += char(keyCode);
            }
            room.players[playerIndex()].name = name;
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
            //this.playerList[i].draw();
            fill(color(1));
            text(room.players[i].name, txtSize * 2, i * txtSize * 2 + txtSize * 4);
        }
    }
}