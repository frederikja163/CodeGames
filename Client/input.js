class Input
{
    static inititalize()
    {
        Input.mouse = new Object();
        Input.mouse.position = createVector(0, 0);
        Input.mouse.button = {
            RIGHT: false,
            LEFT: false,
            MIDDLE: false
        };
        Input.onKeyTyped = [];
    }

    static mousePress(button)
    {
        Input.mouse.button[button] = true;
    }

    static mouseRelease(button)
    {
        Input.mouse.button[button] = false;
    }

    static keyTyped(keyCode)
    {
        for (var i = 0; i < Input.onKeyTyped.length; i++)
        {
            Input.onKeyTyped[i](keyCode);
        }
    }

    static mouseMove(mousePosition)
    {
        Input.mouse.position = mousePosition;
    }
}