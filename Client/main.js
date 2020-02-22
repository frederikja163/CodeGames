///<reference path="p5.global-mode.d.ts" />

var app;
var room;
var socket = io("http://95.217.87.22:50464");

var width;
var height;

function setup()
{
    createCanvas();
    rectMode(CENTER);
    colorMode(HSB, 1);

    Input.inititalize();
    mouseMoved();

    app = new Application();

    resize();
}

function draw()
{
    if (width != document.documentElement.clientWidth || height != document.documentElement.clientHeight)
    {
        resize();
    }

    app.update();
    background(0);
    app.draw();
}

function mousePressed()
{
    Input.mousePress(mouseButton);
}

function mouseReleased()
{
    Input.mouseRelease(mouseButton);
}

function mouseMoved()
{
    Input.mouseMove(createVector(mouseX, mouseY));
}

function keyPressed()
{
    Input.keyTyped(keyCode);
}

function resize()
{
    resizeCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
    app.onResize(createVector(document.documentElement.clientWidth, document.documentElement.clientHeight));
}