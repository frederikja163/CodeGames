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

function langBtn(display) //TODO: Hide/show menu, expand vertically when pressed to show available packs
{
    let dropMenu = document.querySelector("#lobby #dropMenu");
    dropMenu.style.display = display ? display : dropMenu.style.display == "block" ? "none" : "block";
}

function createLangElem(lang)
{
    let langElem = document.createElement("li");
    langElem.onclick = () => 
    {
        selectLanguage(lang);
        let dropBtn = document.querySelector("#lobby #dropBtn");
        let img = dropBtn.firstElementChild;
        img.src = "./assets/packs/" + languages[lang].code.toLowerCase() + "/flag.png";
        langBtn("none");
    }

    let nameElem = document.createElement("div");
    nameElem.innerHTML = languages[lang].name + 
    " (" + String(languages[lang].packs.length) + 
    (languages[lang].packs.length == 1 ? " pack" : " packs") +
    " available)";

    let flagElem = document.createElement("img");
    flagElem.alt = languages[lang].code;
    flagElem.src = "./assets/packs/" + languages[lang].code.toLowerCase() + "/flag.png";

    langElem.appendChild(nameElem);
    langElem.appendChild(flagElem);

    return langElem;
}

async function initializePackList()
{
    let r = await fetch(PACKURL + "lang.csv");
    let t = await r.text();
    let langs = t.split(',');
    let langListElem = document.querySelector("#lobby #dropMenu > ol");
    for (let i = 0; i < langs.length; i++)
    {
        let l = await createLang(langs[i].trim());
        languages.push(l);
        langListElem.appendChild(createLangElem(i));
    }
    selectLanguage(0);

    //To minimize the dropdown when you click anywhere on the page we have to set up two events
    //The first event will be for a click anywhere on body.
    //The second event will be for a click on the dropdown.
    //If we click on the dropdown we cancel the body event before it happens.
    //Hereby we have code that executes on a click outside the dropdown.
    let dropMenu = document.querySelector("#lobby #dropMenu");
    let dropBtn = document.querySelector("#lobby #dropBtn");
    let body = document.body;

    body.addEventListener("click", ev => langBtn("none"));
    dropBtn.addEventListener("click", ev => ev.stopPropagation());
    dropMenu.addEventListener("click", ev => ev.stopPropagation());
}

function selectLanguage(index) //TODO: Do this in a non index based manner, to allow multiple languages active at once.
{
    currentLang = index;
    let lang = languages[currentLang];
    let packList = document.querySelector("#lobby > #options > ul > #wordsOption > #words > ul");
    let packs = packList.querySelectorAll("li");
    packRemoves = [];
    for (let i = packs.length - 1; i >= 0; i--)
    {
        let img = packs[i].querySelector("img");
        if (img.style.display == "block")
        {
            packRemoves.push("#" + packs[i].firstChild.innerText);
        }
        packs[i].remove();
    }
    SERVER.removeWords(packRemoves);

    for (let i = 0; i < lang.packs.length; i++)
    {
        let p = lang.packs[i];
        let elem = document.createElement("li");
        let name = document.createElement("div");
        name.innerText = p.substring(1);
        elem.appendChild(name);
        let div = document.createElement("div");
        div.classList = "btn2";
        div.onclick = () =>
        {
            clickPack(i);
        };
        let img = document.createElement("img");
        img.src = "./assets/packs/" + lang.code.toLowerCase() + "/flag.png";
        img.style.display = SERVER.room.options.words.includes(p) ? "block" : "none";
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
    t.split(',\n').forEach(p => l.packs.push(p));
    return l;
}

let s = {};
function packClicked(index)
{
    let pack = languages[currentLang].packs[index];
    s = SERVER.room.options.words;
    if (SERVER.room.options.words.includes(pack))
    {
        SERVER.removeWords([pack]);
    }
    else
    {
        SERVER.addWords([pack]);
    }
}

function updateWordsField()
{
    let wordsFieldElem = document.querySelector("#wordsField");
    wordsFieldElem.value = SERVER.room.options.words;
}

function updatePacks(packs)
{
    for (let i = 0; i < packs.length; i++)
    {
        updatePack(packs[i]);
    }
}

function updatePack(pack)
{
    let packName = pack.substring(1);
    let packElems = document.querySelectorAll("#lobby #options #words li > div:first-child");
    for (let i = 0; i < packElems.length; i++)
    {
        if (packElems[i].innerHTML === packName)
        {
            let imgElem = packElems[i].parentElement.querySelector("div:nth-child(2) img");

            if (SERVER.room.options.words.includes(pack))
            {
                imgElem.style.display = "block";
            }
            else
            {
                imgElem.style.display = "none";
            }
        }
    }
}

function wordsChange()
{
    let wordsField = document.querySelector("#wordsField");

    let words = wordsField.value.split(',');
    SERVER.setWords(words);
}