function button(x, y, width, height)
{
    var hWidth = width / 2;
    var hHeight = height / 2;
    var minX = x - hWidth;
    var minY = y - hHeight;
    var maxX = x + hWidth;
    var maxY = y + hHeight;
    var mouseX = Input.mouse.position.X;
    var mouseY = Input.mouse.position.Y;

    rect(x, y, width, height);

    return Input.mouse[LEFT] &&
            minX <= mouseX && mouseX <= maxX &&
            minY <= mouseY && mouseY <= maxY
}