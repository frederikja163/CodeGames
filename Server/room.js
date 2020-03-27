class Room
{
    constructor(id)
    {
        this.rid = id;
        this.players = [];
        this.options = new Options();
    }
}

class Player
{
    constructor(id, name)
    {
        this.pid = id;
        this.name = name;
    }
}

class Options
{
    constructor()
    {

    }
}

module.exports =
{
    Room,
    Player,
    Options
}