server.onRoomJoined = (room, rid, pid) => 
{
    server.room = room;
    server.rid = rid;
    server.pid = pid;

    activateLobby();
};

server.onPlayerJoined = (room, pid) => 
{
    server.room = room;

    playerJoined(pid);
};

server.onPlayerLeft = (room, pid) => 
{
    let oldRoom = server.room;
    server.room = room;

    playerLeft(pid, oldRoom);
    revealOwnerContent();
};

server.onPlayerKicked = (room, pid, reason) =>
{
    let oldRoom = server.room;
    server.room = room;

    playerLeft(pid, oldRoom);
    playerKicked(pid, reason);
};

server.onNameChanged = (room, pid) => 
{
    server.room = room;

    nameChanged(pid);
};

server.onTeamChanged = (room, pid) =>
{
    server.room = room;
    
    teamChanged(pid);
};

server.onTeamCountChanged = (room) => 
{
    let oldTeamCount = server.room.options.teamCount;
    let newTeamCount = room.options.teamCount;

    server.room = room;

    teamCountChanged();

    for (let i = oldTeamCount; i < newTeamCount; i++)
    {
        addTeamElem();
    }
    for (let i = newTeamCount; i < oldTeamCount; i++)
    {
        removeTeamElem();
    };
};

server.onSpymasterChanged = (room, pid) =>
{
    let player = server.room.players.find(p => p.pid === pid);
    let oldPlayer = server.room.players.find(p => p.spymaster === true && p.team === player.team);
    server.room = room;

    spymasterChanged(pid, oldPlayer === undefined ? null : oldPlayer.pid);
};