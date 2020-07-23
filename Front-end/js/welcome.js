function joinBtnOnClick()
{
    let name = document.getElementById("welcomeInputName").value;
    let rid = document.getElementById("welcomeInputRid").value;
    
    SERVER.joinRoom(rid);
    SERVER.setName(name);
}