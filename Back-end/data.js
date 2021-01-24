class RoomData
{
    constructor(rid)
    {
        this.rid = rid;
        this.players = [];
        this.options = new Options();
        this.game = null;
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
        this.teamWordCount = [1, 6, 5];
        this.wordCount = 25;
    }
}

class GameData
{
    constructor()
    {
        this.words = [];
        this.activeTeam = 1;
        this.word = null;
        this.wordCount = null;
    }
}

class Word
{
    constructor(str, team)
    {
        this.word = str;
        this.team = team;
        this.selectedBy = null;
        this.marked = [];
    }
}


module.exports =
{
    RoomData,
    PlayerData,
    Options,
    GameData,
    Word
}