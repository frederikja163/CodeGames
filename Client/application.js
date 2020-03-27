class Application
{
    constructor()
    {
        this.state = new Lobby();
        Socket.startedGame = () =>
        {
            this.state.resetLobby();
            this.state = new Game();
        }
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