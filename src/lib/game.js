const Display = require('./display');
const Player = require('./player');
const FileRenderer = require('./renderers/file_renderer');
const MemeTvRenderer = require('./renderers/meme_tv_renderer');
const World = require('./world');
const PixelEngine = require('./pixel_engine');

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
  }

  add_player(name, controllerId) {
    this.players[controllerId] = new Player(name, this.world);
    this.engine.register_model(this.players[controllerId]);
  }

  start() {
    // Fire up the engine
    this.spawn_all_players();
    this.engine.init();
  }

  stop() {
    this.engine.kill();
  }

  /////////////// Internal methods /////////////////
  static SPAWN_DISTANCE = 10;

  spawn_all_players() {
    // Spawn players in a circle around mid
    let numberOfPlayers = Object.keys(this.players).length;
    let deltaAngle = (360 / numberOfPlayers * Math.PI) / 180;
    let offset = Math.random();   // Randomize start locations each game

    let i = 0;
    Object.values(this.players).forEach((player) => {
      player.move({
        x: Game.PLAYFIELD_WIDTH/2 + Math.floor(Game.SPAWN_DISTANCE * Math.cos(offset + i * deltaAngle)),
        y: Game.PLAYFIELD_HEIGHT/2 + Math.floor(Game.SPAWN_DISTANCE * Math.sin(offset + i * deltaAngle))
      });
      i++;
      console.log(`Player ${JSON.stringify(player)} spawned`);
    });
  }

}

module.exports = Game;