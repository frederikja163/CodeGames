function swapToLobby()
{
    welcome.style.display = HIDDEN;
    lobby.style.display = VISIBLE;
}

function updateLink()
{
    let url = String(window.location);
    let ridStart = url.indexOf("#");
    if (ridStart == -1)
    {
        window.location += "#" + SERVER.rid;
    }
    else if (ridStart == window.location.href.length - 1)
    {
        window.location += SERVER.rid;
    }
}

function updateNameField()
{
    var nameField = document.querySelector("#lobby #nameField");
    var name = SERVER.room.players.find(p => p.pid == SERVER.pid).name;
    nameField.setAttribute("value", name);
    nameField.selectionStart = name.length;
}

function nameEdit()
{
    let nameField = document.querySelector("#nameField");
    let nameEdit = document.querySelector("#nameEdit");
    let nameSubmit = document.querySelector("#nameSubmit");

    nameField.readOnly = false;
    nameField.focus();

    nameEdit.style.display = HIDDEN;
    nameSubmit.style.display = "initial";
}

function nameSubmit()
{
    let nameField = document.querySelector("#nameField");
    let nameEdit = document.querySelector("#nameEdit");
    let nameSubmit = document.querySelector("#nameSubmit");

    SERVER.room.players.find(p => p.pid === SERVER.pid).name = nameField.value;

    nameSubmit.style.display = HIDDEN;
    nameEdit.style.display = "initial";
    document.activeElement.blur();
}

function revealOwnerContent()
{
    if (SERVER.pid == SERVER.room.players[0].pid)
    {
        document.querySelectorAll(".owner").forEach(elem => elem.style.display = 'initial');
        
        for (let i = 0; i < SERVER.room.players.length; i++)
        {
            let player = SERVER.room.players[i];
            getPlayerElement(player.pid).querySelector(".smBtn").style.display =
                player.spymaster || player.team === 0 ? HIDDEN : 'initial';
        }
    }
}

function playerKicked(pid, reason)
{
    //TODO: Redirect to another html page
    if (SERVER.pid === pid)
    {
        //Reason pop-up.
        alert("Kicked for reason: " + reason);
        
        //Redirect to welcome.
        let url = String(window.location);
        let ridStart = url.indexOf("#");
        window.location = url.slice(0, ridStart);
    }
}