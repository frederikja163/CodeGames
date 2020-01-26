///<reference path="p5.global-mode.d.ts" />

var app;

function setup()
{
    createCanvas();
    rectMode(CENTER);
    colorMode(HSB, 1);
    
    Input.inititalize();
    mouseMoved();

    resize();

    app = new Application();
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
}