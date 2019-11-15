class Player {

  constructor(name, world) {
    this.name = name;
    this.direction = 'D';
    this.world = world;
    this.location = { x: 0, y: 0 }
  }

  change_direction(direction) {
    this.direction = direction;
  }

  init() {
  }

  update(delta) {
    // here we just move a single pixel in the
    // current direction and update the world
    if (this.direction == 'D') {
      this.location.y++;
      this.world.claim_field(this.location, this);
    } // else if ....
  }

  render(display) {
    // Just draw the head as a highlighted pixel
    display.pixel(this.location.x, this.location.y);
  }
  
}

module.exports = Player;