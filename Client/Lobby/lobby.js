class Lobby
{
    constructor()
    {
        this.state = new Menu();
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