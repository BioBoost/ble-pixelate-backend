class Player {

  constructor(name) {
    this.name = name;
    this.direction = 'U';
  }

  change_direction(direction) {
    this.direction = direction;
  }

  init() {
  } 

  update(delta) {
    // here we just move a single pixel in the
    // current direction and update the world
  }

  render(display) {
    // Just draw the head as a highlighted pixel
  }




  // constructor(name, controllerId, color, world) {
  //   this.name = name;
  //   this.controllerId = controllerId;
  //   this.color = color;
  //   this.move({x: 0, y: 0});
  //   this.direction = 'U';
  //   this.world = world;
  // }

  // move(location) {
  //   this.location = location;
  // }
  
}

module.exports = Player;