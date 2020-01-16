///<reference path="p5.global-mode.d.ts" />
button1 = new Button(createVector(100, 100), createVector(269, 89), "test hello world", color(169, 50, 100), print("hover test"), print("click test"));
class Button
{
    constructor(position, size, text, color, onHover, onClick, textColor)
    {
        this.position = position
        this.size = size
        this.text = text
        this.textcolor = (0, 0, 100)
        this.textSize = this.sizeY / 4
        this.color = color
        this.onClick = onClick
    }

    update()
    {
        if (this.color[2] >= 50)
        {
            this.textcolor = [0, 0, 0]
        }
    }

    onClickF()
    {
        if (mouseX >= this.position.x && mouseX <= this.position.x + this.size.x && mouseY >= this.position.y && mouseY <= this.position.y + this.size.y)
        {
            this.onClick();
        }
    }

    draw()
    {
        colorMode(HSB);

        fill(this.color)
        rect(this.posX, this.posY, this.sizeX, this.sizeY)
        
        fill(this.textcolor)
        textSize(this.textSize)
        text(this.text, this.posX + this.sizeX / 2 - textWidth(this.text) / 2, this.posY + this.sizeY / 2 - this.textSize / 2, this.sizeX, this.sizeY)
    }
}