const HTTP = new XMLHttpRequest();
const BASEURL = "http://codegames.ga/";
const PACKURL = BASEURL + "Front-end/assets/packs/";

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
    HTTP.open("GET", PACKURL + "lang.csv");
    HTTP.send();
    console.log(HTTP.responseText);
    HTTP.open("GET", PACKURL + "pack.csv");
    HTTP.send();
    console.log(HTTP.responseText);
}