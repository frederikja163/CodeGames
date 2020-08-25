function setSpymaster(pid)
{
    SERVER.setSpymaster(SERVER.room.players.find(p => p.pid === pid).team, pid);

    console.log("setSpymaster");
}

function kick(pid)
{
    SERVER.kickPlayer(pid, "fuck off github nerds who read old code");

    console.log("kick");
}

function changeTeamUp(pid)
{
    SERVER.setTeam(pid, SERVER.room.players.find(p => p.pid === pid).team - 1);

    console.log("changeTeamUp");
}

function changeTeamDown(pid)
{
    SERVER.setTeam(pid, SERVER.room.players.find(p => p.pid === pid).team + 1);

    console.log("changeTeamDown");
}

function addTeam()
{
    if (SERVER.room.options.teamCount < teamNames.length)
    {
        SERVER.setTeamCount(SERVER.room.options.teamCount + 1);
    }
    else
    {
        console.log("Maximum team amount reached!");
    }

    console.log("addTeam");
}

function removeTeam()
{
    SERVER.setTeamCount(SERVER.room.options.teamCount - 1);

    console.log("removeTeam");
}

function leaveRoom() // Change URL without redirecting
{
    let url = String(window.location);
    let ridStart = url.indexOf("#");
    window.location = url.slice(0, ridStart);

    console.log("leaveRoom");
}