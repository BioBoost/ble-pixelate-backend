const Display = require('./display');
const Player = require('./player');

class Game {

  static PLAYFIELD_WIDTH = 96;
  static PLAYFIELD_HEIGHT = 64;

  constructor(enableBoundaries=true) {
    this.display = new Display(Game.PLAYFIELD_WIDTH, Game.PLAYFIELD_HEIGHT);
    this.players = [];
    this.enableBoundaries = enableBoundaries;
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

  render() {
    this.display.render();
  }

  /////////////// Internal methods /////////////////
  static SPAWN_DISTANCE = 10;

  spawn_all_players() {
    this.generate_spawn_locations();
    Object.values(this.players).forEach((player) => {
      this.display.pixel(player.location.x, player.location.y, player.color);
      console.log(`Player ${JSON.stringify(player)} spawned`);
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

  // Limited to single direction !!
  // Otherwise behavior is undefined
  move(controllerId, deltaX, deltaY) {
    // Limit delta
    deltaX = deltaX % Game.PLAYFIELD_WIDTH;
    deltaY = deltaY % Game.PLAYFIELD_HEIGHT;

    let player = this.players[controllerId];
    let startLocation = player.location;

    let endLocation = {
      x: startLocation.x + deltaX,
      y: startLocation.y + deltaY
    };

    if (this.enableBoundaries) {
      endLocation.x = Math.max(0, Math.min(endLocation.x, Game.PLAYFIELD_WIDTH-1));
      endLocation.y = Math.max(0, Math.min(endLocation.y, Game.PLAYFIELD_HEIGHT-1));
      this.display.line(startLocation, endLocation, player.color);
    } else {
      let path = this.determine_path_to_unbound_end_location(startLocation, endLocation);
      path.forEach((segment) => this.display.line(segment.from, segment.to, player.color));
      endLocation = path[path.length-1].to;
    }

    console.log(`Moving player ${controllerId} from ${JSON.stringify(startLocation)} to ${JSON.stringify(endLocation)}`);
    player.move(endLocation);
  }

  determine_path_to_unbound_end_location(from, to) {
    let path = [];
    const MAX_X = Game.PLAYFIELD_WIDTH-1;
    const MAX_Y = Game.PLAYFIELD_HEIGHT-1;

    if (to.y < 0) {
      path = [
        { from: from, to: { x: to.x, y: 0 } },
        { from: {x: to.x, y: MAX_Y}, to: { x: to.x, y: to.y+(MAX_Y+1) } }
      ];
    } else if (to.y > MAX_Y) {
      path = [
        { from: from, to: { x: to.x, y: MAX_Y } },
        { from: {x: from.x, y: 0}, to: { x: to.x, y: to.y-(MAX_Y+1) } }
      ];
    } else if (to.x < 0) {
      path = [
        { from: from, to: { x: 0, y: to.y } },
        { from: {x: MAX_X, y: from.y}, to: { x: to.x+(MAX_X+1), y: to.y } }
      ];
    } else if (to.x > MAX_X) {
      path = [
        { from: from, to: { x: MAX_X, y: to.y } },
        { from: {x: 0, y: from.y}, to: { x: to.x-(MAX_X+1), y: to.y } }
      ];
    }
    else {
      path = [
        { from: from, to: to }
      ]
    }
    
    return path;
  }

}

module.exports = Game;