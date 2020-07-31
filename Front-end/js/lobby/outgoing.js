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