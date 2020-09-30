const HTTP = new XMLHttpRequest();
const BASEURL = "http://codegames.ga/";
const PACKURL = BASEURL + "Front-end/assets/packs/";
let languages = [];
let currentLang = -1;

function updateTeamCount()
{
    let teamsOptElement = document.querySelector("#lobby #options > ul > li:nth-child(1)");
    teamsOptElement.innerText = "Team count: " + String(SERVER.room.options.teamCount);
}

function teamCountChanged()
{
    // Change team count in options
    let teamsOptElement = document.querySelector("#lobby #options ul li:nth-child(1)");
    teamsOptElement.innerText = "Team count: " + String(SERVER.room.options.teamCount);
}

function langBtn() //TODO: Hide/show menu, expand vertically when pressed to show available packs
{
    let dropMenu = document.querySelector("#lobby #dropMenu");
    dropMenu.style.display = dropMenu.style.display == "block" ? "none" : "block";
}

async function initializePackList()
{
    let r = await fetch(PACKURL + "lang.csv");
    let t = await r.text();
    let langs = t.split(',');
    for (let i = 0; i < langs.length; i++)
    {
        let l = await createLang(langs[i].trim());
        languages.push(l);
    }
    selectLanguage(0);
}

function selectLanguage(index)
{
    currentLang = index;
    let lang = languages[currentLang];
    let packList = document.querySelector("#lobby > #options > ul > #wordsOption > #words > ul");
    let packs = packList.querySelectorAll("li");
    for (let i = packs.length - 1; i >= 0; i--)
    {
        let img = packs[i].querySelector("img");
        if (img.style.display == "none")
        {
            packs[i].remove();
        }
    }

    for (let i = 0; i < languages[currentLang].packs.length; i++)
    {
        let p = lang.packs[i];
        let elem = document.createElement("li");
        let name = document.createElement("div");
        name.innerText = p.substring(1);
        elem.appendChild(name);
        let div = document.createElement("div");
        div.classList = "btn2";
        div.attributes["onclick"] = "clickPack(" + i + ")";
        let img = document.createElement("img");
        img.src = "./assets/packs/" + lang.code.toLowerCase() + "/flag.png";
        img.style.display = "none";
        div.appendChild(img);
        elem.appendChild(div);
        packList.appendChild(elem);
    }
}

async function createLang(lang)
{
    let l = {};
    let i = lang.indexOf('[');
    let code = lang.substring(i + 1, lang.length - 1);
    l.code = code;
    let name = lang.substring(0, i-1);
    l.name = name;
    l.packs = [];
    let r = await fetch(PACKURL + code.toLowerCase() + "/packs.csv");
    let t = await r.text();
    t.split(',').forEach(p => l.packs.push(p));
    return l;
}

SERVER.onWordsChanged = console.log;

function packClicked(index)
{
    let pack = languages[currentLang][index];
    if (SERVER.room.options.words.includes(pack))
    {
        SERVER.removeWords([pack]);
    }
    else
    {
        SERVER.addWords([packs]);
    }
}