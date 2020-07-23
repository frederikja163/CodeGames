const SERVER = new Server("http://localhost", 9999);

const HIDDEN = "none";
const VISIBLE = "grid";

let welcome;
let lobby;
let debugmode = false;
let teamNames = ["Red", "Blue", "Green", "Yellow", "Pink"];

document.addEventListener('keyup', (event) => {
    if(event.keyCode == 113){
        debugmode = !debugmode;
        document.querySelector("#debugWarning").style.display = debugmode? VISIBLE : HIDDEN;
        this.updatePlayerList();
    }
});

window.onload = () => {
    welcome = document.querySelector("#welcome");
    lobby = document.querySelector("#lobby");

    let url = String(window.location);
    let ridStart = url.indexOf("#");
    if (ridStart != -1)
    {
        let rid = url.substring(ridStart + 1);
        SERVER.joinRoom(rid);
    }



    console.log(SERVER);
}

SERVER.onRoomJoined = (room, rid, pid) => {
    SERVER.room = room;
    SERVER.rid = rid;
    SERVER.pid = pid;

    welcome.style.display = HIDDEN;
    lobby.style.display = VISIBLE;

    let url = String(window.location);
    let ridStart = url.indexOf("#");
    if (ridStart == -1)
    {
        window.location += "#" + SERVER.rid;
    }
    // TODO: update link, change iframe src to lobby html

    document.querySelector("#lobby #nameEditField").setAttribute("value", SERVER.room.players.find(p => p.pid === SERVER.pid).name);

    updatePlayerList();
};

SERVER.onPlayerJoined = (room, pid) => {
    SERVER.room = room;

    updatePlayerList();
}

SERVER.onPlayerLeft = (room, pid) => {
    SERVER.room = room;

    updatePlayerList();
}

SERVER.onNameChanged = (room, pid) => {
    SERVER.room = room;

    updatePlayerList();
}

SERVER.onTeamCountChanged = (room) => {
    let teamCountDiff = room.options.teamCount - SERVER.room.options.teamCount;
    
    SERVER.room = room;

    let playerList = document.querySelector("#lobby #players");

    if ()

    for (let i = 2; i < playerList.childNodes.length; i++)
    {
        playerList.childNodes[i].remove()
    }

    console.log(document.querySelector("#lobby #players:nth-child(n+3)"));
    if (document.querySelector("#lobby #players:nth-child(n+3)") != null)
    {
        document.querySelector("#lobby #players:nth-child(n+3)").remove();
    }

    for (let i = 1; i < SERVER.room.options.teamCount; i++)
    {

    }
};

function joinBtnOnClick()
{
    let name = document.getElementById("welcomeInputName").value;
    let rid = document.getElementById("welcomeInputRid").value;
    
    SERVER.joinRoom(rid);
    SERVER.setName(name);
}

function updatePlayerList()
{
    document.querySelector("#lobby #players ul").innerHTML = "";

    let playerList = document.querySelector("#lobby #players ul");

    for (let i = 0; i < SERVER.room.players.length; i++)
    {
        // Create list item
        let li = document.createElement("LI");

        // Create name div
        let divName = document.createElement("DIV");
        divName.innerText = SERVER.room.players[i].name + "\t" + (debugmode ? SERVER.room.players[i].pid : "");
        li.appendChild(divName);

        // Create button div
        let divBtn = document.createElement("DIV");

        // Create spymaster button
        let btnSm = document.createElement("BUTTON");
        btnSm.className = "btn2";
        btnSm.innerText = "S";
        divBtn.appendChild(btnSm);

        // Create kick button
        let btnKick = document.createElement("BUTTON");
        btnKick.className = "btn2";
        btnKick.innerText = "K";
        btnKick.setAttribute('onclick', 'SERVER.kickPlayer("' + SERVER.room.players[i].pid + '", \"Fuck off\")');
        divBtn.appendChild(btnKick);

        // Create move up team button
        let btnUp = document.createElement("BUTTON");      
        btnUp.className = "btn2";
        btnUp.innerText = "^";
        btnUp.setAttribute("onclick", "SERVER.setTeam('" + SERVER.room.players[i].pid + "', '" + String(SERVER.room.players[i].team - 1) + "')");
        divBtn.appendChild(btnUp);

        // Create move down team button
        let btnDown = document.createElement("BUTTON");
        btnDown.className = "btn2";
        btnDown.innerText = "V";
        btnDown.setAttribute("onclick", "SERVER.setTeam('" + SERVER.room.players[i].pid + "', '" + String(SERVER.room.players[i].team + 1) + "')");
        divBtn.appendChild(btnDown);

        // Add button div to list item
        li.appendChild(divBtn);

        // Add list item to player list
        playerList.appendChild(li);
    }
}

// Todo: button to move player to another team (drag and drop), kick, and activate spymaster

function addTeam()
{
    // Create team box
    let team = document.createElement("DIV");
    team.className = "box";

    // Create team title
    let title = document.createElement("H3");
    title.innerHTML = "Team";
    team.appendChild(title);

    // Create team list
    let list = document.createElement("UL");
    team.appendChild(list);

    // Add team to player list
    document.querySelector("#lobby #players").appendChild(team);

    updatePlayerList();
    SERVER.setTeamCount(SERVER.room.options.teamCount++);
}

function removeTeam()
{
    document.querySelector("#lobby #players").removeChild(document.querySelector("#lobby #players").lastChild);

    SERVER.setTeamCount(SERVER.room.options.teamCount--);
}

function updateTeams()
{

}