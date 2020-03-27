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
        Input.mouse.setStyle = (style) => document.body.style.cursor = style;
        Input.onKeyTyped= () => {};
    }

    static mousePress(button)
    {
        //Input.mouse.button[button] = true;
    }

    static update()
    {
        Input.mouse.button = {
            RIGHT: false,
            LEFT: false,
            MIDDLE: false
        };
    }

    static mouseRelease(button)
    {
        Input.mouse.button[button] = true;
    }

    static keyTyped(keyCode)
    {
        Input.onKeyTyped(keyCode);
    }

    static mouseMove(mousePosition)
    {
        Input.mouse.position = mousePosition;
    }
}