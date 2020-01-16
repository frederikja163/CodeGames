///<reference path="p5.global-mode.d.ts" />

function setup()
{
    createCanvas();
    rectMode(CENTER);
    colorMode(HSB, 1);

    resize();
}

function draw()
{

}


window.onresize += resize;
function reszie()
{
    resizeCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
}