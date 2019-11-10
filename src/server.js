const io = require('socket.io')();
const Game = require('./lib/game');

// Updates are coming in
// let updates = [
//   { id: 'id_hulk', actions: ['R', 'D', 'D', 'X', 'R', 'R'] },
//   { id: 'id_pinky', actions: ['A', 'D', 'D', 'R', 'D'] }
// ]

// updates.forEach((update) => {
//   update.actions.forEach((action) => {
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

    let updatesObj = JSON.parse(updates);
    updatesObj.forEach((update) => {
      update.actions.forEach((action) => {
        switch (action) {
          case 'D': game.move_down(update.id, 5); break;
          case 'U': game.move_up(update.id, 5); break;
          case 'L': game.move_left(update.id, 5); break;
          case 'R': game.move_right(update.id, 5); break;
        }
      });
    });

    game.render();
  });
  
  client.on('disconnect', function(){
    console.log('Frontend disconnected');
  });
});

io.listen(3000);