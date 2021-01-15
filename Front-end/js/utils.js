function getColorsForElem(elem)
{
    //Step1: Get rgb values
    //Step2: Check for black or white colors
    //Step3: Return correct colors
    let colorRaw = window.getComputedStyle(elem).getPropertyValue("background-color"); //rgb(56, 65, 255)
    let start = colorRaw.indexOf("(") + 1;
    let end = colorRaw.indexOf(")");
    let rgbColor = colorRaw.substring(start, end);
    let rgbColors = rgbColor.split(", ");
    let r = rgbColors[0];
    let g = rgbColors[1];
    let b = rgbColors[2];
    let hsp = Math.sqrt(0.229 * (r*r) + 0.587 * (g*g) + 0.114 * (b*b));

    let light = hsp > 127.5;
    let color = light ? "var(--backColor)" : "var(--topColor)";
    let backgroundColor = light ? "var(--topColor)" : "var(--backColor)";
    return {color: color, backgroundColor: backgroundColor};
}

function str(value)
{
    return JSON.stringify(value);
}

function getTeamElement(team)
{
    return Array.from(document.querySelectorAll(".playerlist > ul ul"))[team];
}

function getPlayerElement(pid)
{
    let pidElement = Array.from(document.querySelectorAll(".pid")).find(p => p.innerText === pid);
    return pidElement === undefined ? undefined : pidElement.parentElement;
}

function getTeamsData()
{
    let teams = [];
    let players = SERVER.room.players;

    for (let i = 0; i < players.length; i++)
    {
        let player = players[i];
        if (!teams[player.team])
        {
            teams[player.team] = [];
        }
        teams[player.team].push(player);
    }

    return teams;
}