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
    }

    static onMousePress(button)
    {
        Input.mouse.button[button] = true;
    }

    static onMouseRelease(button)
    {
        Input.mouse.button[button] = false;
    }

    static onMouseMove(mousePosition)
    {
        Input.mouse.position = mousePosition;
    }
}