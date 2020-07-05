const server = new Server("http://localhost", 9999);

server.joinRoom();
server.onRoomJoined = (room, rid) => {
    server.room = room;
    server.rid = rid;
};