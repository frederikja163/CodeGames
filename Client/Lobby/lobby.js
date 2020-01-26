class Lobby
{
    constructor()
    {
        var url = window.location.href;
        var idx = url.indexOf('#');
        if (idx != -1)
        {
            this.state = new Guest(url.substring(idx));
        }
        else
        {
            this.state = new Menu();
        }
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