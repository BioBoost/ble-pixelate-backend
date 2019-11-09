const Display = require('./display');
const Player = require('./player');
const Controller = require('./controller');

class Game {

  constructor() {
    this.display = new Display(96, 64);
    this.controllers = [];
  }

  add_player(playerName, controllerId) {
    this.controllers[controllerId] = {
      controller: new Controller(controllerId, `rgb(250, 0, 0)`, new Player(playerName)),
      location: { x: 0, y: 0 }
    }
  }

  start() {
    this.spawn_all_players();
    this.render();
    console.log(this.controllers);
  }

  move_down(player) {
    // current pos = 
    // next pos =
    // display.line(current, next)
  }

  render() {
    this.display.render();
  }

  /////////////// Internal methods /////////////////
  static SPAWN_DISTANCE = 20;

  spawn_all_players() {
    this.generate_spawn_locations();
    Object.values(this.controllers).forEach((ctrl) => {
      this.display.pixel(ctrl.location.x, ctrl.location.y, ctrl.color);
    });
  }

  generate_spawn_locations() {
    // Spawn players in a circle around mid
    let numberOfPlayers = Object.keys(this.controllers).length;
    let deltaAngle = (360 / numberOfPlayers * Math.PI) / 180;
    let offset = Math.random();

    let i = 0;
    Object.values(this.controllers).forEach((ctrl) => {
      ctrl.location = {
        x: this.display.width/2 + Math.floor(Game.SPAWN_DISTANCE * Math.cos(offset + i * deltaAngle)),
        y: this.display.height/2 + Math.floor(Game.SPAWN_DISTANCE * Math.sin(offset + i * deltaAngle))
      }
      i++;
    });
  }

}

module.exports = Game;