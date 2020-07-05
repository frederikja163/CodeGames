const server = new Server("http://localhost", 9999);

server.onRoomJoined = (room, rid) => {
    server.room = room;
    server.rid = rid;
    // TODO: update link, change iframe src to lobby html
};

server.onPlayerJoined = (room, player) => {
    server.room = room;
    console.log(player.pid, player.name, "joined");
}

server.onPlayerLeft = (room, player) => {
    server.room = room;
    console.log(player.pid, player.name, "left");
}

server.onNameChanged = (room, player, name) => {
    server.room = room;
    console.log(player.pid, name, "changed");
}

function joinBtnOnClick()
{
    let name = document.getElementById("welcomeInputName").value;
    let rid = document.getElementById("welcomeInputRid").value;
    
    server.roomJoin(rid);
    server.nameChange(name);
}