class Application
{
    constructor()
    {
        Input.inititalize();
        this.state = new LobbyState();
    }

    update()
    {
        this.state.update();
    }

    draw()
    {
        background(1, 0, 0.3, 1);
        this.state.draw();
    }

    onResize(size)
    {
        this.state.onResize(size);
    }

    onMousePress(button)
    {
        Input.onMousePress(button);
    }

    onMouseRelease(button)
    {
        Input.onMouseRelease(button);
    }

    onMouseMove(mousePosition)
    {
        Input.onMouseMove(mousePosition);
    }
}