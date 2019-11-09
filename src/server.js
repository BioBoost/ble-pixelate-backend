// const io = require('socket.io')();
const Game = require('./lib/game');

// Game start
let game = new Game();
let start = {
  'id_pinky': { playername: 'nico' },
  'id_hulk': { playername: 'marki' },
  'id_rdr2': { playername: 'johhny' },
};

Object.keys(start).forEach((controllerId) => {
  game.add_player(start[controllerId].playername, controllerId);
});

game.start();


// // Updates are coming in
// let updates = {
//   'id_pinky': [
//     'D', 'D', 'X', 'R', 'R' 
//   ],
//   'id_hulk': [
//     'A', 'D', 'D', 'R', 'D' 
//   ],
//   'ids': ['id_pinky', 'id_hulk']
// };

// updates.ids.forEach(id => {
//   updates[id].forEach((action) => {
//     if (action == 'D') game.move_down(id);
//     else if (action == 'R') game.move_right(id);
//   });
// });

// game.render();

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