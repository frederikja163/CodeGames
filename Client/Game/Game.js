class Game
{
    constructor()
    {
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
    }
}