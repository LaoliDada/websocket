var wss=new WebSocket("ws://10.0.60.91:8000");
var inp=document.getElementById("val");
var meswrap=document.getElementById("messageList");
wss.onopen=function(ws){
	alert("连接成功");
}
wss.onmessage = function(evt) {  
	var data=eval('('+evt.data+')');
	if(data.type=="con"){
		var newnode=document.createElement("li");
		newnode.innerHTML=data.mes;
		meswrap.appendChild(newnode);
	}
};
function sendMes(){
	var data=JSON.stringify({mes:inp.value,type:"con"});
	console.log(data)
	wss.send(data);
}
