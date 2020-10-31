﻿function initializeTeams()
{
    for (let i = 0; i < SERVER.room.options.teamCount; i++)
    {
        addTeamElem();
    }
}

function initializePlayers()
{
    for (let i = 0; i < SERVER.room.players.length; i++)
    {
        playerJoined(SERVER.room.players[i].pid);
    }
}

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

function getTeamElement(team)
{
    return Array.from(document.querySelectorAll("#lobby #players #teams ul"))[team];
}

function getPlayerElement(pid)
{
    let pidElement = Array.from(document.querySelectorAll(".pid")).find(p => p.innerText === pid);
    return pidElement === undefined ? undefined : pidElement.parentElement;
}

function createPlayer(player) // TODO: Create element on parent insted of document
{
    // Create list item
    let playerElem = document.createElement("LI");

    // Get color of player's team
    let teamElem = getTeamElement(player.team);
    let teamColor = window.getComputedStyle(teamElem).getPropertyValue("color");
    
    // Create pid div
    let pidElem = document.createElement("DIV");
    pidElem.className += " debug";
    pidElem.className += " pid";
    pidElem.style.display = debugMode ? "grid" : "none";
    pidElem.style.gridColumn = "1 / 3";
    pidElem.style.gridRow = "2 / 3";
    pidElem.style.color = teamColor;
    pidElem.innerText = player.pid;
    
    // Create name div
    let nameElem = document.createElement("DIV");
    nameElem.style.color = teamColor;
    nameElem.style.fontWeight = (SERVER.pid == player.pid) ? "800" : "500";
    nameElem.innerText = player.name;

    // Create button div
    let btnElem = document.createElement("DIV");
    
    // Create spymaster icon
    let smElem = document.createElement("DIV");
    smElem.className = "smIcon";
    //TODO: Change to a png image instead.
    smElem.innerText = "🕵️";
    smElem.style.fontSize = "16.56px";
    smElem.style.display = player.spymaster === true ? 'inline' : "none";

    // Add elements to btnDiv
    if (SERVER.pid === SERVER.room.players[0].pid) // If client is owner
    {
        btnElem.appendChild(createDownBtnElem(player, teamColor));
        btnElem.appendChild(createUpBtnElem(player, teamColor));
        btnElem.appendChild(createSmBtnElem(player, teamColor));
    }
    btnElem.appendChild(smElem);
    if (SERVER.pid === SERVER.room.players[0].pid && player.pid != SERVER.pid) // If client is owner and player isn't
    {
        btnElem.appendChild(createKickBtnElem(player, teamColor));
    }
    if (player.pid === SERVER.room.players[0].pid) // If player is owner
    {
        btnElem.appendChild(createOwnerIconElem());
    }
    
    // Append children
    playerElem.appendChild(pidElem);
    playerElem.appendChild(nameElem);
    playerElem.appendChild(btnElem);

    return playerElem;
}

function createDownBtnElem(player, teamColor)
{
    let downElem = document.createElement("BUTTON");
    downElem.className = "btn2 owner";
    downElem.style.backgroundColor = teamColor;
    downElem.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    //TODO: Change to a png image instead.
    downElem.innerText = "⬇";
    downElem.setAttribute("onclick", "changeTeamDown('" + player.pid + "')");

    return downElem;
}

function createUpBtnElem(player, teamColor)
{
    let upElem = document.createElement("BUTTON");      
    upElem.className = "btn2 owner";
    upElem.style.backgroundColor = teamColor;
    upElem.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    //TODO: Change to a png image instead.
    upElem.innerText = "⬆";
    upElem.setAttribute("onclick", "changeTeamUp('" + player.pid + "')");

    return upElem;
}

function createSmBtnElem(player, teamColor)
{
    let smElem = document.createElement("BUTTON");
    smElem.className = "btn2 owner smBtn";
    smElem.id = player.pid;
    smElem.style.backgroundColor = teamColor;
    smElem.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    //TODO: Change to a png image instead.
    smElem.innerText = "🕵️";
    smElem.setAttribute('onclick', 'setSpymaster("' + player.pid + '")');

    return smElem;
}

function createOwnerIconElem()
{
    let ownerElem = document.createElement("DIV");
    ownerElem.className = "ownerIcon";
    ownerElem.style.fontSize = "15.294px";
    //TODO: Change to a png image instead.
    ownerElem.innerText = "👑";

    return ownerElem;
}

function createKickBtnElem(player, teamColor)
{
    let kickElem = document.createElement("BUTTON");
    kickElem.className = "btn2 owner kickBtn";
    kickElem.style.backgroundColor = teamColor;
    kickElem.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    //TODO: Change to a png image instead.
    kickElem.innerText = "🚫";
    kickElem.setAttribute('onclick', 'kick("' + player.pid + '")');

    return kickElem;
}

function addTeamElem()
{
    let teamList = document.querySelector("#lobby #teams");
    let teamName = teamNames[teamList.children.length - 1];

    // Create team box
    let team = document.createElement("LI");
    team.id = teamName;
    team.className = "box";
    team.style.backgroundColor = teamName != undefined ? teamName : "var(--topColor)";

    // Create team title
    let title = document.createElement("H3");
    title.innerHTML = (teamName != undefined ? teamName : "Please remove this") + " team";
    
    // Create team list
    let list = document.createElement("UL");
    
    // Add element to team
    team.appendChild(title);
    team.appendChild(list);

    // Add team to player list
    teamList.appendChild(team);

    // Set text-colour for team box
    team.style.color = getColorsForElem(team).color;
}

function removeTeamElem()
{
    let pidElements = Array.from(document.querySelectorAll("#lobby #teams > li:last-child .pid"));

    for (let i = 0; i < pidElements.length; i++)
    {
        teamChanged(pidElements[i].innerText);
    }

    document.querySelector("#lobby #players #teams").lastChild.remove();
}

function playerJoined(pid)
{
    let player = SERVER.room.players.find(p => p.pid === pid);
    let team = getTeamElement(player.team);
    let playerElem = createPlayer(player);

    if (SERVER.pid == SERVER.room.players[0].pid)
    {
        playerElem.querySelector(".smBtn").style.display = HIDDEN;
    }

    team.appendChild(playerElem);
}

function playerLeft(pid, oldRoom)
{
    getPlayerElement(pid).remove();

    //Owner swap
    if (SERVER.pid === SERVER.room.players[0].pid && SERVER.pid != oldRoom.players[0].pid)
    {
        let players = document.querySelectorAll("#lobby #teams li ul li");
        for (let i = 0; i < players.length; i++)
        {
            let ppid = players[i].children[0].innerText;
            let player = SERVER.room.players.find(p => p.pid === ppid);
            let btnElem = players[i].children[2];
            let teamColor = window.getComputedStyle(players[i].parentNode.parentNode).getPropertyValue("color");
            
            btnElem.prepend(createUpBtnElem(player, teamColor));
            btnElem.prepend(createDownBtnElem(player, teamColor));
            btnElem.appendChild(createSmBtnElem(player, teamColor));
            if (ppid != SERVER.room.players[0].pid)
            {
                btnElem.appendChild(createKickBtnElem(player, teamColor));
            }
        }
    }

    if (pid === oldRoom.players[0].pid)
    {
        let playerElem = getPlayerElement(SERVER.room.players[0].pid);
        playerElem.children[2].appendChild(createOwnerIconElem());
    }
}

function teamChanged(pid)
{
    let player = SERVER.room.players.find(p => p.pid === pid);
    let teamElem = getTeamElement(player.team);
    let playerElem = getPlayerElement(pid);
    let colors = getColorsForElem(teamElem.parentElement);

    playerElem.children[1].style.color = colors.color;
    playerElem.querySelectorAll(".btn2").forEach(elem => 
    {
        elem.style.color = colors.backgroundColor;
        elem.style.backgroundColor = colors.color;
    });

    //Hide all SM content on playerElem.

    //Owners and non-owners.
    playerElem.querySelector(".smIcon").style.display = HIDDEN;
    
    //Owners only.
    if (SERVER.pid == SERVER.room.players[0].pid)
    {
        if (player.team == 0)
        {
            playerElem.querySelector(".smBtn").style.display = HIDDEN;
        }
        else
        {
            playerElem.querySelector(".smBtn").style.display = 'initial';
        }

    }

    teamElem.insertBefore(playerElem, teamElem.children[SERVER.room.players.findIndex(p => p.pid == playerElem.querySelector(".pid").innerText)]);
}

function nameChanged(pid)
{
    let player = SERVER.room.players.find(p => p.pid === pid);
    let playerElement = getPlayerElement(pid);
    
    playerElement.children[1].innerText = player.name;
}

function spymasterChanged(pid, oldPid)
{
    let playerElem = getPlayerElement(pid);
    let oldPlayerElem = getPlayerElement(oldPid);
    
    // Owners and non-owners
    playerElem.querySelector(".smIcon").style.display = 'initial';

    if (oldPlayerElem)
    {
        oldPlayerElem.querySelector(".smIcon").style.display = HIDDEN;
    }
    else if (oldPid)
    {
        console.warn("Didn't find the player elem for " + pid);
    }

    // Owners only
    if (SERVER.pid == SERVER.room.players[0].pid)
    {
        playerElem.querySelector(".smBtn").style.display = HIDDEN;

        if (oldPlayerElem)
        {
            oldPlayerElem.querySelector(".smBtn").style.display = 'initial';
        }
        else if (oldPid)
        {
            console.warn("Didn't find the player elem for " + pid);
        }
    }
}