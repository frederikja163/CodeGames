class Client{
    constructor(socket)
    {
        this.socket = socket;
        this.reset();

        let call = (method, bool) => {
            //console.log(this.pid, Function.prototype.toString.call(method));
            if (bool || bool === undefined){
                method();
            }
        }
        this.socket.on("joinRoom", (rid) => call(() => this.onJoinRoom(rid), typeof rid === "string"));
        this.socket.on("leaveRoom", (rid) => call(() => this.onLeaveRoom(rid), typeof rid === "string"));
        this.socket.on("disconnect", () => call(() => this.onDisconnected()));

        this.socket.on("setName", (name) => call(() => this.onSetName(name), typeof name === "string"));
        this.socket.on("kickPlayer", (pid, reason) => call(() => this.onKickPlayer(pid, reason)), typeof pid === "string" && typeof reason === "string");
        this.socket.on("setWords", (words) => call(() => this.onSetWords(words), words instanceof Array && !words.includes(w => typeof w != "string")));
        this.socket.on("addWords", (words) => call(() => this.onAddWords(words), words instanceof Array && !words.includes(w => typeof w != "string")));
        this.socket.on("removeWords", (words) => call(() => this.onRemoveWords(words), words instanceof Array && !words.includes(w => typeof w != "string")));
        this.socket.on("setTeam", (pid, team) => call(() => this.onSetTeam(pid, team), typeof pid === "string" && typeof team === "number"));
        this.socket.on("setTeamCount", (count) => call(() => this.onSetTeamCount(count), typeof count === "number"));
        this.socket.on("setTeamWordCount", (team, count) => call(() => this.onSetTeamWordCount(team, count), typeof team === "number", typeof count === "number"));
        this.socket.on("setWordCount", (count) => call(() => this.onSetWordCount(count), typeof count === "number" && count > 0 && count < 256));
        this.socket.on("setSpymaster", (team, pid) => call(() => this.onSetSpymaster(team, pid), typeof team === "number" && typeof(pid) === "string"));
        
        this.socket.on("startGame", () => call(() => this.onStartGame()));
        this.socket.on("markWord", (index) => call(() => this.onMarkWord(index), typeof index === "number"));
        this.socket.on("selectWord", (index) => call(() => this.onSelectWord(index), typeof index === "number"));
        this.socket.on("giveWord", (word, wordCount) => call(() => this.onGiveWord(word, wordCount), typeof word === "string", typeof wordCount === "number"));
        this.socket.on("endTurn", () => call(() => this.onEndTurn()));
    }

    reset()
    {
        let send = (message, arg1, arg2, arg3) => {
            //console.log(message, arg1, arg2, arg3);
            this.socket.emit(message, arg1, arg2, arg3);
        };

        //======[Server protocol]======
        this.pid = this.socket.id;
        this.room = null;

        //===[Global]===
        //From-Client
        this.onJoinRoom =           (rid) => {};
        this.onLeaveRoom =          () => {};
        this.onDisconnected =       () => {};
        //To-Client
        this.roomJoined =           (room, rid, pid) => send("roomJoined", room, rid, pid);
        this.roomLeft =             () => send("roomLeft");
        this.playerJoined =         (room, pid) => send("playerJoined", room, pid);
        this.playerLeft =           (room, pid) => send("playerLeft", room, pid);

        //===[Lobby]===
        //From-Client
        this.onSetName =            (name) => {};
        this.onKickPlayer =         (pid, reason) => {}; //Requires owner permissions.
        this.onSetWords =           (words) => {}; //Requires owner permissions.
        this.onAddWords =           (words) => {}; //Requires owner permissions.
        this.onRemoveWords =        (words) => {}; //Requires owner permissions.
        this.onSetTeam =            (pid, team) => {}; //Requires owner permissions.
        this.onSetTeamCount =       (count) => {}; //Requires owner permissions.
        this.onSetTeamWordCount =   (team, count) => {}; //Requires owner permissions.
        this.onSetWordCount =       (count) => {}; //Requires owner permissions.
        this.onSetSpymaster =       (team, pid) => {} //Requires owner permissions.
        this.onStartGame =          () => {} //Requires owner permissions.
        //To-Client
        this.nameChanged =          (room, pid) => send("nameChanged", room, pid);
        this.playerKicked =         (room, pid, reason) => send("playerKicked", room, pid, reason);
        this.wordsChanged =         (room, words) => send("wordsChanged", room, words);
        this.teamChanged =          (room, pid) => send("teamChanged", room, pid);
        this.teamCountChanged =     (room) => send("teamCountChanged", room);
        this.teamWordCountChanged = (room, team) => send("teamWordCountChanged", room, team);
        this.wordCountChanged =     (room) => send("wordCountChanged", room);
        this.spymasterChanged =     (room, pid) => send("spymasterChanged", room, pid);

        //===[Game]===
        //From-Client
        this.onMarkWord =           (index) => {};
        this.onSelectWord =         (index) => {};
        this.onGiveWord =           (word, wordCount) => {};
        this.onEndTurn =           () => {};
        //To-Client
        this.gameStarted =          (room) => send("gameStarted", room);
        this.wordMarked =           (room, index) => send("wordMarked", room, index);
        this.wordSelected =         (room, index) => send("wordSelected", room, index);
        this.wordGiven =            (room) => send("wordGiven", room);
        this.turnEnded =           (room) => send("turnEnded", room);
        this.teamOut =              (room, team) => send("teamOut", room, team);
        this.gameEnded =            (room, words, winner) => send("gameEnded", room, words, winner);
    }
}

module.exports =
{
    Client
}