module.exports = function(app, io) {
  io.on('connect', (socket) => {
    console.log("conect")
    io.emit('hi', 'everyone'); 

    socket.on('new_message', (data) => {
      // console.log("new_message")
      // io.emit('hi', 'everyone'); 
      // ...
    });
  
    socket.on('respon_raspi', (data) => {
      console.log("respon_raspi"+data)

      
        console.log('data :  '+data)
        io.emit('paksa_on', data); 
      
      
      // ...
    });

    // ...
  });

  




  app.get('/tampilan', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/arduino', function(req, res){
    res.sendFile(__dirname + '/arduino.html');
  });

  app.get('/button', function(req, res){
    res.sendFile(__dirname + '/button.html');
  });

  app.get('/tes', function(req, res){
    io.sockets.emit('tap', 'dari tes');
    res.json(200, {message: "Message received!"});
  });

  app.get('/led_blue_off', function(req, res){
    io.sockets.emit('led_blue_off', 'dari led_blue_off');
    res.json(200, {message: "LED led_blue_off!"});
  });

  app.get('/led_blue_on', function(req, res){
    io.sockets.emit('led_blue_on', 'dari led_blue_on');
    res.json(200, {message: "LED led_blue_on!"});
  });

  app.get('/led_white_off', function(req, res){
    io.sockets.emit('led_white_off', 'dari led_white_off');
    res.json(200, {message: "LED led_white_off!"});
  });

  app.get('/led_white_on', function(req, res){
    io.sockets.emit('led_white_on', 'dari led_white_on');
    res.json(200, {message: "LED led_white_on!"});
  });



  
};
