function setSpymaster(pid)
{
    server.setSpymaster(server.room.players.find(p => p.pid === pid).team, pid);
}

function kick(pid)
{
    server.kickPlayer(pid, "fuck off github nerds who read old code");
}

function changeTeamUp(pid)
{
    server.setTeam(pid, server.room.players.find(p => p.pid === pid).team - 1);
}

function changeTeamDown(pid)
{
    server.setTeam(pid, server.room.players.find(p => p.pid === pid).team + 1);
}

function addTeam()
{
    if (server.room.options.teamCount < teamNames.length)
    {
        server.setTeamCount(server.room.options.teamCount + 1);
        console.log(server.room.options.teamCount);
    }
    else
    {
        console.log("Maximum team amount reached!");
    }
}

function removeTeam()
{
    server.setTeamCount(server.room.options.teamCount - 1);
}