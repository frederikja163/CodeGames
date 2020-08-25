const { write } = require("fs");

class Argument
{
    constructor(name, description)
    {
        this.name = name;
        this.description = description;
    }
}

class Command
{
    constructor(name, description, args, method)
    {
        this.name = name;
        this.description = description;
        this.args = args;
        this.method = method;
    }
}

const COMMANDS = [];
let rooms;
let clients;

exports.initialize = (r, c) =>
{
    process.stdout.write("> ");
    process.openStdin().addListener('data', raw => {
        onReadLine(raw.toString().trim());
    });
    rooms = r;
    clients = c;

    addCommand("help", "displays this help message", [], help);
    addCommand("help", "more help for a particular command", [new Argument("command", "command to get help for")], helpCommand);
    addCommand("stop", "stops the server", [], stop);
    addCommand("rooms", "lists all rooms by rid", [], roomsCmd);
    addCommand("room", "gets all information for one room", [new Argument("rid", "rid of the room to get information of")], room);
    addCommand("clients", "lists all connected clients and their rid if any", [], clientsCmd);
}

function addCommand(name, desc, args, method)
{
    COMMANDS.push(new Command(name, desc, args, method));
}

function onReadLine(text)
{
    let args = text.split(" ");
    let comName = args.shift();
    let com = COMMANDS.find(c => c.name === comName && c.args.length === args.length);
    if (com === undefined)
    {
        writeLine("Found no matching command, use help to see all available commands");
        process.stdout.write("> ");
        return;
    }
    switch (com.args.length)
    {
        case 0:
            com.method();
            break;
        case 1:
            com.method(args[0]);
            break;
        default:
            writeLine("Not supporting " + com.args.length + " arg count");
            break;
    }
    process.stdout.write("> ");
}

function writeLine(text)
{
    process.stdout.write(text + '\n');
}

function help()
{
    for (let i = 0; i < COMMANDS.length; i++)
    {
        let com = COMMANDS[i];
        let args = "";
        for (let j = 0; j < com.args.length; j++)
        {
            args += "[" + com.args[j].name + "] ";
        }
        writeLine(com.name + " " + args + " - " + com.description);
    }
}

function helpCommand(command)
{
    let coms = COMMANDS.filter(c => c.name === command);

    for (let i = 0; i < coms.length; i++)
    {
        if (i != 0)
        {
            writeLine("---------------");
        }
        let com = coms[i];
        let args = "";
        for (let j = 0; j < com.args.length; j++)
        {
            args += "[" + com.args[j].name + "] ";
        }
        writeLine(com.name + " " + args);
        writeLine(com.description);
        for (let j = 0; j < com.args.length; j++)
        {
            let arg = com.args[j];
            writeLine(arg.name + " - " + arg.description);
        }
    }
}

function stop()
{
    writeLine("Kicking all players");
    for (let i = 0; i < rooms.length; i++)
    {
        for (let j = 0; j < rooms[i].clients.lenght; j++)
        {
            rooms[i].clients[j].kickPlayer(rooms[i].clients[j].pid, "Server is restarting due to maintenance, we will be back within a few minutes!");
        }
    }
    process.exit(1);
}

function roomsCmd()
{
    writeLine("A total of " + rooms.length + " rooms exist");
    for(let i = 0; i < rooms.length; i++)
    {
        writeLine((i + 1) + "/" + rooms.length + " - #" + rooms[i].rid);
    }
}

function room(rid)
{
    let r = rooms.find(r => r.rid === rid);
    if (r != undefined)
    {
        writeLine(JSON.stringify(r.data));
    }
    else
    {
        writeLine("Room could not be found, use rooms to get a full list of all rooms.");
    }
}