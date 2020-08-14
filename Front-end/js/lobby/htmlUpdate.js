/*TODO:
    - Remove all c logs 
    - Fix name change (når man joiner med navn) (fix animation)
    - Add spymaster (fix spectator) (error when SM joins new team)
    - Kicking is weird 
    - Limit team count (teamCount is broken) ✅
    - Remove kick on owner ✅
    - Change up/down btns ✅
    - Leave btn ✅
    - Fix text colours on player name (dark / light) ✅
    - Hide owner content (start - +) ✅
    - Press enter to join game on welcome ✅
*/

function activateLobby()
{
    // Switch view to lobby
    welcome.style.display = HIDDEN;
    lobby.style.display = VISIBLE;

    // Add room ID to url if not existing
    let url = String(window.location);
    let ridStart = url.indexOf("#");
    if (ridStart == -1)
    {
        window.location += "#" + server.rid;
    }

    // Add the amount of teams specified by the server
    for (let i = 0; i < server.room.options.teamCount; i++)
    {
        addTeamElem();
    }

    // Add the players specified by the server
    for (let i = 0; i < server.room.players.length; i++)
    {
        playerJoined(server.room.players[i].pid);
    }

    // Change team count in options
    let teamsOptElement = document.querySelector("#lobby #options ul li:nth-child(1)");
    teamsOptElement.innerText = "Number of teams: " + String(server.room.options.teamCount);

    // Activate the name edit field
    document.querySelector("#lobby #nameField").setAttribute("value", server.room.players.find(p => p.pid === server.pid).name);//TODO: fix

    // Hide owner content if not owner
    if (server.pid != server.room.players[0].pid)
    {
        document.querySelectorAll(".owner").forEach(elem => elem.style.display = HIDDEN);
    }
}

function playerJoined(pid)
{
    let player = server.room.players.find(p => p.pid === pid);
    let team = getTeamElement(player.team);
    let playerElem = createPlayer(player);

    team.appendChild(playerElem);
}

function playerLeft(pid, oldRoom)
{
    getPlayerElement(pid).remove();

    if (server.pid === server.room.players[0].pid && server.pid != oldRoom.players[0].pid)
    {
        let players = document.querySelectorAll("#lobby #teams li ul li");
        for (let i = 0; i < players.length; i++)
        {
            let pid = players[i].children[0].innerText;
            let player = server.room.players.find(p => p.pid === pid);
            let btnElem = players[i].children[2];
            let teamColor = window.getComputedStyle(players[i].parentNode.parentNode).getPropertyValue("color");
            addOwnerOnlyPlayerButtons(btnElem, player, teamColor);
        }
    }
}

function nameChanged(pid)
{
    let player = server.room.players.find(p => p.pid === pid);
    let playerElement = getPlayerElement(pid);
    
    playerElement.children[1].innerText = player.name;
}

function playerKicked(pid, reason)
{
    if (server.pid == pid)
    {
        // Redirect to welcome
        let url = String(window.location);
        let ridStart = url.indexOf("#");
        window.location = url.slice(0, ridStart);

        // Reason pop-up
        alert("Nigga kicked bacause: " + reason);
    }
}

function nameEdit()
{
    let nameField = document.querySelector("#nameField");
    let nameEdit = document.querySelector("#nameEdit");
    let nameSubmit = document.querySelector("#nameSubmit");

    nameField.readOnly = false;
    nameField.focus();

    nameEdit.style.display = HIDDEN;
    nameSubmit.style.display = "initial";
}

function nameSubmit()
{
    let nameField = document.querySelector("#nameField");
    let nameEdit = document.querySelector("#nameEdit");
    let nameSubmit = document.querySelector("#nameSubmit");

    server.room.players.find(p => p.pid === server.pid).name = nameField.value;

    nameSubmit.style.display = HIDDEN;
    nameEdit.style.display = "initial";
}

function teamChanged(pid) // Hide smBtn in spectator
{
    let player = server.room.players.find(p => p.pid === pid);
    let teamElem = getTeamElement(player.team);
    let playerElem = getPlayerElement(pid);
    let colors = getColorsForElem(teamElem.parentElement);

    playerElem.children[1].style.color = colors.color;
    playerElem.querySelectorAll(".btn2").forEach(elem => elem.style.color = colors.backgroundColor);
    playerElem.querySelectorAll(".btn2").forEach(elem => elem.style.backgroundColor = colors.color);

    console.log(player.spymaster, player); // ALTID FALSE
    if (player.spymaster = false)
    {
        playerElem.querySelector(".smIcon").style.display = HIDDEN;
    }

    // Hide SM content on spectator
    if (player.team == 0)
    {
        if (playerElem.querySelector(".smBtn") != null)
        {
            playerElem.querySelector(".smBtn").style.display = HIDDEN;
        }
        playerElem.querySelector(".smIcon").style.display = HIDDEN;
    }

    // Reveal SM content if owner
    if (server.pid == pid)
    {
        if (player.team != 0)
        {
            playerElem.querySelector(".smBtn").style.display = 'initial';
        }
    }

    teamElem.appendChild(playerElem);
}

function getPlayerElement(pid)
{
    let pidElement = Array.from(document.querySelectorAll(".pid")).find(p => p.innerText === pid);
    return pidElement === undefined ? undefined : pidElement.parentElement;
}

function getTeamElement(team)
{
    return Array.from(document.querySelectorAll("#lobby #players #teams ul"))[team];
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
    pidElem.style.display = debugmode ? VISIBLE : HIDDEN;
    pidElem.style.gridColumn = "1 / 3";
    pidElem.style.gridRow = "2 / 3";
    pidElem.style.color = teamColor;
    pidElem.innerText = player.pid;
    
    // Create name div
    let nameElem = document.createElement("DIV");
    nameElem.style.color = teamColor;
    nameElem.innerText = player.name;

    // Create button div
    let btnElem = document.createElement("DIV");
    
    // Create spymaster icon
    let smElem = document.createElement("DIV");
    smElem.className = "smIcon";
    smElem.innerText = "🕵️";
    smElem.style.display = HIDDEN;

    btnElem.appendChild(smElem);
    if (server.pid === server.room.players[0].pid)
    {
        addOwnerOnlyPlayerButtons(btnElem, player, teamColor);
    }
    
    // Append children
    playerElem.appendChild(pidElem);
    playerElem.appendChild(nameElem);
    playerElem.appendChild(btnElem);

    return playerElem;
}

function addOwnerOnlyPlayerButtons(btnElem, player, teamColor)
{
    // Create spymaster button
    let smElem = document.createElement("BUTTON");
    smElem.className = "btn2 owner smBtn";
    smElem.id = player.pid;
    smElem.style.backgroundColor = teamColor;
    smElem.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    smElem.innerText = "🕵️";
    smElem.setAttribute('onclick', 'setSpymaster("' + player.pid + '")');
    console.log(player);
    if (player.team == 0)
    {
        smElem.style.display = HIDDEN;
    }
    
    // Create kick button
    let kickElem = document.createElement("BUTTON");
    kickElem.className = "btn2 owner kickBtn";
    kickElem.style.backgroundColor = teamColor;
    kickElem.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    kickElem.innerText = "🚫";
    kickElem.setAttribute('onclick', 'kick("' + player.pid + '")'); //TODO: maybe refactor?
    if (player.pid == server.room.players[0].pid)
    {
        kickElem.style.display = HIDDEN;
    }
    
    // Create move down team button
    let downElem = document.createElement("BUTTON");
    downElem.className = "btn2 owner";
    downElem.style.backgroundColor = teamColor;
    downElem.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    downElem.innerText = "⬇";
    downElem.setAttribute("onclick", "changeTeamDown('" + player.pid + "')");

    // Create move up team button
    let upElem = document.createElement("BUTTON");      
    upElem.className = "btn2 owner";
    upElem.style.backgroundColor = teamColor;
    upElem.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    upElem.innerText = "⬆";
    upElem.setAttribute("onclick", "changeTeamUp('" + player.pid + "')");
    
    // Append children
    btnElem.appendChild(smElem);
    btnElem.appendChild(kickElem);
    btnElem.appendChild(downElem);
    btnElem.appendChild(upElem);
}

function revealOwnerContent()
{
    if (server.pid == server.room.players[0].pid)
    {
        document.querySelectorAll(".owner").forEach(elem => elem.style.display = 'initial');
        getPlayerElement(server.pid).querySelector(".kickBtn").style.display = HIDDEN;
        getTeamElement(0).querySelectorAll(".smBtn").forEach(elem => elem.style.display = HIDDEN);
    }
}

function teamCountChanged()
{
    // Change team count in options
    let teamsOptElement = document.querySelector("#lobby #options ul li:nth-child(1)");
    teamsOptElement.innerText = "Number of teams: " + String(server.room.options.teamCount);
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
    let pidElements = Array.from(document.querySelectorAll("#lobby #teams li:last-child .pid"));

    for (let i = 0; i < pidElements.length; i++)
    {
        teamChanged(pidElements[i].innerText)
    }

    document.querySelector("#lobby #players #teams").lastChild.remove();
}

// function ownerContent()
// {
//     // Show owner content if owner
//     let ownerElements = document.querySelectorAll(".owner");

//     if (server.pid == server.room.players[0].pid)
//     {
//         for (let i = 0; i < ownerElements.length; i++)
//         {
//             ownerElements[i].style.display = "initial";

//             let spymaster = server.room.players.find(p => p.spymaster === true);
//             if (spymaster != undefined && ownerElements[i].id === spymaster.pid)
//             {
//                 ownerElements[i].style.display = HIDDEN;
//             }

//             /*
//             if (ownerElements[i].id == (server.room.players.find(p => p.team === 0) == undefined ? undefined : server.room.players.find(p => p.team === 0).pid))
//             {
//                 ownerElements[i].style.display = HIDDEN;
//             }
//             */
//         }
//     }
// }

function spymasterChanged(pid, oldPid)
{
    // Hide spymaster icon on old spymaster if any
    if (oldPid != null)
    {
        let oldPlayerElem = getPlayerElement(oldPid);
        oldPlayerElem.querySelector(".smIcon").style.display = HIDDEN;
        if (oldPlayerElem.querySelector(".smBtn") != null)
        {
            oldPlayerElem.querySelector(".smBtn").style.display = "inline";
        }
    }

    // Change spymaster button to spymaster icon
    let playerElem = getPlayerElement(pid);
    playerElem.querySelector(".smIcon").style.display = "inline";
    if (playerElem.querySelector(".smBtn") != null)
    {
        playerElem.querySelector(".smBtn").style.display = HIDDEN;
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

function leaveLobby()
{
    let url = String(window.location);
    let ridStart = url.indexOf("#");
    window.location = url.slice(0, ridStart);
}