SERVER.onGameStarted = (room) =>
{
    SERVER.room = room;

    swapToGame();
    initializeBoard();
}

SERVER.onWordMarked = (room, index) =>
{
    SERVER.room = room;

    console.log(index);
    tiles[index].mark();
}

SERVER.onWordSelected = (room, index) =>
{
    console.log(index);
    SERVER.room = room;

    tiles[index].update();
}