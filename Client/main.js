///<reference path="p5.global-mode.d.ts" />

var testButton;

function setup()
{
    createCanvas();
    rectMode(CENTER);
    colorMode(HSB, 1);

    resize();

    testButton = new Button(createVector(width / 2, height / 2), createVector(250, 50), color(0.15),
            "test button", color(0.95),
            (button) => button.size = p5.Vector.mult(button.size, 1.2),
            (button) => button.size = createVector(250, 50),
            (button) => button.size = p5.Vector.mult(createVector(250, 50), 0.8),
            (button) => button.size = p5.Vector.mult(createVector(250, 50), 1.2));

    button1 = new _Button
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

    button2 = new _Button
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
    testButton.update();
    button1.update();
    button2.update();

    background(0);
    testButton.draw();
    button1.draw();
    button2.draw();
}

function mousePressed()
{
    button1.draw();
    button2.draw();
}

window.onresize += resize;
function resize()
{
    resizeCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
}