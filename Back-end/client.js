class Client{
    constructor(socket)
    {
        let send = (message, arg1, arg2, arg3) =>{
            socket.emit(message, arg1, arg2, arg3);
        };
        socket.on("joinRoom", (rid) => this.onJoinRoom(rid));
        socket.on("leaveRoom", (rid) => this.onLeaveRoom(rid));
        socket.on("disconnect", () => this.onDisconnected());

        socket.on("setName", (name) => this.onSetName(name));
        socket.on("kickPlayer", (pid, reason) => this.onKickPlayer(pid, reason));
        socket.on("setWords", (words) => this.onSetWords(words)); //TODO: implement these functions.
        socket.on("addWords", (words) => this.onAddWords(words));
        socket.on("removeWords", (words) => this.onRemoveWords(words));
        socket.on("setTeam", (pid, team) => this.onSetTeam(pid, team));

        //======[Server protocol]======
        this.socket = socket;
        this.pid = socket.id;
        this.room = null;

        //===[Global]===
        //From-Client
        this.onJoinRoom =       (rid) => {};
        this.onLeaveRoom =      () => {};
        this.onDisconnected =   () => {};
        //To-Client
        this.roomJoined =       (room, rid) => send("roomJoined", room, rid);
        this.roomLeft =         () => send("roomLeft");
        this.playerJoined =     (room, pid) => send("playerJoined", room, pid);
        this.playerLeft =       (room, pid) => send("playerLeft", room, pid);

        //===[Lobby]===
        //From-Client
        this.onSetName =        (name) => {};
        this.onKickPlayer =     (pid, reason) => {}; //Requires owner permissions.
        this.onSetWords =       (words) => {}; //Requires owner permissions.
        this.onAddWords =       (words) => {}; //Requires owner permissions.
        this.onRemoveWords =    (words) => {}; //Requires owner permissions.
        this.onSetTeam =        (pid, team) => {}; //Requires owner permissions.
        //To-Client
        this.nameChanged =      (room, pid) => send("nameChanged", room, pid);
        this.playerKicked =     (room, pid, reason) => send("playerKicked", room, pid, reason);
        this.wordsChanged =     (room) => send("wordsChanged", room);
        this.teamChanged =      (room, pid) => send("teamChanged", room, pid);

        //===[Game]===
        //From-Client
        //To-Client
    }
}

module.exports =
{
    Client
}