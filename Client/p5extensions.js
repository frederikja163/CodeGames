function isMouseWithin(x, y, width, height)
{
    var mouseX = Input.mouse.position.x;
    var mouseY = Input.mouse.position.y;

    return x <= mouseX && mouseX <= x + width &&
            y <= mouseY && mouseY <= y + height
}