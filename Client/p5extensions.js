function isMouseWithin(x, y, width, height)
{
    var hWidth = width / 2;
    var hHeight = height / 2;
    var minX = x - hWidth;
    var minY = y - hHeight;
    var maxX = x + hWidth;
    var maxY = y + hHeight;
    var mouseX = Input.mouse.position.x;
    var mouseY = Input.mouse.position.y;

    return minX <= mouseX && mouseX <= maxX &&
            minY <= mouseY && mouseY <= maxY
}