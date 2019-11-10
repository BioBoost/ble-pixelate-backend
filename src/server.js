// const io = require('socket.io')();
const Game = require('./lib/game');

// Game start
let game = new Game(false);
let start = [
  { controller_id: 'id_pinky', name: 'nico', color: "#FF0000" },
  { controller_id: 'id_hulk', name: 'marki', color: "#00FF00" },
  { controller_id: 'id_rdr2', name: 'johhny', color: "#0000FF" },
];

start.forEach((player) => {
  game.add_player(player.name, player.controller_id, player.color);
});

game.start();

// Updates are coming in
let updates = {
  'id_pinky': [
    'D', 'D', 'X', 'R', 'R' 
  ],
  'id_hulk': [
    'A', 'D', 'D', 'R', 'D' 
  ]
};

Object.keys(updates).forEach((id) => {
  updates[id].forEach((action) => {
    switch (action) {
      case 'D': game.move_down(id, 5); break;
      case 'U': game.move_up(id, 5); break;
      case 'L': game.move_left(id, 5); break;
      case 'R': game.move_right(id, 5); break;
    }
  });
});

game.render();


// io.on('connection', client => {
//   console.log('Frontend connected');

//   client.on('start', (controllers) => {
//     console.log(`Starting the game with the following controller ${controllers}`);
//   });

//   client.on('update', (updates) => {
//     updates.forEach((update) => {
//       console.log(`Updates for controller ${update.controller}`);
//     });
//   });
  
//   client.on('disconnect', function(){
//     console.log('Frontend disconnected');
//   });
// });


// io.listen(3000);