function swapToGame()
{
    lobby.style.display = "none";
    game.style.display = "grid";
}

function initializeBoard()
{
    let boardSize = [5, 5];

    let words = SERVER.room.words;
    let boardElem = document.querySelector("#board");
    let rowElems = [];
    let boardTiles = [];
    let x = -1;
    let y = -1;

    for (let i = 0; i < words.length; i++)
    {
        tiles[i] = new Tile(words[i].word, i, [y, x], words[i].team);
        x += i % boardSize[0] === 0 ? 1 : 0;
        if (i % boardSize[1] === 0)
        {
            y++;
            boardTiles[y] = [];
            rowElems[y] = document.createElement("TR");
        }
        boardTiles[y][x] = tiles[i];
        tiles[i].pos = [y, x];
        rowElems[y].appendChild(boardTiles[y][x].elem);
        if (i % boardSize[1] === 0)
        {
            boardElem.appendChild(rowElems[y]);
        }
    }
}

class Tile
{
    constructor(word, index, pos, team)
    {
        this.word = word;
        this.index = index;
        this.pos = pos;
        this.team = team;
        this.elem = document.createElement("TD");
        this.elem.className = "box";
        this.elem.innerHTML = this.word;
        
        this.update();

        this.elem.onmouseup = (event) =>
        {
            if (event.button === 0) // Left click
            {
                SERVER.markWord(this.index);
            }
            else if (event.button === 2) // Right click
            {
                SERVER.selectWord(this.index);
            }
        }
    }

    update()
    {
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

    mark()
    {
        this.elem.style.backgroundColor = "yellow";
    }
}
