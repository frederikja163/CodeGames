class Application
{
    constructor()
    {
        this.state = new Lobby();
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