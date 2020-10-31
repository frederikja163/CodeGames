SERVER.onRoomJoined = (room, rid, pid) => 
{
    SERVER.room = room;
    SERVER.rid = rid;
    SERVER.pid = pid;

    swapToLobby();
    updateLink();
    updateNameField();
    initializeTeams();
    initializePlayers();
    initializePackList();
    updateWordsField();
    updateTeamCount();
    setupRoom();
    revealOwnerContent();
};

SERVER.onPlayerJoined = (room, pid) => 
{
    SERVER.room = room;

    playerJoined(pid);
};

SERVER.onPlayerLeft = (room, pid) => 
{
    let oldRoom = SERVER.room;
    SERVER.room = room;

    playerLeft(pid, oldRoom);
    revealOwnerContent();
};

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

    updateWordsField();
    updatePackList();

    // if (room.options.words.length === words.length && 
    //     room.options.words.find((e, i) => e != words[i]) === undefined)
    // {
    //     updatePacks(languages[currentLang].packs);
    // }
    // else
    // {
    //     updatePacks(words);
    // }
};