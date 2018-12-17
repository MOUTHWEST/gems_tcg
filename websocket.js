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
		var payload = JSON.parse(event.data);
		if (payload.type == "update") {
			if (payload.component == "tile") {
				gameArea.objects["board"].board[payload.data.x][payload.data.y].color = payload.data.color;
			} else if (payload.component == "board") {
				gameArea.objects["board"].board = payload.data;
			}
		} else {
			console.warn("Received unknown payload type \"" + payload.type + "\"");
		}
	}

	return socket;
}