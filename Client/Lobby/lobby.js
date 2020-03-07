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
            console.log("hej");
            room = r;
            if (rid != room.rid)
            {
                window.location.href = window.location.href.replace(rid, "") + "#" + room.rid;
            }
            if (Socket.id() == room.players[0].pid)
            {
                this.state = new Owner();
            }
            else
            {
                this.state = new Guest();
            }
        };
        Socket.playerLeft = (r, pid) =>
        {
            if (Socket.id() == r.players[0].pid)
            {
                this.state = new Owner();
            }
        };
    }

    onResize(size)
    {
        if (this.state != null)
        {
            this.state.onResize(size);
        }
    }

    update()
    {
        if (this.state != null)
        {
            this.state.update();
        }
    }

    draw()
    {
        if (this.state != null)
        {
            this.state.draw();
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