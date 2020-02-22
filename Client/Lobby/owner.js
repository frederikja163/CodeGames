class Owner extends Guest
{
    constructor()
    {
        super();
    }

    onResize(size)
    {
        super.onResize();
    }

    update()
    {
        super.update();
    }

    draw()
    {
        super.draw();
        
        var txtSize = 40;

        fill(1);
        text("jeg er owner", 1, 40);

        for (var i = 0; i < room.players.length; i++)
        {
            if (isMouseWithin(2 * txtSize, i * txtSize * 2 + txtSize * 4, 800, txtSize))
            {
                console.log("pressed");
                text("X", txtSize, i * txtSize * 2 + txtSize * 4);

                if (true)
                {

                }
            }
        }
    }
}