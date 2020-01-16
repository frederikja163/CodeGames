///<reference path="p5.global-mode.d.ts" />

var velX = 10;
var velY = 25;
var x = 10;
var y = 20;

function setup()
{
    createCanvas(1069, 420);

    button1 = new Button([100, 100], [269, 80], "test hello world", [169, 50, 100], 0, testFunc);
}

function draw()
{
    background(0);

    button1.draw();  
}

function mousePressed()
{
    button1.onClickF();
}

var testFunc = function testfunc()
{
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
}