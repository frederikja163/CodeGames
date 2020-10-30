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

function nameChange()
{
    let nameField = document.querySelector("#nameField");
    SERVER.setName(nameField.value);
}

function revealOwnerContent()
{
    if (SERVER.pid == SERVER.room.players[0].pid)
    {
        document.querySelectorAll(".owner").forEach(elem => elem.style.display = 'initial');
        document.querySelector("#words").style.display = "grid";
        document.querySelector("#dropBtn").style.display = "block";
        document.querySelector("#wordsTxt").style.display = HIDDEN;
        document.querySelector("#currentLang").style.display = HIDDEN;
        let packLangDivElems = document.querySelectorAll(".packLangDiv");

        for (let i = 0; i < packLangDivElems.length; i++)
        {
            //packLangDivElems[i].style.boxShadow = "var(--shadow)";
            packLangDivElems.className = "btn2";
        }
        
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