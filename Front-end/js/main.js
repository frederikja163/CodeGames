// Icon pack: https://www.flaticon.com/packs/ui-interface-25 

var debugMode = false;

const URLPARAMS = new URLSearchParams(window.location.search);
const SERVER = new Server();
if (URLPARAMS.has("host"))
{
    switch(URLPARAMS.get("host"))
    {
        case "dev":
        case "development":
            SERVER.connect("5.186.82.234", 9997);
            break;
        case "rel":
        case "release":
            SERVER.connect("5.186.82.234", 9999);
            break;
        case "loc":
        case "local":
            SERVER.connect("localhost", 9998);
            break;
    }
}
else
{
    SERVER.connect("5.186.82.234", 9999);
}

//TODO: Remove these
const HIDDEN = "none";
const VISIBLE = "grid";

let welcome;
let lobby;
let game;
let wait;
let tiles = [];
let state = "welcome";
let startGame = false;
const teams = [
    {
        name: "Black",
        normal: "var(--backColor)",
        light: "#000000FF",
        dark: "#000000FF"
    },
    {
        name: "White",
        normal: "var(--topColor)",
        light: "#FFFFFFFF",
        dark: "#FFFFFFFF"
    },
    {
        name: "Red",
        normal: "hsl(0, 65%, 45%)",
        light: "hsl(0, 65%, 65%)",
        dark: "hsl(0, 65%, 30%)"
    },
    {
        name: "Blue",
        normal: "hsl(220, 65%, 45%)",
        light: "hsl(220, 65%, 65%)",
        dark: "hsl(220, 65%, 30%)"
    },
    {
        name:"Green",
        normal: "hsl(100, 65%, 45%)",
        light: "hsl(100, 65%, 65%)",
        dark: "hsl(100, 65%, 30%)"
    },
    {
        name:"Yellow",
        normal: "hsl(60, 65%, 45%)",
        light: "hsl(60, 65%, 65%)",
        dark: "hsl(60, 65%, 30%)"
    },
    {
        name:"Purple",
        normal: "hsl(270, 65%, 45%)",
        light: "hsl(270, 65%, 65%)",
        dark: "hsl(270, 65%, 30%)"
    },
    {
        name:"Cyan",
        normal: "hsl(170, 65%, 45%)",
        light: "hsl(170, 65%, 65%)",
        dark: "hsl(170, 65%, 30%)"
    }];

document.addEventListener('keyup', (event) =>
{
    if(event.key == "F2") // Debug key
    {
        setDebugMode(!debugMode);
    }
    else if(event.key == "Enter")
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
    wait = document.querySelector("#wait");
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
    if (debugMode)
    {
        console.log(SERVER.room);
    }
}
