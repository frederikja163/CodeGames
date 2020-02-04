///<reference path="p5.global-mode.d.ts" />

var app;
var room;
var socket = io("https://95.217.87.22:50464");

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
    app.update();
    background(0);
    app.draw();
}

function mousePressed()
{
    Input.onMousePress(mouseButton);
}

function mouseReleased()
{
    Input.onMouseRelease(mouseButton);
}

function mouseMoved()
{
    Input.onMouseMove(createVector(mouseX, mouseY));
}

window.onresize += resize;
function resize()
{
    resizeCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
    app.onResize(createVector(document.documentElement.clientWidth, document.documentElement.clientHeight));
}