const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when a client connects
io.on('connection', (socket) => {

    //Welcome current user
    socket.emit('message', 'Welcome to LiveChat');

    //Broadcast when a user connects
    socket.broadcast.emit('message', 'A User has joined the chat');

    //Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A User has left the chat');
    })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Connected on port: ${PORT}`)
})