/*TODO:
    - Fix team removal
    - Fix css on player list
    - Fix name change
    - Add spymaster
    - Owner view
*/

function activateLobby()
{
    welcome.style.display = HIDDEN;
    lobby.style.display = VISIBLE;

    let url = String(window.location);
    let ridStart = url.indexOf("#");
    if (ridStart == -1)
    {
        window.location += "#" + SERVER.rid;
    }

    document.querySelector("#lobby #nameEditField").setAttribute("value", SERVER.room.players.find(p => p.pid === SERVER.pid).name);//TODO: fix

    for (let i = 0; i < SERVER.room.options.teamCount; i++){
        addTeam();
    }

    for (let i = 0; i < SERVER.room.players.length; i++)
    {
        playerJoined(SERVER.room.players[i].pid);
    }
}

function nameChanged(pid)
{
    let player = SERVER.room.players.find(p => p.pid === pid);
    let playerElement = getPlayerElement(pid);
    
    playerElement.children[1].innerText = player.name;
}

function playerLeft(pid)
{
    getPlayerElement(pid).remove();
}

function playerJoined(pid)
{
    let player = SERVER.room.players.find(p => p.pid === pid);
    let team = getTeamElement(player.team);
    let playerElement = createPlayer(player);

    team.appendChild(playerElement);
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
    
    // Create pid div
    let pidDiv = document.createElement("DIV");
    pidDiv.className += " debug";
    pidDiv.className += " pid";
    pidDiv.style.display = debugmode ? VISIBLE : HIDDEN;
    pidDiv.innerText = player.pid;
    
    // Create name div
    let nameDiv = document.createElement("DIV");
    nameDiv.innerText = player.name;

    // Create button div
    let btnDiv = document.createElement("DIV");
    
    // Create spymaster button
    let smBtn = document.createElement("BUTTON");
    smBtn.className = "btn2";
    smBtn.innerText = "S";
    btnDiv.appendChild(smBtn);
    
    // Create kick button
    let kickBtn = document.createElement("BUTTON");
    kickBtn.className = "btn2";
    kickBtn.innerText = "K";
    kickBtn.setAttribute('onclick', 'SERVER.kickPlayer("' + player.pid + '", \"Fuck off\")'); //TODO: maybe refactor?
    
    // Create move up team button
    let upBtn = document.createElement("BUTTON");      
    upBtn.className = "btn2";
    upBtn.innerText = "^";
    upBtn.setAttribute("onclick", "SERVER.setTeam('" + player.pid + "', " + String(player.team - 1) + ")");
    
    // Create move down team button
    let downBtn = document.createElement("BUTTON");
    downBtn.className = "btn2";
    downBtn.innerText = "V";
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


function addTeam()
{
    let teamList = document.querySelector("#lobby #players #teams");
    let teamName = teamNames[teamList.children.length - 1];

    // Create team box
    let team = document.createElement("LI");
    team.className = "box";
    team.style.backgroundColor = teamName;

    // Create team title
    let title = document.createElement("H3");
    title.innerHTML = teamName + " team";
    
    // Create team list
    let list = document.createElement("UL");
    
    team.appendChild(title);
    team.appendChild(list);

    // Add team to player list
    teamList.appendChild(team);
}

function removeTeam()
{
    let pidElements = Array.from(document.querySelectorAll(".pid"));

    for (let i = 0; i < pidElements.length; i++)
    {
        teamChanged(pidElements[i].innerText)
    }

    document.querySelector("#lobby #players #teams").lastChild.remove();
}