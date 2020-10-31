function setSpymaster(pid)
{
    SERVER.setSpymaster(SERVER.room.players.find(p => p.pid === pid).team, pid);
}

function kick(pid)
{
    SERVER.kickPlayer(pid, "fuck off github nerds who read old code");
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
    if (SERVER.room.options.teamCount < teamNames.length)
    {
        SERVER.setTeamCount(SERVER.room.options.teamCount + 1);
    }
    else
    {
        //TODO: Use different logging (maybe user logging?)
        console.log("Maximum team amount reached!");
    }
}

function removeTeam()
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