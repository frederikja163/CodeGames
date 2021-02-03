function setSpymaster(pid)
{
    SERVER.setSpymaster(SERVER.room.players.find(p => p.pid === pid).team, pid);
}

function kick(pid)
{
    SERVER.kickPlayer(pid, "You have been kicked!");
}

function changeTeamUp(pid)
{
    SERVER.setTeam(pid, SERVER.room.players.find(p => p.pid === pid).team - 1);
}

function changeTeamDown(pid)
{
    SERVER.setTeam(pid, SERVER.room.players.find(p => p.pid === pid).team + 1);
}

function addTeam()
{
    if (SERVER.room.options.teamCount < teams.length - 2)
    {
        SERVER.setTeamCount(SERVER.room.options.teamCount + 1);
    }
}

function removeTeamBtn()
{
    SERVER.setTeamCount(SERVER.room.options.teamCount - 1);
}

function leaveRoom() //TODO: Change URL without redirecting
{
    let url = String(window.location);
    let ridStart = url.indexOf("#");
    window.location = url.slice(0, ridStart);
}

function clickPack(pack)
{
    packClicked(pack);
}

function wordsChange()
{
    wordsChanged();
}
