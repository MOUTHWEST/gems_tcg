#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');
var fs = require("fs");

function getCurrentDateTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var millisecond = date.getMilliseconds()

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;
    if (millisecond < 10) millisecond = "00" + millisecond;
    else if (millisecond < 100) millisecond = "0" + millisecond;

    return "[UTC " + year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second + "." +
        millisecond + "] ";
}

var server = http.createServer(function(request, response) {
    console.log(getCurrentDateTime() + ' Received request for ' + request.url);
    if (request.url === "/") {
        fs.readFile("client_files/gems.html", function (error, html) {
            if (error) {
                response.writeHead(500);
                response.write("The server could not find the requested page, but it should exist");
            } else {
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(html);
           }
           response.end();
        });
    } else {
        response.writeHead(400);
        response.write("The requested page could not be found");
    }
});
server.listen(8080, function() {
    console.log(getCurrentDateTime() + 'Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});


function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

var connections = {};
var connectionID = 1;

var board = []

for (var i = 0; i < 5; i++) {
    board.push([]);
    for (var j = 0; j < 5; j++) {
        board[i].push({
            color: 0,
            x_pos: 0,
            y_pos: 0
        });
    }
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log(getCurrentDateTime() + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }

    var connection = request.accept("", request.origin);

    console.log(getCurrentDateTime() + connection.remoteAddress + ' connected to the WebSocket');

    connections[connectionID] = connection;
    connection.id = connectionID;
    connectionID += 1;

    connection.send(initialiseBoard(board));

    connection.on('message', function(message) {
        payload = JSON.parse(message.utf8Data);

        if (payload.type == "update") {
            if (payload.component == "tile") {
                console.log(getCurrentDateTime() + "Received board updatee from " + connection.remoteAddress +
                    " (payload: " + message.utf8Data +  ")");

                board[payload.data.x][payload.data.y].color = payload.data.color;

                for (connection of Object.values(connections)) {
                    connection.send(JSON.stringify(payload));
                    console.log(getCurrentDateTime() + "Sent updated board to " + connection.remoteAddress);
                };
            } else {
                console.warn(getCurrentDateTime() + "Received message from " +  connection.remoteAddress +
                    " with unknown payload component \"" + payload.component + "\" (payload: " + message.utf8Data +
                    ")");
            }
        } else {
            console.warn(getCurrentDateTime() + "Received message from " + connection.remoteAddress +
                " with unknown payload type \"" + payload.type + "\" (payload: " + message.utf8Data + ")");
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log(getCurrentDateTime() + connection.remoteAddress + ' disconnected.');
        delete connections[connection.id];
    });
});

function initialiseBoard(board) {
    return JSON.stringify({
        "type": "initialise",
        "component": "board",
        "data": board
    });
}


