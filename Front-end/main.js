const SERVER = new Server("http://localhost", 9999);

const HIDDEN = "none";
const VISIBLE = "grid";

let welcome;
let lobby;

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

SERVER.onRoomJoined = (room, rid) => {
    SERVER.room = room;
    SERVER.rid = rid;

    welcome.style.display = HIDDEN;
    lobby.style.display = VISIBLE;

    let url = String(window.location);
    let ridStart = url.indexOf("#");
    if (ridStart == -1)
    {
        window.location += "#" + SERVER.rid;
    }
    // TODO: update link, change iframe src to lobby html

    createPlayerList();
};

SERVER.onPlayerJoined = (room, pid) => {
    SERVER.room = room;

    createPlayerList();
}

SERVER.onPlayerLeft = (room, pid) => {
    SERVER.room = room;

    createPlayerList();
}

SERVER.onNameChanged = (room, pid) => {
    SERVER.room = room;

    createPlayerList();
}

function joinBtnOnClick()
{
    let name = document.getElementById("welcomeInputName").value;
    let rid = document.getElementById("welcomeInputRid").value;
    
    SERVER.joinRoom(rid);
    SERVER.setName(name);
}

function createPlayerList()
{
    let playerList = document.querySelector("#lobby #players ul");
    let liList = [];

    if (SERVER.room.players.length != playerList.children.length)
    {
        document.querySelector("#lobby #players ul").children = undefined;
    }
    
    for (let i = 0; i < SERVER.room.players.length; i++)
    {
        if (playerList.children[i] == undefined)
        {
            liList[i] = document.createElement("LI");
            liList[i].innerHTML = SERVER.room.players[i].name;
            playerList.appendChild(liList[i]);
        }
        else
        {
            playerList.children[i].tagName = "LI";
            playerList.children[i].innerHTML = SERVER.room.players[i].name;
        }
    }
}