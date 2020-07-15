const SERVER = new Server("http://localhost", 9999);

const HIDDEN = "none";
const VISIBLE = "grid";

let welcome;
let lobby;
let debugmode = false;

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
    let liList = [];

    for (let i = 0; i < SERVER.room.players.length; i++)
    {
        liList[i] = document.createElement("LI");
        liList[i].innerHTML = SERVER.room.players[i].name + "\t" + (debugmode ? SERVER.room.players[i].pid : "");
        playerList.appendChild(liList[i]);
    }
}

// Todo: button to move player to another team (drag and drop), kick, and activate spymaster

function addTeam()
{

}

function removeTeam()
{

}