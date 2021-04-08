var app = require('express')();
var cors = require('cors');

app.use(cors());

var http = require('http').createServer(app);
var port = process.env.PORT || 5000;
var route = require('./route');
//var axios = require('axios')
var request = require("request");




//console.log(options);
//http.createServer(options, app)
http.listen(port, function(){
  console.log('listening on *:' + port);
});
var io = require('socket.io')(http,{
  //serveClient:true,
  //#path: '/socket.io',
});


//var cors = require('cors');
//app.use(cors());


token_users = []
route(app,io)
io.on('connection', function(socket){
console.log(socket.id);
console.log(socket.handshake.query['unik']);

request.post({
    "headers": { "content-type": "application/json" },
    "url": "https://dev2.obrolantetangga.com/api/connect",
    "body": JSON.stringify({
        "token": socket.id,
        "unik": socket.handshake.query['unik']
    })
}, (error, rq_response, body) => {
	console.log(body)
    rq_response.statusCode == 200 ? token_users.push(socket.id) : console.log('user not found');
});

//console.log(axiosTest('https://dog.ceo/api/breeds/list/all'))
console.log(token_users)
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('new_message', function(msg){
    console.log(msg)
    io.emit('onLED', msg);
  });

  socket.on('send_data_sensor', function(msg){
    from_client = JSON.parse(msg.replace(/'/g, '\"'));
    io.emit('get_log_sensor', from_client);
    // console.log(from_client.suhu_udara);
    // io.emit('onLED', msg);
  });

  socket.on('respon_led_white_on', function(msg){
    console.log(msg);
    // io.emit('onLED', msg);
  });

socket.on('disconnect', function() {
	for( var i=0, len=token_users.length; i<len; ++i ){
                if(token_users[i]  == socket.id){
                    token_users.splice(i,1);
                    break;
                }
            }

	console.log(token_users);
request.post({
    "headers": { "content-type": "application/json" },
    "url": "https://dev2.obrolantetangga.com/api/disconnect",
    "body": JSON.stringify({
        "token": socket.id,
        "unik": socket.handshake.query['unik']
    })
}, (error, rq_response, body) => {
        console.log(body)
    //rq_response.statusCode == 200 ? token_users.push(socket.id) : console.log('user not found');
});

      //var i = allClients.indexOf(socket);
      //allClients.splice(i, 1);
   });
  // 
});






