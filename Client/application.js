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

    update()
    {
        this.state.update();
    }

    draw()
    {
        this.state.draw();
    }
}