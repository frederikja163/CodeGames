class Room
{
    constructor(id)
    {
        this.rid = id;
        this.state = "lobby";
        this.players = [];
        this.options = new Options();
    }
}

class Player
{
    constructor(id, name, role)
    {
        this.pid = id;
        this.name = name;
        this.role = role;
    }
}

class Options
{
    constructor()
    {

    }
}

class Word
{
    constructor(text)
    {
        this.text = text;
        this.type = "neutral";
    }
}

module.exports =
{
    Room,
    Player,
    Options,
    Word
}