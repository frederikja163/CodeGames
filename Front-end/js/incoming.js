SERVER.onRoomJoined = (room, rid, pid) => 
{
    SERVER.room = room;
    SERVER.rid = rid;
    SERVER.pid = pid;

    if (SERVER.room.players.find(p => p.pid === SERVER.pid).team === -1)
    {
        swapToWait();
    }
    else
    {
        swapToLobby();
        updateLink();
        updateNameField();
        initializeTeams();
        initializePlayers();
        initializePackList();
        updateWordsField();
        updateTeamCount();
        updateWordCountOption();
        updateTeamsWordCount();
        updateKillerWordCountOption();
        createRoomFromUrl();
        revealOwnerContent();
    }
};

SERVER.onPlayerJoined = (room, pid) => 
{
    SERVER.room = room;

    if (SERVER.room.players.find(p => p.pid === pid).team != -1)
    {
        playerJoined(pid);
    }
};

SERVER.onPlayerLeft = (room, pid) => 
{
    let oldRoom = SERVER.room;
    SERVER.room = room;

    if (oldRoom.players.find(p => p.pid === pid).team != -1)
    {
        playerLeft(pid, oldRoom);
        revealOwnerContent();
    }
};
