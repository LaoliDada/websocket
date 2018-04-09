/*var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var express = require("express");
var app = express();
var server = require("http").createServer(app);
app.use("/",express.static(__dirname));
app.get("/",function(){
	res.sendFile(__dirname);
})
var wss = new WebSocketServer({
	port:3000,
	host:"10.0.60.91"
});
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
    	var data=eval('('+message+')');
    	if(data.type=="con"){
    		var obj={mes:data.mes,type:"con"};
    		ws.send(JSON.stringify(obj));
    	}
	})
});
 

server.listen(3000);*/
var express = require('express');
var http = require('http');
var WebSocket = require('ws');

var app = express();
app.use(express.static(__dirname));

var server = http.createServer(app);
var wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws) {
    console.log('链接成功！');
    ws.on('message', function incoming(data) {
        /**
         * 把消息发送到所有的客户端
        * wss.clients获取所有链接的客户端
         */
      wss.clients.forEach(function each(client) {
           client.send(data);
        });
   });
});

server.listen(8000, function listening() {
     console.log('服务器启动成功！');
 });