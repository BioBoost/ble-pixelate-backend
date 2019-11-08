const io = require('socket.io')();

io.on('connection', client => {
  console.log('Frontend connected');

  client.on('start', (controllers) => {
    console.log(`Starting the game with the following controller ${controllers}`);
  })

  client.on('update', (updates) => {
    updates.forEach((update) => {
      console.log(`Updates for controller ${update.controller}`);
    })
  })
  
  client.on('disconnect', function(){
    console.log('Frontend disconnected');
  });
});

io.listen(3000);