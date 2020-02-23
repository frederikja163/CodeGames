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
        this.txtSize = 40;
        
        fill(color(0, .6, 1));
        textSize(this.txtSize);
        text("Players in room", this.txtSize * 2, this.txtSize * 2);

        for (var i = 0; i < room.players.length; i++)
        {
            this.color = 1;
            var playerNamePos = createVector(this.txtSize * 2, i * this.txtSize * 2 + this.txtSize * 4);
            var playerNameSize = createVector(textWidth(room.players[i].name), this.txtSize);
            
            fill(.8, 1, 1);
            rect(playerNamePos.x, playerNamePos.y, playerNameSize.x, playerNameSize.y);

            if (isMouseWithin(playerNamePos.x, playerNamePos.y - this.txtSize, playerNameSize.x, playerNameSize.y))
            {
                this.color = .6;
                this.txtSize = this.txtSize * 1.1;
                playerNamePos.x -= 1;

                if (Input.mouse.button[LEFT])
                {
                    //kick player
                }
            }

            fill(color(this.color));
            textSize(this.txtSize);
            textAlign(LEFT, CENTER);
            text(room.players[i].name, playerNamePos.x, playerNamePos.y + playerNameSize.y * .5);

            if (isMouseWithin(playerNamePos.x, playerNamePos.y - this.txtSize, playerNameSize.x, playerNameSize.y))
            {
                strokeWeight(4);
                stroke(1, .8, 1);
                line(playerNamePos.x - this.txtSize * .1, playerNamePos.y - this.txtSize * .1, playerNamePos.x + playerNameSize.x + this.txtSize * .1, playerNamePos.y - this.txtSize * .1);
                strokeWeight(0);
            }
        }
    }
}