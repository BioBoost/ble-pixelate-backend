const Display = require('./display');
const Player = require('./models/player');
const FileRenderer = require('./renderers/file_renderer');
const MemeTvRenderer = require('./renderers/meme_tv_renderer');
const World = require('./models/world');
const PixelEngine = require('./engine/pixel_engine');
const Controller = require('./controller');
const Color = require('color');

class Game {
  static PLAYFIELD_WIDTH = 96;
  static PLAYFIELD_HEIGHT = 64;

  constructor() {
    this.setup_engine();
    this.create_world();
    this.controllers = [];
  }

  // players = [ { name, controller_id, color }]
  add_players(players) {
    let spawnLocations = this.world.generate_spawn_locations(players.length);
    for (let i = 0; i < players.length; i++) {
      let player = this.create_player(players[i].name, players[i].color, spawnLocations[i]);
      this.controllers[players[i].controller_id] = this.create_controller(players[i].controller_id, player);
    }
  }

  start() {
    // Fire up the engine
    this.engine.init();
  }

  stop() {
    this.engine.kill();
  }

  take_action(controllerId, action) {
    let controller = this.controllers[controllerId];
    controller.queue_action(action);
  }

  /////////////// Internal methods /////////////////

  setup_engine() {
    this.display = new Display(Game.PLAYFIELD_WIDTH, Game.PLAYFIELD_HEIGHT);
    this.display.add_renderer(new FileRenderer(`${__dirname}/test.png`));
    this.display.add_renderer(new MemeTvRenderer(`http://172.16.0.70:3000`));
    this.engine = new PixelEngine(this.display);
  }

  create_world() {
    this.world = new World();
    this.engine.register_model(this.world);
  }

  create_player(name, color, spawnLocation) {
    let player = new Player(name, this.world, new Color(color));
    player.spawn(spawnLocation);
    this.engine.register_model(player);
    return player;
  }

  create_controller(id, player) {
    let controller = new Controller(id, player);
    this.engine.register_model(controller);
    return controller;
  }

}

module.exports = Game;