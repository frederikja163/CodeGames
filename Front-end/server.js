class Server
{
    constructor(ip, port)
    {
        const socket = io(ip + ":" + port);
        
        let send = (message, arg1, arg2, arg3) =>
        {
            socket.emit(message, arg1, arg2, arg3);
        };
        socket.on("roomJoined", (room, rid, pid) => this.onRoomJoined(room, rid, pid));
        socket.on("roomLeft", () => this.onRoomLeft());
        socket.on("playerJoined", (room, pid) => this.onPlayerJoined(room, pid));
        socket.on("playerLeft", (room, pid) => this.onPlayerLeft(room, pid));

        socket.on("nameChanged", (room, pid, name) => this.onNameChanged(room, pid, name));
        socket.on("playerKicked", (room, pid, reason) => this.onPlayerKicked(room, pid, reason));
        socket.on("wordsChanged", (room) => this.onWordsChanged(room));
        socket.on("teamChanged", (room, pid) => this.onTeamChanged(room, pid));
        socket.on("teamCountChanged", (room) => this.onTeamCountChanged(room));

        //======[Server protocol]======
        this.room = null;
        this.rid = null;
        this.pid = null;

        //===[Global]===
        //From-Server
        this.onRoomJoined =         (room, rid) => {};
        this.onRoomLeft =           () => {};
        this.onPlayerJoined =       (room, pid) => {};
        this.onPlayerLeft =         (room, pid) => {};
        //To-Server
        this.joinRoom =             (rid) => send("joinRoom", rid);
        this.leaveRoom =            () => send("leaveRoom");

        //===[Lobby]===
        //From-Server
        this.onNameChanged =        (room, pid) => {};
        this.onPlayerKicked =       (room, pid, reason) => {};
        this.onWordsChanged =       (room) => {};
        this.onTeamChanged =        (room, pid) => {};
        this.onTeamCountChanged =   (room) => {};
        //To-Server
        this.setName =              (name) => send("setName", name);
        this.kickPlayer =           (pid, reason) => send("kickPlayer", pid, reason); //Requires owner permissions.
        this.setWords =             (words) => send("setWords", words); //Requires owner permissions.
        this.addWords =             (words) => send("addWords", words); //Requires owner permissions.
        this.removeWords =          (words) => send("removeWords", words); //Requires owner permissions.
        this.setTeam =              (pid, team) => send("setTeam", pid, team); //Requires owner permissions.
        this.setTeamCount =         (count) => send("setTeamCount", count); //Requires owner permissions.

        //===[Game]==
        //From-Server
        //To-Server
    }
}