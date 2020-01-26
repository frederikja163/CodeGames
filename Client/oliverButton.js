class Button
{
    constructor(position, size, color, text, textColor, onEnter, onLeave, onPress, onRelease)
    {
        this.position = position;
        this.size = size;
        this.color = color;
        this.text = text;
        this.textColor = textColor;
        this.textSize = this.size.y / 4;
        this.onEnter = onEnter;
        this.onLeave = onLeave;
        this.onPress = onPress;
        this.onRelease = onRelease;
    }

    update()
    {
        // Set min & max
        this.min = p5.Vector.sub(this.position, p5.Vector.mult(this.size, .5));
        this.max = p5.Vector.add(this.position, p5.Vector.mult(this.size, .5));

        // Auto text color
        if(this.textColor == 0 && this.color.v3 > .5)
        {
            this.textColor = color(0, 0, 0);
        }
        else if(this.textColor == 0)
        {
            this.textColor = color(0, 0, 1);
        }

        // Text size
        if(textWidth(this.text) > this.size.x)
        {
            this.textSize = this.textSize / 4;
        }

        // Detect hover
        if(mouseX < this.max.x && mouseX > this.min.x && mouseY < this.max.y && mouseY > this.min.y)
        {
            if(this.isHover == false)
            {
                this.onEnter(this);
            }

            this.isHover = true;

            // Detect press
            if(mouseIsPressed)
            {
                if(this.isPressed == false)
                {
                    this.onPress(this);
                }

                this.isPressed = true;
            }

            // Detect release
            else
            {
                if(this.isPressed == true)
                {
                    this.onRelease(this);
                }

                this.isPressed = false;
            }
        }

        else
        {
            // Detect leave
            if(this.isHover == true)
            {
                this.onLeave(this);
            }

            this.isHover = false;
        }
    }

    draw()
    {
        fill(this.color);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
        
        textSize(this.size.y / 2);
        textAlign(CENTER, CENTER);
        fill(this.textColor);
        text(this.text, this.position.x, this.position.y);
        text()
    }
}