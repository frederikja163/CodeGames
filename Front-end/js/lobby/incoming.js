SERVER.onRoomJoined = (room, rid, pid) => 
{
    SERVER.room = room;
    SERVER.rid = rid;
    SERVER.pid = pid;

    activateLobby();
};

SERVER.onPlayerJoined = (room, pid) => 
{
    SERVER.room = room;

    playerJoined(pid);
};

SERVER.onPlayerLeft = (room, pid) => 
{
    SERVER.room = room;

    playerLeft(pid);
};

SERVER.onPlayerKicked = (room, pid, reason) =>
{
    SERVER.room = room;

    playerLeft(pid);
    playerKicked(pid, reason);
};

SERVER.onNameChanged = (room, pid) => 
{
    SERVER.room = room;

    nameChanged(pid);
};

SERVER.onTeamChanged = (room, pid) =>
{
    SERVER.room = room;
    
    teamChanged(pid);
};

SERVER.onTeamCountChanged = (room) => 
{
    let oldTeamCount = SERVER.room.options.teamCount;
    let newTeamCount = room.options.teamCount;

    SERVER.room = room;

    teamCountChanged();

    for (let i = oldTeamCount; i < newTeamCount; i++)
    {
        addTeam();
    }
    for (let i = newTeamCount; i < oldTeamCount; i++)
    {
        removeTeam();
    };
};

SERVER.onSpymasterChanged = (room, pid) =>
{
    let oldPid = SERVER.room.players.find(p => p.spymaster === true).pid;
    SERVER.room = room;

    spymasterChanged(pid, oldPid);
};