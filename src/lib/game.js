const Display = require('./display');
const Player = require('./player');

class Game {

  constructor() {
    this.display = new Display(96, 64);
    this.players = [];
  }

  add_player(name, controllerId, color="#00FF00") {
    this.players[controllerId] = new Player(name, controllerId, color);
  }

  start() {
    this.spawn_all_players();
    this.render();
  }

  render() {
    this.display.render();
  }

  /////////////// Internal methods /////////////////
  static SPAWN_DISTANCE = 20;

  spawn_all_players() {
    this.generate_spawn_locations();
    Object.values(this.players).forEach((player) => {
      this.display.pixel(player.location.x, player.location.y, player.color);
    });
  }

  generate_spawn_locations() {
    // Spawn players in a circle around mid
    let numberOfPlayers = Object.keys(this.players).length;
    let deltaAngle = (360 / numberOfPlayers * Math.PI) / 180;
    let offset = Math.random();   // Randomize start locations each game

    let i = 0;
    Object.values(this.players).forEach((player) => {
      player.move({
        x: this.display.width/2 + Math.floor(Game.SPAWN_DISTANCE * Math.cos(offset + i * deltaAngle)),
        y: this.display.height/2 + Math.floor(Game.SPAWN_DISTANCE * Math.sin(offset + i * deltaAngle))
      });
      i++;
    });
  }

}

module.exports = Game;