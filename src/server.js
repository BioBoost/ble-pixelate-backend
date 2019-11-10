const io = require('socket.io')();
const Game = require('./lib/game');

// // Updates are coming in
// let updates = {
//   'id_pinky': [
//     'D', 'D', 'X', 'R', 'R' 
//   ],
//   'id_hulk': [
//     'A', 'D', 'D', 'R', 'D' 
//   ]
// };

// Object.keys(updates).forEach((id) => {
//   updates[id].forEach((action) => {
//     switch (action) {
//       case 'D': game.move_down(id, 5); break;
//       case 'U': game.move_up(id, 5); break;
//       case 'L': game.move_left(id, 5); break;
//       case 'R': game.move_right(id, 5); break;
//     }
//   });
// });

let game = null;

io.on('connection', client => {
  console.log('Frontend connected');

  client.on('start', (players) => {
    console.log(`Starting the game with the following players ${players}`);
    game = new Game(false);
    JSON.parse(players).forEach((player) => {
      game.add_player(player.name, player.controller_id, player.color);
    });
    game.start();
  });

  client.on('update', (updates) => {
    console.log(`Getting updates ${updates}`);
  });
  
  client.on('disconnect', function(){
    console.log('Frontend disconnected');
  });
});

io.listen(3000);