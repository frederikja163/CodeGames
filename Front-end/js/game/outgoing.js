function markWord(index)
{
    SERVER.markWord(index);
}

function selectWord(index)
{
    let player = SERVER.room.players.find(p => p.pid === SERVER.pid);
    if (player.team === SERVER.room.game.activeTeam && SERVER.room.game.word != null &&
        confirm("Do you really wish to select " + SERVER.room.game.words[index].word))
    {
        SERVER.selectWord(index);
    }
}

function giveWord(word, wordCount)
{
    SERVER.giveWord(word, wordCount);
}

function endTurn()
{
    SERVER.endTurn();
}

function backToLobbyBtn()
{
    resetRoom();
}
