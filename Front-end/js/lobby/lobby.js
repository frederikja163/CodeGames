function swapToLobby()
{
    welcome.style.display = "none";
    lobby.style.display = "grid";
    game.style.display = "none";
    state = "lobby";
}

function createRoomFromUrl()
{
    //Start parameters
    if (URLPARAMS.has("name"))
    {
        let name = URLPARAMS.get("name")
        SERVER.setName(name);
    }
    
    if (SERVER.room.players[0].pid != SERVER.pid)
    {
        return;
    }

    if (URLPARAMS.has("teamCount"))
    {
        let teamCount = Number.parseInt(URLPARAMS.get("teamCount"));
        SERVER.setTeamCount(teamCount);
    }
    if (URLPARAMS.has("words"))
    {
        let words = URLPARAMS.get("words")
        SERVER.setWords(words);
    }
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
    if (SERVER.pid == SERVER.room.players[0].pid && state === "lobby")
    {
        document.querySelectorAll(".owner").forEach(elem => elem.style.display = 'initial');
        document.querySelectorAll(".guest").forEach(elem => elem.style.display = HIDDEN);
        document.querySelector("#words").style.display = "grid";
        document.querySelector("#dropBtn").style.display = "grid";
        document.querySelectorAll(".packLangDiv").forEach(elem => elem.className += " btn2");

        updatePackList();
        
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

async function getWords()
{
    let result = [];
    let words = SERVER.room.options.words;
    let langCode;
    let langNum;

    for (let i = 0; i < words.length; i++)
    {
        let word = words[i].trim();

        if (word.startsWith("@"))
        {
            langCode = word.replace("@", "");
            langNum = languages.find(i => i.code === langCode);
        }
        else if (word.startsWith("#"))
        {
            let pack = await loadCsv(PACKURL + langCode.toLowerCase() + "/" + word.replace("#", "").toLowerCase() + ".csv");
            pack.forEach(w => result.push(w));
        }
        else
        {
            result.push(word);
        }
    }

    return result;
}

async function startBtnPressed()
{
    if (checkPlayersInTeam(SERVER.room))
    {
        let words = await getWords();

        if (words.length >= SERVER.room.options.wordCount)
        {
            startGame = true;
            SERVER.setWords(words);
        }
        else
        {
            window.alert("Not enough words! Please add more words to your game.");
        }
    }
    else
    {
        window.alert("Not enough players on teams! At least two players on every team.");
    }
}

async function loadCsv(url)
{
    let l = [];
    let r = await fetch(url);
    let t = await r.text();
    t.split(',\n').forEach(p => l.push(p));
    return l;
}

// function checkStartGame()
// {
//     let wordsField = document.querySelector("#wordsField").value;

//     if (SERVER.room.options.words[0] === wordsField.substring(0, wordsField.indexOf(",")))
//     {
//         console.log("start");
//     }
// }