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
    hideBackToLobbyBtn();
    hideSkipBtn();

    if (SERVER.room.players.find(p => p.pid === SERVER.pid).team != SERVER.room.game.activeTeam)
    {
        disableWordForm();
    }
    else
    {
        enableWordForm();
    }
}

SERVER.onWordMarked = (room, index) =>
{
    SERVER.room = room;

    tiles[index].updateMark();
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

SERVER.onTurnEnded = (room) =>
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

SERVER.onTeamOut = (room, team) =>
{
    SERVER.room = room;

    removeTeam(team);
}

SERVER.onGameEnded = (room, words, winner) =>
{
    let oldRoom = SERVER.room;
    SERVER.room = room;
    
    hideSkipBtn();
    showBackToLobbyBtn();
    revealBoard(words);
    gameEnded(winner);
    
    if (oldRoom.players.find(p => p.pid === SERVER.pid).team === -1){
        console.log(1);
        SERVER.onRoomJoined(SERVER.room, SERVER.rid, SERVER.pid);
        return;
    }
}
