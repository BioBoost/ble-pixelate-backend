class Player {

  constructor(name, world) {
    this.name = name;
    this.world = world;
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
    if (this.direction == 'down') {
      let newLocation = this.world.next_field(this.location, { deltaY: +1 });
      this.move(newLocation);
      this.world.claim_field(newLocation, this);
    } // else if ....
  }

  render(display) {
    // Just draw the head as a highlighted pixel
    display.pixel(this.location.x, this.location.y);
  }

  /////// Private methods ///////////////

  change_direction(direction) {
    this.direction = direction;
  }
  
}

module.exports = Player;