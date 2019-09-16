const express = require('express');
const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connect', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (e) => {
        console.log(e);
        
        io.emit('chat reply', e);
    })
})

http.listen(8080, () => {
    console.log('Listening on port 8080');

});