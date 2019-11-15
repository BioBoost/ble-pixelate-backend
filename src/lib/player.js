class Player {

  constructor(name, world, color) {
    this.name = name;
    this.world = world;
    this.color = color;
    this.claimColor = color.darken(0.5);
    this.go_down();
    this.move({ x: 0, y: 0 });
  }

  go_up() { 
    this.change_direction('up'); 
  }

  go_down() { 
    this.change_direction('down'); 
  }

  go_left() { 
    this.change_direction('left'); 
  }

  go_right() { 
    this.change_direction('right');
  }

  move(location = {x: 0, y: 0}) {
    this.location = location;
  }

  init() {
  }

  update(delta) {
    // here we just move a single pixel in the
    // current direction and update the world
    let deltaLocation = { dx: 0, dy: 0 };
    switch (this.direction) {
      case 'down': deltaLocation.dy = +1; break;
      case 'up': deltaLocation.dy = -1; break;
      case 'left': deltaLocation.dx = -1; break;
      case 'right': deltaLocation.dx = +1; break;
    }
    let newLocation = this.world.next_field(this.location, deltaLocation);
    this.move(newLocation);
    this.world.claim_field(newLocation, this);
  }

  render(display) {
    // Just draw the head as a highlighted pixel
    display.pixel(this.location.x, this.location.y, this.color);
  }

  color() {
    return this.baseColor;
  }

  claim_color() {
    return this.claimColor;
  }

  /////// Private methods ///////////////

  change_direction(direction) {
    this.direction = direction;
  }
  
}

module.exports = Player;