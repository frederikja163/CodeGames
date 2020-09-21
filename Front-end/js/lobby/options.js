const HTTP = new XMLHttpRequest();
const BASEURL = "http://codegames.ga/";
const PACKURL = BASEURL + "Front-end/assets/packs/";
let languages = [];

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

function initializePackList()
{
    fetch(PACKURL + "lang.csv")
        .then(r => r.text())
        .then(t => t.split(',').forEach(lang => languages.push(createLang(lang.trim()))));
}

function createLang(lang)
{
    let l = {};
    let i = lang.indexOf('[');
    let code = lang.substring(i + 1, lang.length - 1);
    l.code = code;
    let name = lang.substring(0, i-1);
    l.name = name;
    l.packs = [];
    fetch(PACKURL + code.toLowerCase() + "/packs.csv")
        .then(r => r.text())
        .then(t => t.split(',').forEach(p => l.packs.push(p)));
    console.log(l);
}