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
    this.engine.init();
  }

  stop() {
    this.engine.kill();
  }

}

module.exports = Game;