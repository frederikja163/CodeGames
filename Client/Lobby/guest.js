class Guest
{
    constructor()
    {
        function getPlayerIndex()
        {
            for (var i = 0; i < room.players.length; i++)
            {
                if (Socket.id() == room.players[i].pid)
                {
                    return i;
                }
            }
        }
        this.playerIndex = getPlayerIndex();

        Input.onKeyTyped = (keyCode) => 
        {
            var name = room.players[this.playerIndex].name;
            if (keyCode == 8)
            {
                name = name.slice(0, -1);
            }
            else if (name.length < 15 &&
                    ((65 <= keyCode && keyCode <= 90) ||
                    (48 <= keyCode && keyCode <= 57) ||
                    keyCode == 32))
            {
                name += char(keyCode);
            }
            room.players[this.playerIndex].name = name;
            Socket.updateName(name);
        };
    }

    ownerColor(i, a = 1)
    {
        return color(43/360, i === 0 ? 76/100 : 0, 1, a);
    }

    onResize()
    {
        
    }

    draw()
    {
        this.txtSize = 40;

        fill(color(0, .6, 1));
        textSize(this.txtSize);
        text("Players in room", this.txtSize * 2, this.txtSize * 2);

        for(var i = 0; i < room.players.length; i++)
        {
            var ownerTag = (i === 0 ? "👑 " : "");
            fill(this.ownerColor(i));
            text(ownerTag + room.players[i].name, this.txtSize * 2, i * this.txtSize * 2 + this.txtSize * 4);
        }
    }
}