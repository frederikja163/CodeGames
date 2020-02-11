class Lobby
{
    constructor()
    {
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
                this.state = new Guest();
            }
            else
            {
                this.state = new Guest();
            }
        });
        socket.on("PlayerJoined", (player) => console.log("player joined! " + player.id + " " + player.name));
        socket.on("PlayerLeft", (id) => console.log("Player " + id + " left the room"));
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