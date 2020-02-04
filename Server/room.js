class Room
{
    constructor(id, player)
    {
        this.id = id;
        this.players = [];
        this.players.push(player);
        this.options = new Options();
    }
}

class Player
{
    constructor(id, name)
    {
        this.id = id;
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