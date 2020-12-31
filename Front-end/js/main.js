var debugMode = false;

const URLPARAMS = new URLSearchParams(window.location.search);
const SERVER = new Server();
if (URLPARAMS.has("host"))
{
    switch(URLPARAMS.get("host"))
    {
        case "dev":
        case "development":
            SERVER.connect("116.203.80.39", 9997);
            break;
        case "rel":
        case "release":
            SERVER.connect("116.203.80.39", 9999);
            break;
        case "loc":
        case "local":
            SERVER.connect("localhost", 9998);
            break;
    }
}
else
{
    SERVER.connect("116.203.80.39", 9999);
}

//TODO: Remove these
const HIDDEN = "none";
const VISIBLE = "grid";

let welcome;
let lobby;
let game;
let teamNames = ["Red", "Blue", "Green", "Yellow", "Purple", "Cyan", "Orange", "Pink"];
let tiles = [];
let state = "welcome";
let startGame = false;

document.addEventListener('keyup', (event) =>
{
    if(event.code == 113) //F2 is our debug key.
    {
        setDebugMode(!debugMode);
    }
    else if(event.code == 13) //Enter
    {
        // Join lobby if cursor is in any of the textfields in welcome
        let welcomeFields = document.querySelectorAll("#welcome input");
        for (let i = 0; i < welcomeFields.length; i++)
        {
            if (welcomeFields[i] === document.activeElement)
            {
                joinBtnOnClick();
            }
        }
    }
});

if (document.addEventListener)
{
    document.addEventListener('contextmenu', function(e)
    {
        e.preventDefault();
    }, false);
}
else
{
    document.attachEvent('oncontextmenu', function()
    {
    alert("You've tried to open context menu");
    window.event.returnValue = false;
    });
}

window.onload = () => {
    welcome = document.querySelector("#welcome");
    lobby = document.querySelector("#lobby");
    game = document.querySelector("#game");
    setDebugMode(false);

    let url = String(window.location); // Change URL without redirecting
    let ridStart = url.indexOf("#");
    if (ridStart != -1)
    {
        let rid = url.substring(ridStart + 1);
        SERVER.joinRoom(rid);
    }
}

function setDebugMode(newMode)
{
    debugMode = newMode;
    document.querySelectorAll(".debug").forEach(e => e.style.display = debugMode ? "grid" : "none");
}
