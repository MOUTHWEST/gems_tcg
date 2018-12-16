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
		var data = event.data;
		if (data.type == "update") {
			if (data.type == "tile") {
				gameArea.objects[0].board[data.data.x][data.data.y].color = data.data.color;
			} else if (data.type == "board") {
				gameArea.objects[0].board = JSON.parse(data.data);
			}
		}
	}

	return socket;
}