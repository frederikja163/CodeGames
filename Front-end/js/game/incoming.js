SERVER.onGameStarted = (room) =>
{
    SERVER.room = room;

    swapToGame();
    initializePlayerlist();
    initializeBoard();
    initializeWord();
    checkTurn();
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
}

SERVER.onRoundEnded = (room) =>
{
    SERVER.room = room;

    checkTurn();
}

SERVER.onGameEnded = (room, words) =>
{
    SERVER.room = room;

    checkTurn();
}
