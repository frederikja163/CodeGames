class Owner extends Guest
{
    constructor()
    {
        super();
    }

    onResize(size)
    {
        super.onResize();
    }

    draw()
    {
        drawLeftPanel(true);
        drawBottomPanel(true);
        drawRightPanel(true);
        drawCenterPanel(true);
    }
}