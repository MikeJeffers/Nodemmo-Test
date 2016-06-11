#!/usr/bin/env node

//GLOBALS - Server config vars & libraries
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.argv[2] || 3000;

var CLIENTS = {};
var clientIDCounter = 0;


/*-----WEB SOCKET--------*/
io.on('connection', function(socket) {
	//on connection, emit ID for client connected
	while(clientIDCounter in CLIENTS){
		clientIDCounter++;
	}
	emitOnSocket(io, 'on_connect', clientIDCounter);
	

	//register channels to listen on
	socket.on('connect_ack', function(msg){
		var clientID = msg["ID"];
		var clientState = msg["STATE"];
		if(addToObjUnique(CLIENTS, clientID, clientState)){
			console.log('client #%s connected', clientID);
		}
		emitOnSocket(io, 'server_update', CLIENTS);
	});

	socket.on('update_state', function(msg){
		var clientID = msg["ID"];
		var clientState = msg["STATE"];
		if(addToObjUnique(CLIENTS, clientID, clientState)){
			console.log('client #%s connected', clientID);
		}
		CLIENTS[clientID] = clientState;
		emitOnSocket(io, 'server_update', CLIENTS);
		CLIENTS = {};
	});

	socket.on('update_ack', function(msg){
		var clientID = msg["ID"];
		var clientState = msg["STATE"];
		if(addToObjUnique(CLIENTS, clientID, clientState)){
			console.log('client #%s update_ack', clientID);
		}
	});

});

function emitOnSocket(ioSocket, topic, message){
	ioSocket.emit(topic, message);
	console.log(" [io] Sending %s: %s", topic, message);
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


