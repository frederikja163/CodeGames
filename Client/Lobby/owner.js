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
        var txtSize = 40;
        var nameX = txtSize * 2;
        var yMargin = txtSize * 2;
        
        textAlign(LEFT, CENTER);
        fill(color(0, .6, 1));
        textSize(txtSize);
        text("Players in room", nameX, yMargin);

        for (var i = 0; i < room.players.length; i++)
        {
            document.body.style.cursor = 'pointer';

            var nameY = (2 + i) * yMargin;
            var nameWidth = textWidth(room.players[i].name);
            
            if (isMouseWithin(nameX, nameY - txtSize * 0.58, max(nameWidth, 25), txtSize))
            {
                textSize(txtSize * 1.1);
                var xChange = (nameWidth - nameWidth * 1.1) / 2;
                fill(color(1, 0, 1, 0.8));
                text(room.players[i].name, nameX + xChange, nameY);

                var lineWidth = 5;
                strokeWeight(lineWidth);
                stroke(1, .8, 1, 0.8);
                line(nameX + xChange, nameY - lineWidth, nameX + max(nameWidth, 25) - xChange, nameY - lineWidth);
                strokeWeight(0);

                if (Input.mouse.button[LEFT])
                {
                    //kick player
                }
            }
            else
            {
                document.body.style.cursor = 'default';

                textSize(txtSize);
                fill(color(1));
                text(room.players[i].name, nameX, nameY);
            }
        }
    }
}