var express = require('express'),
    fs = require('fs'),
    app = express(),
    eps = require('ejs'),
    morgan = require('morgan');

const WebSocket = require('ws');
const server = new WebSocket.Server({
		port:6551
	});

function broadcast(data){
	server.clients.forEach(ws => {
		ws.send(data);			
	});
}

server.on('connection',ws=>{
	ws.on('message',data=>{
		broadcast(data);
	});
});

app.get('/', function (req, res) {
    // try to initialize the db on every request if it's not already
    // initialized.
    if (!db) {
        initDb(function (err) { });
    }
    if (db) {
        var col = db.collection('counts');
        // Create a document with request IP and current time of request
        col.insert({ ip: req.ip, date: Date.now() });
        col.count(function (err, count) {
            res.render('index.html', { pageCountMessage: count, dbInfo: dbDetails });
        });
    } else {
        res.render('index.html', { pageCountMessage: null });
    }
});