class Lobby
{
    constructor()
    {
        var url = window.location.href;
        var idx = url.indexOf('#');
        var id = (idx != -1) ? url.substring(idx) : "";
        id = id.replace("#", "");

        socket.emit("joinRoom", id)
        socket.on("roomJoined", (r) => 
        {
            room = r;
            if (id != room.id)
            {
                window.location.href = window.location.href.replace("id", "") + "#" + room.id;
            }
            if (socket.id == room.players[0].id)
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