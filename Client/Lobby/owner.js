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

    draw()
    {
        var txtSize = 40;
        var nameX = txtSize * 2;
        var yMargin = txtSize * 2;
        var startButtonSize = createVector(300, 100);
        var roomOptionsSize = createVector(350, 600);
        
        textAlign(LEFT, CENTER);
        fill(color(0, .6, 1));
        textSize(txtSize);
        text("Players in room", nameX, yMargin);

        for (var i = 0; i < room.players.length; i++)
        {
            var nameY = (2 + i) * yMargin;
            var ownerTag = (i === 0 ? "👑 " : "");
            var nameWidth = textWidth(ownerTag + room.players[i].name);
            
            if (isMouseWithin(nameX, nameY - txtSize * 0.58, max(nameWidth, 25), txtSize))
            {
                Input.mouse.setStyle('pointer');
                textSize(txtSize * 1.1);
                var xChange = -nameWidth * 0.05;
                fill(this.ownerColor(i, 0.8));
                text(ownerTag + room.players[i].name, nameX + xChange, nameY);

                var lineWidth = 5;
                strokeWeight(lineWidth);
                stroke(1, .8, 1, 0.8);
                line(nameX + xChange, nameY - lineWidth, nameX + max(nameWidth, 25) - xChange, nameY - lineWidth);
                strokeWeight(0);

                if (Input.mouse.button[LEFT])
                {
                    Socket.kickPlayer(room.players[i].pid);
                }
            }
            else
            {
                textSize(txtSize);
                fill(this.ownerColor(i));
                text(ownerTag + room.players[i].name, nameX, nameY);
            }
        }

        textSize(txtSize);

        if (isMouseWithin(windowWidth / 2 - startButtonSize.x / 2, windowHeight * .9 - startButtonSize.y / 2, startButtonSize.x, startButtonSize.y))
        {
            Input.mouse.setStyle('pointer');
            textSize(txtSize * 1.1);
            startButtonSize = p5.Vector.mult(startButtonSize, 1.1);
        
            if (Input.mouse.button[LEFT])
            {
                Socket.startGame();
            }
        }

        fill(1);
        rect(windowWidth / 2 - startButtonSize.x / 2, windowHeight * .9 - startButtonSize.y / 2, startButtonSize.x, startButtonSize.y, 4);
        fill(0);
        textAlign(CENTER, CENTER);
        text("Start", windowWidth / 2, windowHeight * .9);

        fill(0.15);
        rect(windowWidth - roomOptionsSize.x - (windowHeight - roomOptionsSize.y) / 2, (windowHeight * .9 - startButtonSize.y * 2 - roomOptionsSize.y / 2) / 2, roomOptionsSize.x, roomOptionsSize.y);
        textSize(30);
        fill(1);
        text("Room Options", windowWidth - roomOptionsSize.x/2 - (windowHeight - roomOptionsSize.y) / 2, (windowHeight * .9 - startButtonSize.y - roomOptionsSize.y / 2) / 2 + 50);
        textSize(60);
        text("Snake Multiplayer", windowWidth / 2, windowHeight / 2);
    }
}