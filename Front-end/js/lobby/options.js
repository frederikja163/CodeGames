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
        let words = SERVER.room.options.words;
        let language = languages[lang];
        let startInd = words.findIndex(w => w === "@" + language.code);
        let endInd = words.findIndex((w, i) => i > startInd && w.startsWith("@"));
        if (startInd === -1)
        {
            SERVER.addWords(["@" + language.code]);
        }
        else if (endInd != -1)
        {
            let w = words.slice(startInd, endInd);
            SERVER.removeWords(w);
            SERVER.addWords(w);
        }
        else
        {
            return;
        }
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
    if (SERVER.room.options.words.length === 0)
    {
        SERVER.addWords(["@EN"]);
    }

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

    updatePackList();
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

function packClicked(pack)
{
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
    let wordsTxtElem = document.querySelector("#wordsTxt");
    wordsFieldElem.value = SERVER.room.options.words;
    wordsTxtElem.innerText = SERVER.room.options.words;
}

function wordsChanged()
{
    let wordsField = document.querySelector("#wordsField");

    let words = [];
    wordsField.value.split(',').forEach(w => {if (w.trim() != "") words.push(w.trim); });

    SERVER.setWords(words);
}

function updatePackList()
{
    let packList = document.querySelector("#lobby #options #words > ul");
    packList.innerHTML = "";
    let words = SERVER.room.options.words;
    let lang = null;
    let packs = null;
    for (let i = 0; i < words.length; i++)
    {
        if (words[i].trim().startsWith("@"))
        {
            let newLang = languages.find(l => words[i].endsWith(l.code));
            if (newLang)
            {
                if (lang)
                {
                    addPacks(packList, packs, lang.code.toLowerCase(), "block");
                }
                lang = newLang;
                packs = [];
            }
        }
        else if (words[i].trim().startsWith("#") && lang)
        {
            packs.push(words[i]);
        }
    }
    
    let img = SERVER.pid === SERVER.room.players[0].pid ?
        document.querySelector("#lobby #dropBtn").firstElementChild :
        document.querySelector("#currentLang");

    if (lang)
    {
        let code = lang.code.toLowerCase();
        addPacks(packList, packs, code, "block");
        packs = lang.packs.filter(p => !packs.includes(p));
        addPacks(packList, packs, code, "none");
        img.src = "./assets/packs/" + code + "/flag.png";

        if (SERVER.pid === SERVER.room.players[0].pid)
        {
            let langElems = document.querySelectorAll("#dropMenu li");
            let langInd = languages.findIndex(l => l === lang);
    
            for (let i = 0; i < langElems.length; i++)
            {
                langElems[i].id = i === langInd ? "selectedLang" : "";
            }
        }
    }
    else
    {
        img.src = "./assets/packs/language.png";
    }
}

function addPacks(packList, packs, imgFolder, display)
{
    for (let j = 0; j < packs.length; j++)
    {
        let p = packs[j];
        let elem = document.createElement("li");
        let name = document.createElement("div");
        name.innerText = p.substring(1);
        elem.appendChild(name);
        let div = document.createElement("div");
        div.className = SERVER.pid == SERVER.room.players[0].pid ? "btn2 packLangDiv" : "packLangDiv";
        div.onclick = () =>
        {
            clickPack(p);
        };
        let img = document.createElement("img");
        img.src = "./assets/packs/" + imgFolder + "/flag.png";
        img.style.display = display;
        div.appendChild(img);
        elem.appendChild(div);
        packList.appendChild(elem);
    }
}