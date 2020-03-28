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


    onResize()
    {
        
    }

    draw()
    {
        drawLeftPanel(false);
        drawBottomPanel(false);
        drawRightPanel(false);
        drawCenterPanel(false);
    }
}