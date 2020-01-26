class Button
{
    constructor(position, size, color, radius, onEnter, onLeave, onPress, onRelease)
    {
        this.position = position;
        this.size = size;
        this.color = color;
        this.radius = radius;
        this.onEnter = onEnter;
        this.onLeave = onLeave;
        this.onPress = onPress;
        this.onRelease = onRelease;
        this.isMouseOver = false;
        this.isPressed = false;
    }

    update()
    {
        var min = p5.Vector.sub(this.position, p5.Vector.mult(this.size, 0.5));
        var max = p5.Vector.add(this.position, p5.Vector.mult(this.size, 0.5));

        if (min.x <= Input.mouse.position.x && Input.mouse.position.x <= max.x &&
            min.y <= Input.mouse.position.y && Input.mouse.position.y <= max.y)
        {
            if (!Input.mouse.button[LEFT] && !this.isMouseOver)
            {
                this.isMouseOver = true;
                this.onEnter(this);
            }
            else if (Input.mouse.button[LEFT] && this.isMouseOver && !this.isPressed)
            {
                this.isPressed = true;
                this.onPress(this);
            }
            else if (!Input.mouse.button[LEFT] && this.isPressed && this.isMouseOver)
            {   
                this.isPressed = false;
                this.onRelease(this);
            }
        }
        else
        {
            this.isMouseOver = false;
            this.isPressed = false;
            this.onLeave(this);
        }
    }

    draw()
    {
        fill(this.color);
        rect(this.position.x, this.position.y, this.size.x, this.size.y, this.radius);
    }
}