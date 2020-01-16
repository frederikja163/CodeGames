///<reference path="p5.global-mode.d.ts" />

class Button
{
    constructor(pos, size, text, colour, onHover, onClick)
    {
        this.posX = pos[0]
        this.posY = pos[1]
        this.sizeX = size[0]
        this.sizeY = size[1]
        this.text = text
        this.textColour = [0, 0, 100]
        this.textSize = this.sizeY / 4
        this.colour = colour
    }

    setup()
    {
        if (this.colour[2] >= 50)
        {
            this.textColour = [0, 0, 0]
        }
    }

    draw()
    {
        colorMode(HSB);

        fill(this.colour)
        rect(this.posX, this.posY, this.sizeX, this.sizeY)
        
        fill(this.textColour)
        textSize(this.textSize)
        text(this.text, this.posX + this.sizeX / 2 - textWidth(this.text) / 2, this.posY + this.sizeY / 2 - this.textSize / 2, this.sizeX, this.sizeY)

    }
}