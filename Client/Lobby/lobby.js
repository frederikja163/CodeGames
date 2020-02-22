class Lobby
{
    constructor()
    {
        var url = window.location.href;
        var idx = url.indexOf('#');
        var rid = (idx != -1) ? url.substring(idx) : "";
        rid = rid.replace("#", "");

        socket.emit("joinRoom", rid)
        socket.on("roomJoined", (r) => 
        {
            room = r;
            if (rid != room.rid)
            {
                window.location.href = window.location.href.replace("id", "") + "#" + room.rid;
            }
            if (socket.id == room.players[0].pid)
            {
                this.state = new Owner();
            }
            else
            {
                this.state = new Guest();
            }
        });
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
    }
}