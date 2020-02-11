class Guest
{
    constructor()
    {
        this.playerList = [];
        this.textSize = 40;

        this.playerTitle = new Text("Players in room", createVector(this.textSize * 2, this.textSize * 2), this.textSize, color(0, .6, 1), LEFT, CENTER);
        
        var playerText = (name) => new Text(name, createVector(this.textSize * 2, this.playerList.length * this.textSize * 2 + this.textSize * 2 + 80), this.textSize, color(0, 0, 1), LEFT, CENTER);

        for(var i = 0; i < room.players.length; i++)
        {
            this.playerList.push(playerText(room.players[i].name));
        }

        socket.on("PlayerJoined", (player) => 
        {
            room.players.push(player);
            this.playerList.push(playerText(player.name));
        });

        socket.on("PlayerLeft", (id) =>
        {
            var index = room.players.findIndex((player) => player.id === id);
            room.players.splice(index, 1);
            this.playerList.splice(index, 1);
            for(i = index; i < this.playerList.length; i++)
            {
                this.playerList[i].position.y -= this.textSize * 2;
            }
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
        this.playerTitle.draw();

        for(var i = 0; i < this.playerList.length; i++)
        {
            this.playerList[i].draw();
        }
    }
}