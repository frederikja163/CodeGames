class Button
{
    constructor(position, size, color, text, textColor, onEnter, onLeave, onPress, onRelease)
    {
        this.position = position;
        this.size = size;
        this.color = color;
        this.text = text;
        this.textColor = textColor;
        this.onEnter = onEnter;
        this.onLeave = onLeave;
        this.onPress = onPress;
        this.onRelease = onRelease;
        this.isMouseOver = false;
        this.isPressed = false;
    }

    update()
    {
        var min = p5.Vector.sub(this.position, this.size);
        var max = p5.Vector.add(this.position, this.size);

        if (min.x <= mouseX && mouseX <= max.x &&
            min.y <= mouseY && mouseY <= max.y)
        {
            if (!mouseIsPressed && !this.isMouseOver)
            {
                this.isMouseOver = true;
                this.onEnter(this);
            }
            else if (mouseIsPressed && this.isMouseOver && !this.isPressed)
            {
                this.isPressed = true;
                this.onPress(this);
            }
            else if (!mouseIsPressed && this.isPressed && this.isMouseOver)
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
        rect(this.position.x, this.position.y, this.size.x, this.size.y);

        textAlign(CENTER, CENTER);
        fill(this.textColor);
        textSize(this.size.y);
        text(this.text, this.position.x, this.position.y);
    }
}