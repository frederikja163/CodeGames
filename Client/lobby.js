const LState = 
{
    Owner : "owner",
    Guest : "guest"
}

var txtSize;

function drawLeftPanel(state)
{
    var size = createVector(width * .4 - txtSize * 4, height - txtSize * 4);
    var position = createVector(txtSize, txtSize);
    
    function ownerColor(i, a = 1)
    {
        return color(43/360, i === 0 ? 76/100 : 0, 1, a);
    }

    textAlign(LEFT);

    //background
    fill(0.15);
    strokeWeight(0);
    rect(position.x, position.y, size.x, size.y);

    //title
    fill(color(0, .6, 1));
    textSize(txtSize);
    text("Players in room", txtSize * 2, txtSize * 2);

    for (var i = 0; i < room.players.length; i++)
    {
        var nameY = (2 + i) * txtSize * 2;
        var saturation = i === 0 ? 76/100 : 0;
        var ownerTag = (i === 0 ? "👑 " : "");
        var nameWidth = textWidth(ownerTag + room.players[i].name);
        
        //Owner name hover
        if (state == LState.Owner && i != 0 && isMouseWithin(position.x + txtSize * 3, nameY - txtSize * 0.58, max(nameWidth, 25), txtSize))
        {
            //Text
            Input.mouse.setStyle('pointer');
            textSize(txtSize * 1.1);
            var xChange = - nameWidth * 0.05;
            fill(color(43/360, saturation, 1, 0.8));
            text(ownerTag + room.players[i].name, position.x + xChange + txtSize * 3, nameY);

            //Strikethrough
            var lineWidth = txtSize / 10;
            strokeWeight(lineWidth);
            stroke(1, .8, 1, 0.8);
            line(position.x + txtSize * 3 + xChange, nameY - lineWidth, position.x + txtSize * 3 + max(nameWidth, 25) - xChange, nameY - lineWidth);
            strokeWeight(0);

            if (Input.mouse.button[LEFT])
            {
                Socket.kickPlayer(room.players[i].pid);
            }
        }
        //Normal name
        else
        {
            //Normal text
            textSize(txtSize);
            fill(color(43/360, saturation, 1));
            text(ownerTag + room.players[i].name, position.x  + txtSize * 3, nameY);
        }
    }
}

function drawBottomPanel(state)
{
    //Guests dont see the bottom panel.
    if (state == LState.Guest)
    {
        return;
    }

    var size = createVector(width / 5, height / 10);
    var hoverScale = 1.1;
    var position = createVector(width / 2 - size.x / 2, height * 0.9 - size.y / 2);
    textSize(txtSize);

    if (isMouseWithin(position.x, position.y, size.x, size.y))
    {
        Input.mouse.setStyle('pointer');
        textSize(txtSize * hoverScale);
        var size1 = size;
        size = p5.Vector.mult(size, hoverScale);
        var deltaSize = p5.Vector.sub(size, size1);
        position = createVector(position.x - deltaSize.x / 2, position.y - deltaSize.y / 2);
    
        if (Input.mouse.button[LEFT])
        {
            Socket.startGame();
        }
    }

    //Button background
    fill(1);
    rect(position.x, position.y, size.x, size.y, 4);

    //Button text
    fill(0);
    textAlign(CENTER, CENTER);
    text("Start", width / 2, height * .9);
}

function drawRightPanel(state)
{
    var size = createVector(width * .4 - txtSize * 4, height - txtSize * 4);
    var position = createVector(width - size.x - txtSize, txtSize);

    //Background
    fill(0.15);
    strokeWeight(0);
    rect(position.x, position.y, size.x, size.y);
    
    //Title
    textSize(txtSize);
    fill(1);
    textAlign(CENTER, CENTER);
    text("Room Options", position.x + size.x / 2, position.y + txtSize);
}

function drawCenterPanel(state)
{
    var size = width / 3;

    //Game title.
    textAlign(CENTER, CENTER);
    textSize(txtSize);
    text("Code Games", width / 2 - size / 2, height / 2, size);
}

class Lobby
{
    constructor()
    {
        var url = window.location.href;
        var idx = url.indexOf('#');
        var rid = (idx != -1) ? url.substring(idx) : "";
        rid = rid.replace("#", "");

        Socket.joinRoom(rid);
        Socket.roomJoined = (r) =>
        {
            room = r;
            if (rid != room.rid)
            {
                window.location.href = window.location.href.replace(rid, "") + "#" + room.rid;
            }
            if (Socket.id() == room.players[0].pid)
            {
                this.state = LState.Owner;
            }
            else
            {
                this.state = LState.Guest;
            }

            function getPlayerIndex()
            {
                for (var i = 0; i < room.players.length; i++)
                {
                    if (Socket.id() == room.players[i].pid)
                    {
                        return i;
                    }
                }
            }
            this.playerIndex = getPlayerIndex();

            Input.onKeyTyped = (keyCode) => 
            {
                var name = room.players[this.playerIndex].name;
                if (keyCode == 8)
                {
                    name = name.slice(0, -1);
                }
                else if (name.length < 15 &&
                        ((65 <= keyCode && keyCode <= 90) ||
                        (48 <= keyCode && keyCode <= 57) ||
                        keyCode == 32))
                {
                    name += char(keyCode);
                }
                room.players[this.playerIndex].name = name;
                Socket.updateName(name);
            };
        };
        var updateRoom = (r) => room = r;
        Socket.playerJoined = updateRoom;
        Socket.updatedName = updateRoom;
        Socket.playerLeft = (r, pid) =>
        {
            room = r;
            if (Socket.id() == room.players[0].pid)
            {
                this.state = LState.Owner;
            }
        };
        Socket.disconnect = () =>
        {
            window.location.replace(url.replace("#" + rid, ""));
        }
    }

    onResize(size)
    {
        txtSize = size.y / 40;
    }

    draw()
    {
        if (this.state != null)
        {
            drawLeftPanel(this.state);
            drawBottomPanel(this.state);
            drawRightPanel(this.state);
            drawCenterPanel(this.state);
        }
        else if (millis() >= 1000)
        {
            textSize(100);
            fill(1);
            textAlign(CENTER, CENTER);
            text("No connection!", width / 2, height / 2);
        }
    }
}
