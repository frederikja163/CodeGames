class Guest
{
    constructor()
    {
        this.playerText = []

        for(var i = room.players.length; i < room.players.length; i++)
        {
            this.playerText.push(new Text(room.players[i].name, createVector(20, i * 20 + 20), 10, color(1, 1, 1), LEFT, CENTER));
        }


    }

    onResize()
    {
        
    }

    update()
    {
        
    }

    draw()
    {
        for(var i = this.playerText.length; i < this.playerText.length; i++)
        {
            this.playerText[i].draw();
        }
    }
}
