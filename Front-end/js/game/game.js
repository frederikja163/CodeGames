function swapToGame()
{
    lobby.style.display = HIDDEN;
    game.style.display = VISIBLE;
}

function initializeBoard()
{
    let boardSize = [4, 6];

    let words = SERVER.room.words;
    let boardElem = document.querySelector("#board");
    let tiles = [];
    let rowElems = [];

    for (let y = 0; y < boardSize[1]; y++)
    {   
        tiles[y] = [];
        rowElems[y] = document.createElement("TR");
        for (let x = 0; x < boardSize[0]; x++) // Lav om til server rækkefølge
        {
            let wordIndex = Math.floor(Math.random() * words.length);
            
            tiles[y][x] = new Tile(words[wordIndex].word, [y, x], words[wordIndex].team);
            rowElems[y].appendChild(tiles[y][x].elem);
            
            words.splice(wordIndex, 1);
        }

        boardElem.appendChild(rowElems[y]);
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
        this.elem.innerHTML = word;
        this.elem.style.backgroundColor = this.team === 0 ? "var(--topColor)" : teamNames[this.team - 1];
    }
}
