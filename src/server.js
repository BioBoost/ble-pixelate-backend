const io = require('socket.io')();
const Game = require('./lib/game');

// let players = [
//   { controller_id: 'id_pinky', name: 'nico', color: "#FF0000" },
//   { controller_id: 'id_hulk', name: 'marki', color: "#00FF00" },
//   { controller_id: 'id_rdr2', name: 'johhny', color: "#0000FF" },
// ];

// let updates = [
//   { id: 'id_hulk', actions: ['R', 'D', 'D', 'X', 'R', 'R'] },
//   { id: 'id_pinky', actions: ['A', 'D', 'D', 'R', '0'] }
// ]

let game = null;

io.on('connection', client => {
  console.log('Frontend connected');

  client.on('start', (players) => {
    console.log(`Starting the game with the following players ${players}`);
    game = new Game(false);
    game.on('gamestate', (state) => {
      client.emit('gamestate', JSON.stringify(state))
      console.log(`Gamestate: ${JSON.stringify(state)}`);
    });
    game.add_players(JSON.parse(players));
    game.start();
  });

  client.on('update', (updates) => {
    console.log(`Getting updates ${updates}`);

    let updatesObj = JSON.parse(updates);
    updatesObj.forEach((update) => {
      update.actions.forEach((action) => game.take_action(update.id, action) );
    });
  });
  
  client.on('disconnect', function(){
    console.log('Frontend disconnected');
  });
});

io.listen(3000);