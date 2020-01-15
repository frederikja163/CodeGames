///<reference path="p5.global-mode.d.ts" />
///<reference path="oliverButton.js" />

var velX = 10;
var velY = 25;
var x = 10;
var y = 20;


//Jeg kunne ikke lave objekt fra anden fil, så tester her
class Button
{
    constructor(pos, size, text, colour, onHover, onClick)
    {
        this.posX = pos[0]
        this.posY = pos[1]
        this.sizeX = size[0]
        this.sizeY = size[1]
        this.text = text
        this.colour = colour
    }

    draw()
    {
        rect(this.posX, this.posY, this.sizeX, this.sizeY)
    }
}

function setup()
{
    createCanvas(1069, 420);

    button1 = new Button([100, 100], [269, 80], "test", [100, 100, 100], 0, 0);
}

function draw()
{
    background(0);

    x += velX;
    y += velY;

    if (x < 0 || x > width)
    {
        velX *= -1;
    }
    if (y < 0 || y > height)
    {
        velY *= -1;
    }

    rect(x, y, 50, 50);





    button1.draw();
}