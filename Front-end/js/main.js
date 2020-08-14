const HIDDEN = "none";
const VISIBLE = "grid";

// let server = new Server("localhost", 9999);
let server = new Server("116.203.80.39", 9999);

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
            server.setName(nameField.value);
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

    let url = String(window.location);
    let ridStart = url.indexOf("#");
    if (ridStart != -1)
    {
        let rid = url.substring(ridStart + 1);
        server.joinRoom(rid);
    }
}

function setDebugMode(newMode)
{
    debugmode = newMode;
    document.querySelectorAll(".debug").forEach(e => e.style.display = debugmode ? VISIBLE : HIDDEN);
}

//TODO: Lost connection.
// Todo: button to move player to another team (drag and drop), kick, and activate spymaster
