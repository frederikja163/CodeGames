///<reference path="p5.global-mode.d.ts" />

var velX = 10;
var velY = 25;
var x = 10;
var y = 20;

function setup()
{
    createCanvas(500, 500);
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
}