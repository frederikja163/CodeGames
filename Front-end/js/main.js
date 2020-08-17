const URLPARAMS = new URLSearchParams(window.location.search);
const SERVER = new Server();
if (URLPARAMS.has("host"))
{
    switch(URLPARAMS.get("host"))
    {
        case "dev":
        case "development":
            //TODO: Create a development server, for now use release.
            SERVER.connect("116.203.80.39", 9999);
            break;
        case "release":
            SERVER.connect("116.203.80.39", 9999);
            break;
        case "local":
            SERVER.connect("localhost", 9999);
            break;
    }
}
else
{
    SERVER.connect("116.203.80.39", 9999);
}

const HIDDEN = "none";
const VISIBLE = "grid";

let welcome;
let lobby;
let teamNames = ["Red", "Blue", "Green", "Yellow", "Purple", "Cyan", "Orange", "Pink"];
let debugMode = false;

document.addEventListener('keyup', (event) =>
{
    if(event.keyCode == 113) //F2 is our debug key.
    {
        setDebugMode(!debugmode);
    }
    else if(event.keyCode == 13) //Enter
    {
        // Submit name if cursor is in namefield
        let nameField = document.querySelector("#nameField");
        if(nameField == document.activeElement)
        {
            nameSubmit();
            SERVER.setName(nameField.value);
        }

        // Join lobby if cursor is in any of 2 textfields
        let welcomeFields = document.querySelectorAll("#welcome input");
        for (let i = 0; i < welcomeFields.length; i++)
        {
            if (welcomeFields[i] == document.activeElement)
            {
                joinBtnOnClick();
            }
        }
    }
});

window.onload = () => {
    welcome = document.querySelector("#welcome");
    lobby = document.querySelector("#lobby");
    setDebugMode(false);

    let url = String(window.location); // Change URL without redirecting
    let ridStart = url.indexOf("#");
    if (ridStart != -1)
    {
        let rid = url.substring(ridStart + 1);
        SERVER.joinRoom(rid);

        //Start parameters
        if (URLPARAMS.has("teamCount"))
        {
            let teamCount = Number.parseInt(URLPARAMS.get("teamCount"));
            SERVER.setTeamCount(teamCount);
        }
        if (URLPARAMS.has("name"))
        {
            let name = URLPARAMS.get("name")
            SERVER.setName(name);
        }
    }
}

function setDebugMode(newMode)
{
    debugmode = newMode;
    document.querySelectorAll(".debug").forEach(e => e.style.display = debugmode ? VISIBLE : HIDDEN);
}

//TODO: Lost connection.
// Todo: button to move player to another team (drag and drop), kick, and activate spymaster
