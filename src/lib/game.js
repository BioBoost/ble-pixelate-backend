const Display = require('./display');
const Player = require('./models/player');
const FileRenderer = require('./renderers/file_renderer');
const MemeTvRenderer = require('./renderers/meme_tv_renderer');
const World = require('./models/world');
const PixelEngine = require('./engine/pixel_engine');
const Controller = require('./controller');

class Game {
  static PLAYFIELD_WIDTH = 96;
  static PLAYFIELD_HEIGHT = 64;

  constructor() {
    // Setup the engine
    this.display = new Display(Game.PLAYFIELD_WIDTH, Game.PLAYFIELD_HEIGHT);
    this.display.add_renderer(new FileRenderer(`${__dirname}/test.png`));
    this.engine = new PixelEngine(this.display);

    // Create the models
    this.world = new World();
    this.engine.register_model(this.world);
    this.players = [];
    this.controllers = [];
  }

  add_player(name, controllerId, color) {
    this.players[controllerId] = new Player(name, this.world, color);
    this.engine.register_model(this.players[controllerId]);

    // Also need to create controller
    this.controllers[controllerId] = new Controller(controllerId, this.players[controllerId]);
    this.engine.register_model(this.controllers[controllerId]);
  }

  start() {
    // Fire up the engine
    this.spawn_all_players();
    this.engine.init();
  }

  stop() {
    this.engine.kill();
  }

  take_action(controllerId, action) {
    let controller = this.controller[controllerId];
    controller.queue_action(action);
  }

  /////////////// Internal methods /////////////////
  static SPAWN_DISTANCE = 10;

  // Is this not something the world should provide ????
  // We can do that if we make the server provide us with all players at once
  spawn_all_players() {
    // Spawn players in a circle around mid
    let numberOfPlayers = Object.keys(this.players).length;
    let deltaAngle = (360 / numberOfPlayers * Math.PI) / 180;
    let offset = Math.random();   // Randomize start locations each game

    let i = 0;
    Object.values(this.players).forEach((player) => {
      player.spawn({
        x: Game.PLAYFIELD_WIDTH/2 + Math.floor(Game.SPAWN_DISTANCE * Math.cos(offset + i * deltaAngle)),
        y: Game.PLAYFIELD_HEIGHT/2 + Math.floor(Game.SPAWN_DISTANCE * Math.sin(offset + i * deltaAngle))
      });
      i++;
      console.log(`Player ${JSON.stringify(player)} spawned`);
    });
  }

}

module.exports = Game;