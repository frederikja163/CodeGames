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
        //initializeTeamWordCount();
        initializePackList();
        updateWordsField();
        updateTeamCount();
        setupRoom();
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
