class Server
{
    constructor() // TODO: couldnt connect err msg
    {
        this.connected = false;
    }

    connect(ip, port)
    {
        if (this.connected)
        {
            console.warn("Already connected to server!");
            return;
        }
        const socket = io("http://" + ip + ":" + port, {secure: true});
        
        let send = (message, arg1, arg2, arg3) =>
        {
            if (debugMode)
            {
                console.log(message, arg1, arg2, arg3);
            }
            socket.emit(message, arg1, arg2, arg3);
        };
        let incoming = (message, method) =>
        {
            socket.on(message, (arg1, arg2, arg3) => 
            {
                if (debugMode)
                {
                    console.log(message, arg1, arg2, arg3);
                }
                method(arg1, arg2, arg3);
            }
            );
        }
        incoming("roomJoined", (room, rid, pid) => this.onRoomJoined(room, rid, pid));
        incoming("roomLeft", () => this.onRoomLeft());
        incoming("playerJoined", (room, pid) => this.onPlayerJoined(room, pid));
        incoming("playerLeft", (room, pid) => this.onPlayerLeft(room, pid));

        incoming("nameChanged", (room, pid, name) => this.onNameChanged(room, pid, name));
        incoming("playerKicked", (room, pid, reason) => this.onPlayerKicked(room, pid, reason));
        incoming("wordsChanged", (room, words) => this.onWordsChanged(room, words));
        incoming("teamChanged", (room, pid) => this.onTeamChanged(room, pid));
        incoming("teamCountChanged", (room) => this.onTeamCountChanged(room));
        incoming("teamWordCountChanged", (room, team) => this.onTeamWordCountChanged(room, team));
        incoming("wordCountChanged", (room) => this.onWordCountChanged(room));
        incoming("spymasterChanged", (room, pid) => this.onSpymasterChanged(room, pid));
        
        incoming("gameStarted", (room) => this.onGameStarted(room));
        incoming("wordMarked", (room, index) => this.onWordMarked(room, index));
        incoming("wordSelected", (room, index) => this.onWordSelected(room, index));
        incoming("wordGiven", (room) => this.onWordGiven(room));
        incoming("roundEnded", (room) => this.onRoundEnded(room));

        //======[Server protocol]======
        this.room = null;
        this.rid = null;
        this.pid = null;

        //===[Global]===
        //From-Server
        this.onRoomJoined =             (room, rid) => {};
        this.onRoomLeft =               () => {};
        this.onPlayerJoined =           (room, pid) => {};
        this.onPlayerLeft =             (room, pid) => {};
        //To-Server 
        this.joinRoom =                 (rid) => send("joinRoom", rid);
        this.leaveRoom =                () => send("leaveRoom");

        //===[Lobby]===
        //From-Server
        this.onNameChanged =            (room, pid) => {};
        this.onPlayerKicked =           (room, pid, reason) => {};
        this.onWordsChanged =           (room, words) => {};
        this.onTeamChanged =            (room, pid) => {};
        this.onTeamCountChanged =       (room) => {};
        this.onTeamWordCountChanged =   (room, team) => {};
        this.onWordCountChanged =       (room) => {};
        this.onSpymasterChanged =       (room,pid) => {}
        //To-Server
        this.setName =                  (name) => send("setName", name);
        this.kickPlayer =               (pid, reason) => send("kickPlayer", pid, reason); //Requires owner permissions.
        this.setWords =                 (words) => send("setWords", words); //Requires owner permissions.
        this.addWords =                 (words) => send("addWords", words); //Requires owner permissions.
        this.removeWords =              (words) => send("removeWords", words); //Requires owner permissions.
        this.setTeam =                  (pid, team) => send("setTeam", pid, team); //Requires owner permissions.
        this.setTeamCount =             (count) => send("setTeamCount", count); //Requires owner permissions.
        this.setTeamWordCount =         (team, count) => send("setTeamWordCount", team, count); //Requires owner permissions.
        this.setWordCount =             (count) => send("setWordCount", count); //Requires owner permissions.
        this.setSpymaster =             (team, pid) => send("setSpymaster", team, pid); //Requires owner permissions.
        this.startGame =                () => send("startGame");

        //===[Game]==
        //From-Server
        this.onGameStarted =            (room) => {};
        this.onWordMarked =             (room, index) => {};
        this.onWordSelected =           (room, index) => {};
        this.onWordGiven =              (room) => {};
        this.onRoundEnded =             (room) => {};
        //To-Server
        this.markWord =                 (index) => send("markWord", index);
        this.selectWord =               (index) => send("selectWord", index);
        this.giveWord =                 (word, wordCount) => send("giveWord", word, wordCount);
        this.endRound =                 () => send("endRound");
    }
}