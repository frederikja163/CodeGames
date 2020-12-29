class RoomData
{
    constructor(rid)
    {
        this.rid = rid;
        this.players = [];
        this.options = new Options();
        this.words = undefined;
    }
}

class PlayerData
{
    constructor(pid)
    {
        this.pid = pid;
        this.spymaster = false;
        this.name = "Player";
        this.team = -1;
    }
}

class Options
{
    constructor()
    {
        this.words = [];
        this.teamCount = 2;
    }
}

class Word
{
    constructor(str, team)
    {
        this.word = str;
        this.team = team;
        this.marked = [];
    }
}


module.exports =
{
    RoomData,
    PlayerData,
    Options,
    Word
}