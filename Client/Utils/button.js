class Button
{
    constructor(position, size, text, color, blackText = false)
    {
        this.position = position;
        this.size = size;
        this.text = text;
        this.color = color;
        this.blackText = blackText;
        this.isHover = false;
        this.isPressed = false;
    }

    update()
    {
        var min = createVector(this.position.x - this.size.x / 2, this.position.y - this.size.y / 2);
        var max = createVector(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);

        this.isHover = min.x <= Input.mouse.position.x && Input.mouse.position.x <= max.x
            && min.y <= Input.mouse.position.y && Input.mouse.position.y <= max.y;
        
        this.isPressed = this.isHover && Input.mouse.button[LEFT];
    }

    draw()
    {
        var size = this.isHover ? p5.Vector.mult(this.size, this.isPressed ? 0.9 : 1.1) : this.size;

        fill(this.color);
        rect(this.position.x, this.position.y, size.x, size.y, size.y / 5);

        fill(this.blackText ? 0 : 1);
        textAlign(CENTER, CENTER);
        textSize(size.y - 5);
        text(this.text, this.position.x, this.position.y);
    }
}