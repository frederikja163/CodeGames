function swapToGame()
{
    lobby.style.display = HIDDEN;
    game.style.display = VISIBLE;
}

function initializeBoard()
{
    let boardSize = [5, 5];

    let words = SERVER.room.words;
    let boardElem = document.querySelector("#board");
    let tiles = [];
    let rowElems = [];
    let x = -1;
    let y = -1;

    for (let i = 0; i < words.length; i++)
    {
        x += i % boardSize[0] === 0 ? 1 : 0;
        if (i % boardSize[1] === 0)
        {
            y++;
            tiles[y] = [];
            rowElems[y] = document.createElement("TR");
        }
        tiles[y][x] = new Tile(words[i].word, [y, x], words[i].team);
        rowElems[y].appendChild(tiles[y][x].elem);
        if (i % boardSize[1] === 0)
        {
            boardElem.appendChild(rowElems[y]);
        }
    }
}

class Tile
{
    constructor(word, pos, team)
    {
        this.word = word;
        this.pos = pos;
        this.team = team;
        this.elem = document.createElement("TD");

        this.elem.className = "box";
        this.elem.innerHTML = this.word;
        if (this.team === -2)
        {
            this.elem.style.backgroundColor = "gray";
            this.elem.style.color = "var(--topColor)";
        }
        else if (this.team === -1)
        {
            this.elem.style.backgroundColor = "var(--backColor)";
            this.elem.style.color = "var(--topColor)";
        }
        else if (this.team === 0)
        {
            this.elem.style.backgroundColor = "var(--topColor)";
        }
        else
        {
            this.elem.style.backgroundColor = teamNames[this.team - 1];
            this.elem.style.color = getColorsForElem(this.elem).color;
        }
    }
}
