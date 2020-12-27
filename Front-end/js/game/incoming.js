SERVER.onGameStarted = (room) =>
{
    SERVER.room = room;

    swapToGame();
    initializeBoard();
}
