class Game
{
    constructor()
    {
        console.log(room);
        this.state = new Presenter();
    }

    onResize(size)
    {
        if (this.state != null)
        {
            this.state.onResize(size);
        }
    }

    draw()
    {
        if (this.state != null)
        {
            this.state.draw();
        }
        else if (millis() >= 1000)
        {
            textSize(100);
            fill(1);
            textAlign(CENTER, CENTER);
            text("No connection!", width / 2, height / 2);
        }
    }
}