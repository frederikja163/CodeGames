///<reference path="p5.global-mode.d.ts" />

function setup()
{
    createCanvas();
    rectMode(CENTER);
    colorMode(HSB, 1);

    resize();

    button1 = new Button
    (
        createVector(200, 100), 
        createVector(269, 89), 
        color(.25, .5, 1), 
        "Create", 
        color(.13, 1, 1),
        (button) => button.size = p5.Vector.mult(button.size, 1.5), 
        (button) => button.size = createVector(269, 89), 
        (button) => print("onPress"), 
        (button) => print("onRelease")
    );

    button2 = new Button
    (
        createVector(400, 700), 
        createVector(269, 500), 
        color(.25, .5, 1), 
        "Options", 
        0,
        (button) => button.size = p5.Vector.mult(button.size, 1.5), 
        (button) => button.size = createVector(269, 500), 
        (button) => print("onPress"), 
        (button) => print("onRelease")
    );
}

function draw()
{
    button1.update();
    button2.update();

    background(0);

    button1.draw();
    button2.draw();
}

window.onresize += resize;
function resize()
{
    resizeCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
}