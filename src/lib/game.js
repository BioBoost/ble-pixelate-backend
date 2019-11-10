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

  move_down(controllerId, pixels) {
    this.move(controllerId, 0, pixels);
  }

  move_up(controllerId, pixels) {
    this.move(controllerId, 0, -pixels);
  }

  move_right(controllerId, pixels) {
    this.move(controllerId, pixels, 0);
  }

  move_left(controllerId, pixels) {
    this.move(controllerId, -pixels, 0);
  }

  move(controllerId, deltaX, deltaY) {
    let player = this.players[controllerId];
    let startLocation = player.location;

    let endLocation = this.determine_end_location(startLocation, deltaX, deltaY);
    console.log(`Moving player ${controllerId} from ${JSON.stringify(startLocation)} to ${JSON.stringify(endLocation)}`);
    this.display.line(startLocation, endLocation, player.color);
    player.move(endLocation);
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

  determine_end_location(startLocation, deltaX, deltaY) {
    let endLocation = {
      x: startLocation.x + deltaX,
      y: startLocation.y + deltaY
    };

    endLocation.x = Math.max(0, Math.min(endLocation.x, this.display.width-1));
    endLocation.y = Math.max(0, Math.min(endLocation.y, this.display.height-1));

    return endLocation;
  }

}

module.exports = Game;