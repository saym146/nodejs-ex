var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
users = [];
connections = [];
var portNo = process.env.PORT || 6551;
server.listen(portNo);
console.log("Server is running... port: " + portNo);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log("Connected: %s sockets connected", connections.length);

    socket.on('disconnect', function (data) {
        users.splice(users.indexOf(socket.userName), 1);
        connections.splice(connections.indexOf(socket), 1);
        updateUserNames();
        console.log("Disconnected: %s sockets connected", connections.length);
    });
    socket.on('send message', function (data) {
        io.emit('new message', { msg: data, userName: socket.userName });
        updateUserNames();
        console.log("Message sent by: ", socket.userName);
    });
    socket.on('new user', function (data, callback) {
        socket.userName = data;
        users.push(socket.userName);
        callback(true);
        updateUserNames();
        console.log("Total %s users connected", users.length);
    });
    function updateUserNames() {
        io.emit('get users', users);
    }
});