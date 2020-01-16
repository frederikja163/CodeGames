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
}

function draw()
{
    testButton.update();

    background(0);
    testButton.draw();
}

function mousePressed()
{
    Input.onMousePressed(mouseButton);
}


window.onresize += resize;
function resize()
{
    resizeCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
}