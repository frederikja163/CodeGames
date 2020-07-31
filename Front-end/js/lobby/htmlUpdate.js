/*TODO:
    - Fix team removal ✅
    - Fix css on player list ✅
    - Fix name change (✅ undtagen når man joiner med navn)
    - Add spymaster
    - Owner view (✅ only on player list)
    - Fix css on start button hover ✅
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
        window.location += "#" + SERVER.rid;
    }

    // Add the amount of teams specified by the server
    for (let i = 0; i < SERVER.room.options.teamCount; i++)
    {
        addTeam();
    }

    // Add the players specified by the server
    for (let i = 0; i < SERVER.room.players.length; i++)
    {
        playerJoined(SERVER.room.players[i].pid);
    }

    // Change team count in options
    let teamsOptElement = document.querySelector("#lobby #options ul li:nth-child(1)");
    teamsOptElement.innerText = "Number of teams: " + String(SERVER.room.options.teamCount);

    // Activate the name edit field
    document.querySelector("#lobby #nameField").setAttribute("value", SERVER.room.players.find(p => p.pid === SERVER.pid).name);//TODO: fix
}

function playerJoined(pid)
{
    let player = SERVER.room.players.find(p => p.pid === pid);
    let team = getTeamElement(player.team);
    let playerElement = createPlayer(player);

    team.appendChild(playerElement);
}

function playerLeft(pid, oldRoom)
{
    getPlayerElement(pid).remove();

    if (SERVER.pid === SERVER.room.players[0].pid && SERVER.pid != oldRoom.players[0].pid)
    {
        let players = document.querySelectorAll("#lobby #teams li ul li");
        for (let i = 0; i < players.length; i++)
        {
            let pid = players[i].children[0].innerText;
            let player = SERVER.room.players.find(p => p.pid === pid);
            let btnElem = players[i].children[2];
            let teamColor = window.getComputedStyle(players[i].parentNode.parentNode).getPropertyValue("color");
            addOwnerOnlyPlayerButtons(btnElem, player, teamColor);
        }
    }
}

function nameChanged(pid)
{
    let player = SERVER.room.players.find(p => p.pid === pid);
    let playerElement = getPlayerElement(pid);
    
    playerElement.children[1].innerText = player.name;
}

function playerKicked(pid, reason)
{
    if (SERVER.pid == pid)
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

    SERVER.room.players.find(p => p.pid === SERVER.pid).name = nameField.value;

    nameSubmit.style.display = HIDDEN;
    nameEdit.style.display = "initial";
}

function teamChanged(pid) // Hide smBtn in spectator
{
    let player = SERVER.room.players.find(p => p.pid === pid);
    let teamElem = getTeamElement(player.team);
    let playerElem = getPlayerElement(pid);
    let colors = getColorsForElem(teamElem.parentElement);
    console.log(colors);

    playerElem.children[1].style.color = colors.color;
    playerElem.querySelectorAll(".btn2").forEach(elem => elem.style.color = colors.backgroundColor);
    playerElem.querySelectorAll(".btn2").forEach(elem => elem.style.backgroundColor = colors.color);

    //playerElem.remove();
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

    btnElem.appendChild(smElem);
    if (SERVER.pid === SERVER.room.players[0].pid)
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
    
    // Create kick button
    let kickElem = document.createElement("BUTTON");
    kickElem.className = "btn2 owner";
    kickElem.style.backgroundColor = teamColor;
    kickElem.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    kickElem.innerText = "🚫";
    kickElem.setAttribute('onclick', 'kick("' + player.pid + '")'); //TODO: maybe refactor?
    
    // Create move up team button
    let upElem = document.createElement("BUTTON");      
    upElem.className = "btn2 owner";
    upElem.style.backgroundColor = teamColor;
    upElem.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    upElem.innerText = "⬆";
    upElem.setAttribute("onclick", "changeTeamUp('" + player.pid + "')");
    
    // Create move down team button
    let downElem = document.createElement("BUTTON");
    downElem.className = "btn2 owner";
    downElem.style.backgroundColor = teamColor;
    downElem.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    downElem.innerText = "⬇";
    downElem.setAttribute("onclick", "changeTeamDown('" + player.pid + "')");
    
    // Append children
    btnElem.appendChild(smElem);
    btnElem.appendChild(kickElem);
    btnElem.appendChild(upElem);
    btnElem.appendChild(downElem);
}

function teamCountChanged()
{
    // Change team count in options
    let teamsOptElement = document.querySelector("#lobby #options ul li:nth-child(1)");
    teamsOptElement.innerText = "Number of teams: " + String(SERVER.room.options.teamCount);
}

function addTeam()
{
    let teamList = document.querySelector("#lobby #teams");
    let teamName = teamNames[teamList.children.length - 1];

    // Create team box
    let team = document.createElement("LI");
    team.className = "box";
    team.style.backgroundColor = teamName != undefined ? teamName[0] : "var(--topColor)";
    team.style.color = teamName != undefined ? (teamName[1] == "light" ? "var(--topColor)" : "var(--backColor)") : "var(--backColor)";

    // Create team title
    let title = document.createElement("H3");
    title.innerHTML = (teamName != undefined ? teamName[0] : "Please remove this") + " team";
    
    // Create team list
    let list = document.createElement("UL");
    
    // Add element to team
    team.appendChild(title);
    team.appendChild(list);

    // Add team to player list
    teamList.appendChild(team);
}

function removeTeam()
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

//     if (SERVER.pid == SERVER.room.players[0].pid)
//     {
//         for (let i = 0; i < ownerElements.length; i++)
//         {
//             ownerElements[i].style.display = "initial";

//             let spymaster = SERVER.room.players.find(p => p.spymaster === true);
//             if (spymaster != undefined && ownerElements[i].id === spymaster.pid)
//             {
//                 ownerElements[i].style.display = HIDDEN;
//             }

//             /*
//             if (ownerElements[i].id == (SERVER.room.players.find(p => p.team === 0) == undefined ? undefined : SERVER.room.players.find(p => p.team === 0).pid))
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
        oldPlayerElem.querySelector(".smBtn").style.display = "inline";
    }

    // Change spymaster button to spymaster icon
    let playerElem = getPlayerElement(pid);
    playerElem.querySelector(".smIcon").style.display = "inline";
    playerElem.querySelector(".smBtn").style.display = HIDDEN;
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

    let light = (r * 0.299) + (g * 0.587) + (b * 0.114) > 186;
    let color = light ? "var(--backColor)" : "var(--topColor)";
    let backgroundColor = light ? "var(--topColor)" : "var(--backColor)";
    return {color: color, backgroundColor: backgroundColor};
}