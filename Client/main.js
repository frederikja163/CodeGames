///<reference path="p5.global-mode.d.ts" />

var app;

function setup()
{
    createCanvas();
    colorMode(HSB, 1);
    rectMode(CENTER)

    app = new Application();

    resized();
    mouseMoved();
}

function draw()
{
    app.update();
    app.draw();
}

function mouseReleased()
{
    app.onMouseRelease(mouseButton);
}

function mousePressed()
{
    app.onMousePress(mouseButton);
}

function mouseMoved()
{
    app.onMouseMove(createVector(mouseX, mouseY));
}

window.onresize = resized;
function resized()
{
    resizeCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
    app.onResize(createVector(document.documentElement.clientWidth, document.documentElement.clientHeight))
}