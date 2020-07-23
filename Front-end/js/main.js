const SERVER = new Server("http://localhost", 9999);

const HIDDEN = "none";
const VISIBLE = "grid";

let welcome;
let lobby;
let teamNames = ["Red", "Blue", "Green", "Yellow", "Pink"];
let debugMode = false;

document.addEventListener('keyup', (event) =>
{
    if(event.keyCode == 113) //F2 is our debug key.
    {
        setDebugMode(!debugmode);
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
        SERVER.joinRoom(rid);
    }
}

function setDebugMode(newMode)
{
    debugmode = newMode;
    document.querySelectorAll(".debug").forEach(e => e.style.display = debugmode ? VISIBLE : HIDDEN);
}

//TODO: Lost connection.
// Todo: button to move player to another team (drag and drop), kick, and activate spymaster
