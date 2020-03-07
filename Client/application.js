class Application
{
    constructor()
    {
        this.state = new Lobby();
    }

    onResize(size)
    {
        this.state.onResize(size);
    }

    draw()
    {
        this.state.draw();
    }
}