#!/usr/bin/env node

//GLOBALS - Server config vars & libraries
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.argv[2] || 3000;
var Vec2D = require("./Vec2D.js");

var Player = require("./Player.js");

var CLIENTS = {};
var PLAYERS = [];
var clientIDCounter = 0;

console.log(Vec2D);
console.log(Player);
var p1 = new Player(0, new Vec2D(0,0), new Vec2D(0,0));
console.log(p1);



/*-----WEB SOCKET--------*/
io.on('connection', function(socket) {
	//on connection, emit ID for client connected
	while(clientIDCounter in CLIENTS){
		clientIDCounter++;
	}
	emitOnSocket(io, 'on_connect', clientIDCounter);
	

	//register channels to listen on
	socket.on('connect_ack', function(msg){
		if("id" in msg){
			var p1 = new Player(0, new Vec2D(0,0), new Vec2D(0,0));
			p1.fromJSON(msg);
			if(addToObjUnique(CLIENTS, p1.getID(), p1)){
				console.log('client #%s connected', p1.getID());
			}
			emitOnSocket(io, 'server_update', CLIENTS);
		}
	});

	socket.on('update_state', function(msg){
		if("id" in msg){
			var p1 = new Player(0, new Vec2D(0,0), new Vec2D(0,0));
			p1.fromJSON(msg);
			if(addToObjUnique(CLIENTS, p1.getID(), p1)){
				console.log('client #%s connected', p1.getID());
			}
			CLIENTS[p1.getID()] = p1;
			emitOnSocket(io, 'server_update', CLIENTS);
		}
	});

	socket.on('update_ack', function(msg){
		if("id" in msg){
			var p1 = new Player(0, new Vec2D(0,0), new Vec2D(0,0));
			p1.fromJSON(msg);
			if(addToObjUnique(CLIENTS, p1.getID(), p1)){
				console.log('client #%s connected', p1.getID());
			}
		}
	});

});

function emitOnSocket(ioSocket, topic, message){
	ioSocket.emit(topic, message);
	console.log(" [io] Sending %s: %s", topic, JSON.stringify(message));
}


/*-----END WEB SOCKET FUNCTIONS--------*/



function updateValues(obj, newObj){
	if(newObj!=null){
		for(var key in obj){
			if(key in newObj){
				obj[key] = newObj[key];
			}
		}
		for(var key in newObj){
			if(!(key in obj)){
				obj[key] = newObj[key];
			}
		}
	}
	
}

function addToObjUnique(obj, key, value){
	if(!(key in obj)){
		obj[key] = value;
		return true;
	}
	return false;
}



/*--HTTP FOR CLIENT SCREENS--*/

http.listen(port, function(){
	console.log('listening on *:'+ port);
});

app.use(express.static(__dirname + "/client"));

/* SERVE PAGE*/
app.get('/', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(__dirname + '/client/index.html');
});

app.get('/client/main.css', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(__dirname + '/client/main.css');
});

app.get('/client/two.min.js', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(__dirname + '/client/two.min.js');
});

app.get('/client/url.js', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(__dirname + '/client/url.js');
});

app.get('/Vec2D.js', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(__dirname + '/Vec2D.js');
});

app.get('/Player.js', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(__dirname + '/Player.js');
});


