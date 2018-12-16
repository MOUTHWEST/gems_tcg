"use strict";

function initialiseWebSocket(dict) {
	// Create a new WebSocket.
	var socket = new WebSocket("ws://35.182.156.146:8080");

	// Handle any errors that occur.
	socket.onerror = function(error) {
	  console.log('WebSocket Error: ' + error);
	};

	// When a websocket is opened
	socket.onopen = function(event) {
		//
	};

	// When a message is received
	socket.onmessage = function(event) {
		gameArea.objects[0].board = JSON.parse(event.data);
	}

	return socket;
}