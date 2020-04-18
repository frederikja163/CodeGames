new p5();

var txtSize;

function drawTopPanel(state)
{
    var size = createVector(width, height * .8);
    var wordSize = createVector(size.x / 10, size.y / 10);

    for (x = 0; x < board.length; x++)
    {
        for (y = 0; y < board[x].length; y++)
        {
            fill(1);
            rect(wordSize.x * x + txtSize, txtSize * y, wordSize.x, wordSize.y);
        }
    }
}