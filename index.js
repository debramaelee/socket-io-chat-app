//initializes app to be a function handler to supply to an HTTP server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//define route handler '/' that gets called when we hit website home
app.get('/', function(req, res){
  res.sendFile(__dirname + '/user.html');
});

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//listening for connection events for incoming sockets, logging messages
io.on('connection', function(socket){
	socket.broadcast.emit('chat message', 'A user connected.');
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		console.log(msg)
	});

	socket.on('disconnect', function(){
	socket.broadcast.emit('chat message', 'A user disconnected.');
	});
}); 


http.listen(3000, function(){
  console.log('listening on *:3000');
});