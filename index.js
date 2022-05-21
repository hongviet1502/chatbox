const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')

const io = new Server(server) 

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
    console.log('User connected')
    socket.on('disconnect', function(){
        console.log('User disconnected')
    })
    socket.broadcast.emit('chat message')
    socket.on('chat message', function(msg){
        io.emit('chat message',msg)
    })
})

server.listen(3000, function(){
    console.log ('Listening on port 3000')
})