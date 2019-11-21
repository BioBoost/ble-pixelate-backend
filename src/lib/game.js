const Display = require('./display');
const Player = require('./models/player');
const FileRenderer = require('./renderers/file_renderer');
const MemeTvRenderer = require('./renderers/meme_tv_renderer');
const World = require('./models/world');
const PixelEngine = require('./engine/pixel_engine');
const Controller = require('./controller');
const Color = require('color');
const EventEmitter = require( 'events' );

class Game extends EventEmitter {
  static PLAYFIELD_WIDTH = 96;
  static PLAYFIELD_HEIGHT = 64;
  static GAME_STATE_UPDATE_MS = 1000;

  constructor() {
    super();
    this.setup_engine();
    this.create_world();
  }

  start(players, duration=60) {
    this.controllers = [];
    this.reset_game_state();
    this.gameState.timeleft = duration;
    this.add_players(players);

    // Fire up the engine
    this.engine.init();

    this.gameState.state = 'started';
    this.start_game_timer();
    this.emit_game_state();
  }

  stop() {
    console.log("Stopping game and engine");
    this.engine.kill();

    this.stop_game_timer();
    this.reset_game_state();
    this.emit_game_state();
  }

  take_action(controllerId, action) {
    let controller = this.controllers[controllerId];
    if (controller) {
      controller.queue_action(action);
    } else {
      console.log(`Update for unknown controller id ${controllerId}`);
    }
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

  // players = [ { name, controller_id, color }]
  add_players(players) {
    let spawnLocations = this.world.generate_spawn_locations(players.length);
    for (let i = 0; i < players.length; i++) {
      let player = this.create_player(players[i].name, players[i].color, spawnLocations[i]);
      this.controllers[players[i].controller_id] = this.create_controller(players[i].controller_id, player);
    }
  }

  start_game_timer() {
    this.gameTimer = setInterval(() => {
      this.gameState.timeleft--;
      if (this.gameState.timeleft == 0) {
        this.stop();
      }
      this.emit_game_state();
    }, Game.GAME_STATE_UPDATE_MS);
  }

  stop_game_timer() {
    clearInterval(this.gameTimer);
  }

  reset_game_state() {
    this.gameState = {
      state: 'stopped',
      timeleft: 0,
      stats: []
    }
  }

  emit_game_state() {
    let stats = this.build_player_stats();
    this.gameState.stats = stats;
    this.emit('gamestate', this.gameState);
  }

  build_player_stats() {
    // Grouped field by player
    let playerOwnedFields = this.world.determine_field_ownage();
    console.log(`${playerOwnedFields.map(f => f.count)} <+> ${playerOwnedFields.map(f => f.player.name)}`)

    // Need to combine player and controller id
    let playerStats = Object.values(this.controllers).map((controller) => {
      let stats = {
        id: controller.id,
        player: controller.player.name,
        fieldcount: 0
      };

      let playerField = playerOwnedFields.filter((field) => field.player.name === controller.player.name );
      if (playerField.length > 0) {
        stats.fieldcount = playerField[0].count;
      }

      return stats;
    });

    return playerStats;
  }

}

module.exports = Game;