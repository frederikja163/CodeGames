function markWord(index)
{
    SERVER.markWord(index);
}

function selectWord(index)
{
    SERVER.selectWord(index);
}

function giveWord(word, wordCount)
{
    SERVER.giveWord(word, wordCount);
}

function endTurn()
{
    SERVER.endRound();
}

function backToLobbyBtn()
{
    resetRoom();
}
