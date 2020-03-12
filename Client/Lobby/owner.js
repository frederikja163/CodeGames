class Owner extends Guest
{
    constructor()
    {
        super();
        this.leftAvailable = true;
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
        
        textAlign(LEFT, CENTER);
        fill(color(0, .6, 1));
        textSize(txtSize);
        text("Players in room", nameX, yMargin);

        for (var i = 0; i < room.players.length; i++)
        {
            var nameY = (2 + i) * yMargin;
            var nameWidth = textWidth(room.players[i].name);
            
            if (isMouseWithin(nameX, nameY - txtSize * 0.58, max(nameWidth, 25), txtSize))
            {
                Input.mouse.setStyle('pointer');
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
                textSize(txtSize);
                fill(color(1));
                text(room.players[i].name, nameX, nameY);
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
                //start game (skriv i konsol ved alle i rum)
                if (this.leftAvailable)
                {
                    Socket.startGame();
                    console.log("knappen virker");
                }
                this.leftAvailable = false;
            }
            else
            {
                this.leftAvailable = true;
            }
        }

        fill(1);
        rect(windowWidth / 2 - startButtonSize.x / 2, windowHeight * .9 - startButtonSize.y / 2, startButtonSize.x, startButtonSize.y, 4);
        fill(0);
        textAlign(CENTER, CENTER);
        text("Start", windowWidth / 2, windowHeight * .9);
    }
}