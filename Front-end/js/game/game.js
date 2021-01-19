function swapToGame()
{
    lobby.style.display = "none";
    game.style.display = "grid";
    state = "game";
}

function initializePlayerlist()
{
    let teamsData = getTeamsData();

    document.querySelector("#game").prepend(document.querySelector(".playerlist"));
    document.querySelectorAll("#game > .playerlist .icon, #game > .playerlist .btn2").forEach(e => e.style.display = "none");

    for (let i = 0; i < SERVER.room.players.length; i++)
    {
        let player = SERVER.room.players[i];
        let playerElem = getPlayerElement(player.pid);

        if (player.spymaster)
        {
            let teamElem = getTeamElement(player.team);

            playerElem.querySelector(".smIcon").style.display = "inline";
            playerElem.querySelectorAll(".smIcon *").forEach(e => e.style.display = "inline");

            teamElem.prepend(playerElem);
        }
        else if (player.team > 0)
        {
            let slices = [];   
            for (let j = 0; j < teamsData[player.team].length; j++)
            {
                if (teamsData[player.team][j].pid === player.pid)
                {
                    slices[j] = true;
                }
                else
                {
                    slices[j] = false;
                }
            }
            
            let pie = new Pie(slices, teamNames[SERVER.room.players[i].team - 1]);
            pie.elem.style.display = "block"; // Move to CSS
            playerElem.querySelector(".btnWrap").appendChild(pie.elem);
        }
    }
}

function getAllFactors(n)
{
    let factorPairs = [];
    for (let i = 1; i < n / 2; i++)
    {
        if (n % i === 0)
        {
            factorPairs.push(
                {
                    factor1: i, factor2: n / i
                });
        }
    }
    return factorPairs;
}

function getBoardWidth(aspectRatio)
{
    let wordCount = SERVER.room.game.words.length;
    let factorPairs = getAllFactors(wordCount);
    let i = 1;
    while (factorPairs.length < 10)
    {
        factorPairs = factorPairs.concat(getAllFactors(wordCount + i++));
    }
    
    let bestRatioDiff = Math.abs((factorPairs[0].factor1 / factorPairs[0].factor2) - aspectRatio);
    let bestRatioInd = 0;
    for (let i = 1; i < factorPairs.length; i++)
    {
        let ratioDiff = Math.abs((factorPairs[i].factor1 / factorPairs[i].factor2) - aspectRatio);
        if (ratioDiff < bestRatioDiff)
        {
            bestRatioInd = i;
            bestRatioDiff = ratioDiff;
        }
    }

    let factorWords = factorPairs[bestRatioInd].factor1 * factorPairs[bestRatioInd].factor2;
    let sqrtSize = Math.ceil(Math.sqrt(wordCount));
    let sqrtWords = sqrtSize * sqrtSize;

    return factorWords < sqrtWords ? factorPairs[bestRatioInd].factor1 : sqrtSize;
}

function initializeBoard()
{
    const words = SERVER.room.game.words;
    const boardElem = document.querySelector("#board");
    const boardWidth = getBoardWidth(boardElem.offsetWidth / boardElem.offsetHeight);
    let rowElem;
    tiles = [];

    for (let i = 0; i < words.length; i++)
    {
        tiles[i] = new Tile(words[i].word, i);
        if (i % boardWidth === 0)
        {
            rowElem = document.createElement("TR");
            boardElem.appendChild(rowElem);
        }
        rowElem.appendChild(tiles[i].elem);
    }

    for (let i = 0; i < tiles.length; i++)
    {
        tiles[i].elem.style.height = str(tiles[i].elem.offsetHeight) + "px";
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
                marked.teams[t][count] = room.game.words[wordIndex].marked.includes(player.pid) ? true : false;
                count++;
            }
        }
    }

    return marked;
}

function initializeWord()
{
    let form = document.querySelector("#game > #word > form");
    
    if (SERVER.room.players.find(p => p.pid === SERVER.pid).spymaster)
    {
        form.style.display = "grid";
        form.querySelectorAll("input").forEach(e => e.style.display = "inline");
    }
    else
    {
        form.style.display = "none";
        form.querySelectorAll("input").forEach(e => e.style.display = "none");
    }
}

function wordSend()
{
    console.log("send");
}

class Pie
{
    constructor(filled, color)
    {
        this.sliceCount = filled.length - 1;
        this.color = color;
        this.elem = document.createElement("DIV");
        this.elem.className = "pie";
        
        this.update(filled);
    }

    update(filled)
    {
        if (!filled) 
        {
            filled = [true];
        }
        
        let backgroundStr = "conic-gradient(";

        for (let i = 1; i <= this.sliceCount; i++)
        {
            let angleStart = 360 / this.sliceCount * (i - 1);
            let angleEnd = 360 / this.sliceCount * i;
            let sliceColor = filled[i] ? this.color : "var(--topColor)";
            
            backgroundStr += String(sliceColor) + " " + str(angleStart) + "deg " + str(angleEnd) + "deg"; // Use String insted str to prevent double quotation marks
            if (i < this.sliceCount) backgroundStr += ", ";
            else backgroundStr += ")";
        }

        if (!filled.includes(true))
        {
            this.elem.style.opacity = "0";
            this.elem.style.width = "0";
            this.elem.style.height = "0";
        }
        else 
        {
            this.elem.style.opacity = "1";
            this.elem.style.width = "var(--btn2Size)";
            this.elem.style.height = "var(--btn2Size)";
        }

        this.elem.style.backgroundImage = backgroundStr;
    }
}

class Tile
{
    constructor(word, index)
    {
        this.word = word;
        this.index = index;
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
        let wordObj = SERVER.room.game.words[this.index];
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

        let wordObj = SERVER.room.game.words[this.index];
        if (wordObj.marked.includes(SERVER.pid))
        {
            let elemRgb = getElemRgb(this.elem, "background-color");
            this.elem.style.borderColor = "rgba(0, 0, 0, .5)";
            let backgroundColor = "rgb(" + str(parseInt(elemRgb[0]) + 60) + ", " + str(parseInt(elemRgb[1]) + 60) + ", " + str(parseInt(elemRgb[2]) + 60) + ")";
            this.elem.style.backgroundColor = backgroundColor;
        }
        else
        {
            this.elem.style.borderColor = "rgba(0, 0, 0, 0)";
            this.elem.style.padding = "var(--space)";
            this.update();
        }
    }
}
