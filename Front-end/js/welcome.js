function joinBtnOnClick()
{
    let name = document.getElementById("welcomeInputName").value;
    let rid = document.getElementById("welcomeInputRid").value;
    
    server.joinRoom(rid);
    if (name != "")
    {
        server.setName(name);
    }
}

function activateLocalServer()
{
    if (server.ip != "localhost")
    {
        server = new Server("localhost", 9999);
        console.log("Server ip changed to: " + server.ip);
    }
    else
    {
        console.log("Server ip already: " + server.ip);
    }
}

function activatePublicServer()
{
    if (server.ip != "116.203.80.39")
    {
        server = new Server("116.203.80.39", 9999);
        console.log("Server ip changed to: " + server.ip);
    }
    else
    {
        console.log("Server ip already: " + server.ip);
    }
}