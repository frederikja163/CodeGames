class Menu
{
    constructor()
    {
        this.buttonColor = color(.7, 1, .5);
        this.buttonSize = createVector(height * .2, height * .1);
        this.startButton = new Button
        (
            createVector(0, 0),
            createVector(0, 0),
            this.buttonColor,
            5,
            (button) => this.startButton.size = p5.Vector.mult(this.buttonSize, 1.1),
            (button) => this.resize(),
            (button) => this.startButton.color = color(.7, 1, .4),
            (button) => this.startButton.color = this.buttonColor
        );

        window.onresize += this.resize;
        this.resize();
    }

    update()
    {
        this.startButton.update();
    }

    draw()
    {
        this.startButton.draw();
    }

    resize()
    {
        this.startButton.position = createVector(width * .5, height * .5);
        this.startButton.size = this.buttonSize;
    }
}