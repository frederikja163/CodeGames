class Lobby
{
    constructor()
    {
        this.state = new Guest();

        var url = window.location.href;
        var idx = url.indexOf('#');
        var id = (idx != -1) ? url.substring(idx) : "";
        id = id.replace("#", "");

        socket.emit("JoinRoom", id)
        socket.on("RoomJoined", (r) => 
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
        this.state.onResize(size);
    }

    update()
    {
        this.state.update();
    }

    draw()
    {
        this.state.draw();
    }
}