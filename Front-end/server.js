class Server
{
    constructor(ip, port)
    {
        const socket = io(ip + ":" + port);
        
        let send = (message, arg1, arg2, arg3) =>
        {
            socket.emit(message, arg1, arg2, arg3);
        };
        socket.on("roomJoined", (room, rid) => this.onRoomJoined(room, rid));
        socket.on("roomLeft", () => this.onRoomLeft());
        socket.on("playerJoined", (room, pid) => this.onPlayerJoined(room, pid));
        socket.on("playerLeft", (room, pid) => this.onPlayerLeft(room, pid));

        socket.on("nameChanged", (room, pid, name) => this.onNameChanged(room, pid, name));
        socket.on("playerKicked", (room, pid, reason) => this.onPlayerKicked(room, pid, reason));

        //======[Server protocol]======
        this.room = null;
        this.rid = null;

        //===[Global]===
        //From-Server
        this.onRoomJoined =     (room, rid) => {};
        this.onRoomLeft =       () => {};
        this.onPlayerJoined =   (room, pid) => {};
        this.onPlayerLeft =     (room, pid) => {};
        //To-Server
        this.joinRoom =         (rid) => send("joinRoom", rid);
        this.leaveRoom =        () => send("leaveRoom");
        
        //===[Lobby]===
        //From-Server
        this.onNameChanged =    (room, pid, name) => {};
        this.onPlayerKicked =   (room, pid, reason) => {}; //Requires owner perms.
        //To-Server
        this.setName =          (name) => send("setName", name);
        this.kickPlayer =       (pid, reason) => send("kickPlayer", pid, reason);

        //===[Game]==
        //From-Server
        //To-Server
    }
}