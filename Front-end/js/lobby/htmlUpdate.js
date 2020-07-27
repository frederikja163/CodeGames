/*TODO:
    - Fix team removal ✅
    - Fix css on player list ✅
    - Fix name change ✅
    - Add spymaster
    - Owner view ✅
    - Fix css on start button hover
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
    console.log(SERVER.room.players.find(p => p.pid === SERVER.pid).name);
}

function playerJoined(pid)
{
    let player = SERVER.room.players.find(p => p.pid === pid);
    let team = getTeamElement(player.team);
    let playerElement = createPlayer(player);

    team.appendChild(playerElement);
}

function playerLeft(pid)
{
    getPlayerElement(pid).remove();
}

function nameChanged(pid)
{
    let player = SERVER.room.players.find(p => p.pid === pid);
    let playerElement = getPlayerElement(pid);
    
    playerElement.children[1].innerText = player.name;
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

function teamChanged(pid)
{
    let player = SERVER.room.players.find(p => p.pid === pid);
    let team = getTeamElement(player.team);
    let playerElement = getPlayerElement(pid);

    playerElement.remove();
    team.appendChild(createPlayer(player));
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
    
function createPlayer(player)
{
    // Create list item
    let li = document.createElement("LI");

    // Get background color of player's team
    let teamLi = getTeamElement(player.team);
    let teamColor = window.getComputedStyle(teamLi, null).getPropertyValue("color");
    
    // Create pid div
    let pidDiv = document.createElement("DIV");
    pidDiv.className += " debug";
    pidDiv.className += " pid";
    pidDiv.style.display = debugmode ? VISIBLE : HIDDEN;
    pidDiv.style.gridColumn = "1 / 3";
    pidDiv.style.gridRow = "2 / 3";
    pidDiv.style.color = teamColor;
    pidDiv.innerText = player.pid;
    
    // Create name div
    let nameDiv = document.createElement("DIV");
    nameDiv.style.color = teamColor;
    nameDiv.innerText = player.name;

    // Create button div
    let btnDiv = document.createElement("DIV");
    
    // Create spymaster button
    let smBtn = document.createElement("BUTTON");
    smBtn.className = "btn2 owner";
    smBtn.style.backgroundColor = teamColor;
    smBtn.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    smBtn.innerText = "🕵️";
    btnDiv.appendChild(smBtn);
    
    // Create kick button
    let kickBtn = document.createElement("BUTTON");
    kickBtn.className = "btn2 owner";
    kickBtn.style.backgroundColor = teamColor;
    kickBtn.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    kickBtn.innerText = "🚫";
    kickBtn.setAttribute('onclick', 'SERVER.kickPlayer("' + player.pid + '", \"Fuck off\")'); //TODO: maybe refactor?
    
    // Create move up team button
    let upBtn = document.createElement("BUTTON");      
    upBtn.className = "btn2 owner";
    upBtn.style.backgroundColor = teamColor;
    upBtn.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    upBtn.innerText = "⬆";
    upBtn.setAttribute("onclick", "SERVER.setTeam('" + player.pid + "', " + String(player.team - 1) + ")");
    
    // Create move down team button
    let downBtn = document.createElement("BUTTON");
    downBtn.className = "btn2 owner";
    downBtn.style.backgroundColor = teamColor;
    downBtn.style.color = teamColor != "rgb(30, 30, 30)" ? "var(--backColor)" : "var(--topColor)";
    downBtn.innerText = "⬇";
    downBtn.setAttribute("onclick", "SERVER.setTeam('" + player.pid + "', " + String(player.team + 1) + ")");

    btnDiv.appendChild(kickBtn);
    btnDiv.appendChild(upBtn);
    btnDiv.appendChild(downBtn);
    
    // Append children
    li.appendChild(pidDiv);
    li.appendChild(nameDiv);
    li.appendChild(btnDiv);

    return li;
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

function ownerContent()
{
    // Show owner content if owner
    let ownerElements = document.querySelectorAll(".owner");

    if (SERVER.pid == SERVER.room.players[0].pid)
    {
        for (let i = 0; i < ownerElements.length; i++)
        {
            ownerElements[i].style.display = "initial";
        }
    }
}