SERVER.onRoomJoined = (room, rid, pid) => 
{
    SERVER.room = room;
    SERVER.rid = rid;
    SERVER.pid = pid;

    activateLobby();

    console.log("roomJoined");
};

SERVER.onPlayerJoined = (room, pid) => 
{
    SERVER.room = room;

    playerJoined(pid);

    console.log("playerJoined");
};

SERVER.onPlayerLeft = (room, pid) => 
{
    let oldRoom = SERVER.room;
    SERVER.room = room;

    playerLeft(pid, oldRoom);
    revealOwnerContent();

    console.log("playerLeft");
};

SERVER.onPlayerKicked = (room, pid, reason) =>
{
    let oldRoom = SERVER.room;
    SERVER.room = room;

    playerLeft(pid, oldRoom);
    playerKicked(pid, reason);

    console.log("playerKicked");
};

SERVER.onNameChanged = (room, pid) => 
{
    SERVER.room = room;

    nameChanged(pid);

    console.log("nameChanged");
};

SERVER.onTeamChanged = (room, pid) =>
{
    SERVER.room = room;
    
    teamChanged(pid);

    console.log("teamChanged");
};

SERVER.onTeamCountChanged = (room) => 
{
    let oldTeamCount = SERVER.room.options.teamCount;
    let newTeamCount = room.options.teamCount;

    SERVER.room = room;

    teamCountChanged();

    for (let i = oldTeamCount; i < newTeamCount; i++)
    {
        addTeamElem();
    }
    for (let i = newTeamCount; i < oldTeamCount; i++)
    {
        removeTeamElem();
    };

    console.log("teamCountChanged");
};

SERVER.onSpymasterChanged = (room, pid) =>
{
    let player = SERVER.room.players.find(p => p.pid === pid);
    let oldPlayer = SERVER.room.players.find(p => p.spymaster === true && p.team === player.team);
    SERVER.room = room;

    spymasterChanged(pid, oldPlayer === undefined ? null : oldPlayer.pid);

    console.log("spymasterChanged");
};