class LobbyState
{
    constructor()
    {
        this.create = new Button(createVector(0, 0), createVector(200, 50), "create", color(0.5), true);
        this.join = new Button(createVector(0, 0), createVector(200, 50), "join", color(0.5), true);
    }

    onResize(size)
    {
        this.create.position = createVector(size.x / 4, size.y / 5 * 4);
        this.join.position = createVector(size.x / 4 * 3, size.y / 5 * 4);
    }

    update()
    {
        this.create.update();
        this.join.update();
    }

    draw()
    {
        this.create.draw();
        this.join.draw();
    }
}