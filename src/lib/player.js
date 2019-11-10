class Player {

  constructor(name, controllerId, color) {
    this.name = name;
    this.controllerId = controllerId;
    this.color = color;
    this.move({x: 0, y: 0});
    this.direction = 'U';
  }

  move(location) {
    this.location = location;
  }

}

module.exports = Player;