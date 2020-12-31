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