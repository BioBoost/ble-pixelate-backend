const Laser = require('../weapons/laser');

class Player {

  constructor(name, world, color) {
    this.name = name;
    this.world = world;
    this.color = color;
    this.claimColor = color.darken(0.5);
    this.spawn();
    this.change_direction('down');
    this.laser = new Laser();
  }

  go_up() { 
    this.change_direction('up');
    this.move_in_current_direction();
  }

  go_down() { 
    this.change_direction('down');
    this.move_in_current_direction();
  }

  go_left() { 
    this.change_direction('left');
    this.move_in_current_direction();
  }

  go_right() { 
    this.change_direction('right');
    this.move_in_current_direction();
  }

  explode() {
    // Claim pixels in boundary of circle
  }

  shoot_laser() {
    this.laser.activate(this.world, this);
  }

  spawn(location = {x: 0, y: 0}) {
    this.move(location);
  }

  move(location = {x: 0, y: 0}) {
    this.location = location;
  }

  init() {
    this.world.claim_field(this.location, this);
  }

  update(delta) {
    // We actually shouldn't do anything here. All state is changed
    // based on updates from controller
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

  move_in_current_direction() {
    let deltaLocation = this.determine_delta_direction();
    let newLocation = this.world.next_field(this.location, deltaLocation);
    this.move(newLocation);
    this.world.claim_field(newLocation, this);
  }

  change_direction(direction) {
    this.direction = direction;
  }

  determine_delta_direction() {
    let deltaDirection = { dx: 0, dy: 0 };
    switch (this.direction) {
      case 'down': deltaDirection.dy = +1; break;
      case 'up': deltaDirection.dy = -1; break;
      case 'left': deltaDirection.dx = -1; break;
      case 'right': deltaDirection.dx = +1; break;
    }
    return deltaDirection;
  }
  
}

module.exports = Player;