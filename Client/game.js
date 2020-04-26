const GState = {
    Presenter : "presenter",
    Guesser : "guesser",
    Spectator : "spectator"
}

function drawTopPanel(state)
{
    var hoverScale = 1.1;
    var txtSize = 20;
    var radius = 5;
    var marginSize = createVector(width * 0.05, height * 0.05);
    var boardSize = createVector(width, height * .8);
    var startWordSize = createVector(boardSize.x / room.board.length - marginSize.x, boardSize.y / room.board[0].length - marginSize.y);

    for (x = 0; x < room.board.length; x++)
    {
        for (y = 0; y < room.board[x].length; y++)
        {
            var wordSize = startWordSize;
            var wordPos = createVector(wordSize.x * x + marginSize.x * (x + 0.5), wordSize.y * y + marginSize.y * (y + 0.5));
            if (isMouseWithin(wordPos.x, wordPos.y, wordSize.x, wordSize.y) && state == GState.Guesser)
            {
                Input.mouse.setStyle('pointer');
                textSize(txtSize * hoverScale);
                wordSize = p5.Vector.mult(wordSize, hoverScale);
                var deltaSize = p5.Vector.sub(wordSize, startWordSize);
                wordPos = createVector(wordPos.x - deltaSize.x / 2, wordPos.y - deltaSize.y / 2);
            }

            switch (room.board[x][y].type)
            {
                case 'blue':
                    stroke(0.6, 0.8, 0.8);
                    break;
                case 'red':
                    stroke(0, 0.8, 0.8);
                    break;
                case 'neutral':
                    stroke(0.7);
                    break;
                case 'killer':
                    stroke(0);
                    break;
                default:
                    stroke(0);
                    break;
                }
            fill(.9);
            strokeWeight(radius);
            rect(wordPos.x, wordPos.y, wordSize.x, wordSize.y, radius, radius, radius, radius);
            strokeWeight(0);
            fill(0);
            textSize(txtSize);
            textAlign(CENTER);
            text(room.board[x][y].text, wordPos.x + wordSize.x / 2, wordPos.y + wordSize.y / 2);
        }
    }
}

function drawWordPanel(state)
{
    if (state == GState.Presenter)
    {
        var wordSize = createVector(width * .5, txtSize * 2);
        var wordPos = createVector(width * .5 - wordSize.x * .5, height - txtSize * 3);

        stroke(0);
        strokeWeight(2);
        fill(1);
        rect(wordPos.x, wordPos.y, wordSize.x, wordSize.y);
    }
}

class Game
{
    constructor()
    {
        this.state = GState.Presenter;

        Input.onKeyTyped = (keyCode) => 
        {
            
        }
    }

    onResize(size)
    {
        if (this.state != null)
        {
            
        }
    }

    draw()
    {
        if (this.state != null)
        {
            drawTopPanel(this.state);
            drawWordPanel(this.state);
        }
    }
}