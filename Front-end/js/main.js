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
        normal: "#0000000",
        light: "#0000000",
        dark: "#0000000"
    },
    {
        name: "White",
        normal: "#FFFFFFFF",
        light: "#FFFFFFFF",
        dark: "#FFFFFFFF"
    },
    {
        name: "Red",
        normal: "#CC2828FF",
        light: "#F23030FF",
        dark: "#8C1C1CFF"
    },
    {
        name: "Blue",
        normal: "#285FCCFF",
        light: "#3071F2FF",
        dark: "#1C418CFF"
    },
    {
        name:"Green",
        normal: "#5FCC28FF",
        light: "#71F230FF",
        dark: "#418C1CFF"
    },
    {
        name:"Yellow",
        normal: "#CCCC28FF",
        light: "#F2F230FF",
        dark: "8C8C1C"
    },
    {
        name:"Purple",
        normal: "#7A28CCFF",
        light: "#9130F2FF",
        dark: "#541C8CFF"
    },
    {
        name:"Cyan",
        normal: "#28CCB0FF",
        light: "#30F2D1FF",
        dark: "#1C8C79FF"
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
