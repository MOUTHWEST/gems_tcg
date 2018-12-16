"use strict";

function initialiseWebSocket(dict) {
	// Create a new WebSocket.
	var socket = new WebSocket('ws://35.182.156.146:8080');

	// Handle any errors that occur.
	socket.onerror = function(error) {
	  console.log('WebSocket Error: ' + error);
	};

	// Show a connected message when the WebSocket is opened.
	socket.onopen = function(event) {
		socket.send("echo");
	};

	console.log(socket);

	return socket;
}