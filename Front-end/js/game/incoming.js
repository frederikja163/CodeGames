SERVER.onGameStarted = (room) =>
{
    SERVER.room = room;

    swapToGame();
    initializePlayerlist();
    initializeBoard();
    initializeWord();
}

SERVER.onWordMarked = (room, index) =>
{
    SERVER.room = room;

    tiles[index].mark();
}

SERVER.onWordSelected = (room, index) =>
{
    SERVER.room = room;

    tiles[index].update();
}