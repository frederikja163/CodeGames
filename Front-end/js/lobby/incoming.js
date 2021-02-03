SERVER.onPlayerKicked = (room, pid, reason) =>
{
    let oldRoom = SERVER.room;
    SERVER.room = room;

    playerLeft(pid, oldRoom);
    playerKicked(pid, reason);
};

SERVER.onNameChanged = (room, pid) => 
{
    SERVER.room = room;

    nameChanged(pid);
    if (SERVER.pid == pid)
    {
        updateNameField();
    }
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

    updateTeamCount();

    for (let i = oldTeamCount; i < newTeamCount; i++)
    {
        addTeamElem();
    }
    for (let i = newTeamCount; i < oldTeamCount; i++)
    {
        removeTeamElem();
    };
    
    const maxTeams = teams.length - 2;
    const minTeams = 1;
    if (newTeamCount >= maxTeams)
    {
        hideAddTeamBtn();
    }
    else if (newTeamCount === maxTeams - 1 && oldTeamCount === maxTeams)
    {
        showAddTeamBtn();
    }
    else if (newTeamCount <= minTeams)
    {
        hideRemoveTeamBtn();
    }
    else if (newTeamCount === minTeams + 1 && oldTeamCount === minTeams)
    {
        showRemoveTeamBtn();
    }
};

SERVER.onSpymasterChanged = (room, pid) =>
{
    let player = SERVER.room.players.find(p => p.pid === pid);
    let oldPlayer = SERVER.room.players.find(p => p.spymaster === true && p.team === player.team);
    SERVER.room = room;

    spymasterChanged(pid, oldPlayer === undefined ? null : oldPlayer.pid);
};

SERVER.onWordsChanged = (room, words) =>
{
    SERVER.room = room;

    if (startGame)
    {
        SERVER.startGame();
        startGame = false;
        return;
    }

    updateWordsField();
    updatePackList();
};

SERVER.onWordCountChanged = (room) =>
{
    SERVER.room = room;

    updateWordCountOption();
    updateKillerWordCountOption();
    updateTeamsWordCount();
};

SERVER.onTeamWordCountChanged = (room, team) =>
{
    SERVER.room = room;

    updateKillerWordCountOption();
    updateTeamWordCount(team);
};