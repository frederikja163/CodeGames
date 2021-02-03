SERVER.onGameStarted = (room) =>
{
    SERVER.room = room;

    if (state != "lobby")
    {
        resetRoom();
    }

    swapToGame();
    initializePlayerlist();
    initializeBoard();
    initializeWord();
    checkTurn();
    hideSkipBtn();

    if (SERVER.room.players.find(p => p.pid === SERVER.pid).team != SERVER.room.game.activeTeam)
    {
        disableWordForm();
    }
}

SERVER.onWordMarked = (room, index) =>
{
    SERVER.room = room;

    tiles[index].mark();
}

SERVER.onWordSelected = (room, index) =>
{
    SERVER.room = room;

    tiles[index].select();
    checkTurn();
}

SERVER.onWordGiven = (room) =>
{
    SERVER.room = room;

    wordGiven();
    checkTurn();
    disableWordForm();

    let player = SERVER.room.players.find(p => p.pid === SERVER.pid);
    if (!player.spymaster && player.team === SERVER.room.game.activeTeam)
    {
        showSkipBtn();
    }
}

SERVER.onRoundEnded = (room) =>
{
    SERVER.room = room;

    wordGiven();
    checkTurn();
    hideSkipBtn();
    if (SERVER.room.players.find(p => p.pid === SERVER.pid).team === SERVER.room.game.activeTeam)
    {
        enableWordForm();
    }
}

SERVER.onGameEnded = (room, words) =>
{
    let oldRoom = SERVER.room;
    SERVER.room = room;
    
    hideSkipBtn();
    showBackToLobbyBtn();
    //gameEnded(oldRoom);

    if (room.players.find(p => p.pid === SERVER.pid).team === -1){
        SERVER.onRoomJoined(SERVER.room, SERVER.rid, SERVER.pid);
    }
}
