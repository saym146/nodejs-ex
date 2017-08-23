const WebSocket=require('ws');
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