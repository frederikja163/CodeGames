function checkWordCount(room)
{
    return room.options.wordCount <= room.options.words.length;
}

function checkPlayersInTeam(room)
{
    let teams = [];
    room.players.forEach(p => teams[p.team] = teams[p.team] ? teams[p.team] + 1 : 1);
    for (let i = 1; i <= room.options.teamCount; i++)
    {
       if (teams[i] === undefined || teams[i] < 2)
       {
           return false;
       }
    }
    return true;
}

module.exports = function runFullCheck(room)
{
    return checkWordCount(room) &&
            checkPlayersInTeam(room);
}