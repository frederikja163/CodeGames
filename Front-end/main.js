const SERVER = new Server("http://localhost", 9999);

const HIDDEN = "none";
const VISIBLE = "grid";

let welcome;
let lobby;

window.onload = () => {
    welcome = document.querySelector("#welcome");
    lobby = document.querySelector("#lobby"); 
}

SERVER.onRoomJoined = (room, rid) => {
    SERVER.room = room;
    SERVER.rid = rid;
    // TODO: update link, change iframe src to lobby html
};

SERVER.onPlayerJoined = (room, player) => {
    SERVER.room = room;
    console.log(player.pid, player.name, "joined");
}

SERVER.onPlayerLeft = (room, player) => {
    SERVER.room = room;
    console.log(player.pid, player.name, "left");
}

SERVER.onNameChanged = (room, player, name) => {
    SERVER.room = room;
    console.log(player.pid, name, "changed");
}

function joinBtnOnClick()
{
    let name = document.getElementById("welcomeInputName").value;
    let rid = document.getElementById("welcomeInputRid").value;
    
    SERVER.joinRoom(rid);
    SERVER.setName(name);

    welcome.style.display = HIDDEN;
    lobby.style.display = VISIBLE;
}