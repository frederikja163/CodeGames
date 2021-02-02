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
}

SERVER.onGameEnded = (room, words) =>
{
    SERVER.room = room;

    hideSkipBtn();

    if (room.players.find(p => p.pid === SERVER.pid).team === -1){
        SERVER.onRoomJoined(SERVER.room, SERVER.rid, SERVER.pid);
    }
}
