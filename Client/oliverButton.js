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
        this.colour = colour
    }

    draw()
    {
        rect(this.posX, this.posY, this.sizeX, this.sizeY)
    }
}