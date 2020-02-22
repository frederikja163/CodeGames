class Guest
{
    constructor()
    {
        socket.on("PlayerJoined", (r, id) => 
        {
            room = r;
        });

        socket.on("PlayerLeft", (r, id) =>
        {
            room = r;
        });

        Input.onKeyTyped.push((keyCode) => print(keyCode));
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