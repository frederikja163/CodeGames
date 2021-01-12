function swapToGame()
{
    lobby.style.display = "none";
    game.style.display = "grid";
    state = "game";
}

function initializePlayerlist()
{
    document.querySelector("#game").prepend(document.querySelector(".playerlist"));
    document.querySelectorAll("#game > .playerlist .icon, .btn2").forEach(e => e.style.display = "none");

    for (let i = 0; i < SERVER.room.players.length; i++)
    {
        if (SERVER.room.players[i].spymaster)
        {
            let playerElem = getPlayerElement(SERVER.room.players[i].pid);
            let teamElem = getTeamElement(SERVER.room.players[i].team);

            playerElem.querySelector(".smIcon").style.display = "inline";
            playerElem.querySelectorAll(".smIcon *").forEach(e => e.style.display = "inline");

            teamElem.prepend(playerElem);
        }
    }
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
        tiles[i] = new Tile(words[i].word, i, [y, x]);
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

function getElemRgb(elem, property)
{
    let colorRaw = window.getComputedStyle(elem, null).getPropertyValue(property);
    let start = colorRaw.indexOf("(") + 1;
    let end = colorRaw.indexOf(")");
    let rgbColor = colorRaw.substring(start, end);
    return rgbColor.split(", ");
}

function getMarked(room, wordIndex)
{
    marked = {
        total: 0,
        teams: [[]],
    };
    let players = room.players;
    for (let t = 1; t <= room.options.teamCount; t++)
    {
        marked.teams[t] = [];
        let count = 0;
        for (let p = 0; p < players.length; p++)
        {
            let player = players[p];
            if (player.team === t)
            {
                marked.teams[t][count] = room.words[wordIndex].marked.includes(player.pid) ? true : false;
                count++;
            }
        }
    }

    return marked;
}

class Pie
{
    constructor(filled, color)
    {
        this.filled = filled === undefined ? [true] : filled;
        this.sliceCount = this.filled.length - 1;
        this.color = color;
        this.elem = document.createElement("DIV");
        this.elem.className = "pie";
        
        this.update(this.filled);
    }

    update(filled)
    {
        this.filled = filled === undefined ? [true] : filled;
        let backgroundStr = "conic-gradient(";

        for (let i = 1; i <= this.sliceCount; i++)
        {
            let angleStart = 360 / this.sliceCount * (i - 1);
            let angleEnd = 360 / this.sliceCount * i;
            let sliceColor = this.filled[i] ? this.color : "var(--topColor)";
            
            backgroundStr += String(sliceColor) + " " + str(angleStart) + "deg " + str(angleEnd) + "deg"; // Use String insted str to prevent double quotation marks
            if (i < this.sliceCount) backgroundStr += ", ";
            else backgroundStr += ")";
        }

        if (!this.filled.includes(true)) this.elem.style.display = "none";
        else this.elem.style.display = "inline";

        this.elem.style.backgroundImage = backgroundStr;
    }
}

class Tile
{
    constructor(word, index, pos)
    {
        this.word = word;
        this.index = index;
        this.pos = pos;
        this.selected = false;
        this.marked = getMarked(SERVER.room, this.index);
        
        this.pieCount = 0;
        for (let i = 0; i < this.marked.teams.length; i++)
        {
            this.pieCount += this.marked.teams[i].length > 1 ? 1 : 0;
        }
        
        this.elem = document.createElement("TD");
        this.elem.className = "box";
        
        this.wrapElem = document.createElement("DIV");
        this.wrapElem.style.gridTemplateColumns = "repeat(" + str(this.pieCount) + ", calc(100% / " + str(this.pieCount) + "))";
        this.elem.appendChild(this.wrapElem);
        
        this.txtWrapElem = document.createElement("DIV");
        this.txtWrapElem.className = "txt";
        this.txtWrapElem.innerHTML = this.word;
        this.wrapElem.appendChild(this.txtWrapElem);
        
        this.pies = [];
        for (let t = 1; t < this.marked.teams.length; t++)
        {
            this.pies[t] = new Pie(this.marked.teams[t], teamNames[t - 1]);
            this.wrapElem.appendChild(this.pies[t].elem);
        }

        this.update();

        this.elem.onmouseup = (event) =>
        {
            if (event.button === 0 && this.selected === false) // Left click
            {
                SERVER.selectWord(this.index);
                this.selected = true;
            }
            else if (event.button === 2) // Right click
            {
                SERVER.markWord(this.index);
            }
        }
    }

    update()
    {
        let wordObj = SERVER.room.words[this.index];
        this.team = wordObj.team;
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
            this.elem.style.color = "var(--backColor)";
        }
        else
        {
            this.elem.style.backgroundColor = teamNames[this.team - 1];
            this.elem.style.color = getColorsForElem(this.elem).color;
        }
    }

    mark()
    {
        this.marked = getMarked(SERVER.room, this.index);

        for (let t = 1; t < this.marked.teams.length; t++)
        {
            this.pies[t].update(this.marked.teams[t]);
        }

        let wordObj = SERVER.room.words[this.index];
        if (wordObj.marked.includes(SERVER.pid))
        {
            let elemRgb = getElemRgb(this.elem, "background-color");
            let borderColor = "rgb(" + str(parseInt(elemRgb[0]) - 100) + ", " + str(parseInt(elemRgb[1]) - 100) + ", " + str(parseInt(elemRgb[2]) - 100) + ")";
            this.elem.style.border = "var(--space) solid " + borderColor;
            this.elem.style.padding = "0px";
            let backgroundColor = "rgb(" + str(parseInt(elemRgb[0]) + 60) + ", " + str(parseInt(elemRgb[1]) + 60) + ", " + str(parseInt(elemRgb[2]) + 60) + ")"
            this.elem.style.backgroundColor = backgroundColor;
        }
        else
        {
            this.elem.style.border = "none";
            this.elem.style.padding = "var(--space)";
            this.update();
        }
    }
}
