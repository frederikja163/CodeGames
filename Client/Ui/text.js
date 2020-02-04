class Text
{
    constructor(text, position, size, color, hAlign, vAlign)
    {
        this.text = text;
        this.position = position;
        this.size = size;
        this.color = color;
        this.hAlign = hAlign;
        this.vAlign = vAlign;
    }

    draw()
    {
        textSize(this.size);
        fill(this.color);
        textAlign(this.hAlign, this.vAlign);
        text(this.text, this.position.x, this.position.y);
    }
}