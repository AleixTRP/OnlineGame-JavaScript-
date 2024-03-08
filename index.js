var static = require('node-static');
let http = require('http');
let ws = require('ws');


var file = new static.Server('./public');
 
let http_server = http.createServer(function (request, response) {
    request.addListener('end', function () {
  
        file.serve(request, response);
    }).resume();
});

let ws_server = new ws.WebSocketServer({ server: http_server });
http_server.listen(8080);

let p1_conn;
let p2_conn;
let viewr = [];
let userConnect = 3;

ws_server.on('connection',function (conn)
{
if(p1_conn == undefined)
{
	p1_conn = conn;

	p1_conn.send('{"player_num"}1');

  p1_conn.on('message',function(data){
 		if(p2_conn == undefined)
		{
			return;
		}
	p2_conn.send(data.toString());
	viewr.forEach(viewr)
	{
	viewr.send(data.toString());
	}
		let parsedData = JSON.parse(data);

	if(parsedData.collied != undefined && parsedData.collided === true)
	{
		p1_conn.send('{"gameOver": 1}');
		p2_conn.send('{"gameOver": 1}');
			viewr.forEach(viewr)
			{
				viewr.send('{gameOver":1}');

			}
		}
	});
}
else if (p2_conn == undefined)
{
 	p2_conn = conn;
 
  p2_conn.send('{"player_num"}2');

	p2_conn.on('message',function(data){
  	p1_conn.send(data)
	{
		if(p1_conn == undefined)
		{
			return;
		}
	}
	p1_conn.send(data.toString());
	viewr.forEach(viewr)
	{
		viewr.send(data.toString());

	}
		let parsedData = JSON.parse(data);

		if(parsedData.collied != undefined && parsedData.collied === true)
		{
			p1_conn.send('{"gameOver":2}');
			p2_conn.send('{"gameOver":2}');
				viewr.forEach(viewr)
				{	
					viewr.send('{gameOver":2}');

				}
		}
});
}
else{

	let data = `{"playerNum": ${usersConnected}}`;
	conn.send(data);
	usersConnected++;
	viewr.push(conn);
	}

});
