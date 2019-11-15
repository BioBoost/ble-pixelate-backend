class World {

  constructor({enableBoundaries = true, width = 96, height = 64} = {}) {
    this.width = width;
    this.height = height;
    this.enableBoundaries = enableBoundaries;
  }

  init() {
    this.playfield = Array(this.width).fill(null).map(field => Array(this.height).fill(null));
  }

  render(display) {
    // This renders the playfield on the display
    // If field is not owned by player, we draw nothing
    // If owned we draw colored pixel at that location
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let owner = this.playfield[x][y];
        if (owner) {
          display.pixel(x, y, "#FF0000");
        }
      }
    }
  }

  update(delta) {
    // We need to do anything here ?
  }
  
  claim_field(location, player) {
    this.playfield[location.x][location.y] = player;
  }

  next_field(currentLocation, {deltaX = 0, deltaY = 0} = {}) {
    console.log(`Current: ${JSON.stringify(currentLocation)}`);
    if (this.enableBoundaries) {
      console.log(`Enabling boundaries ${deltaX}, ${deltaY}`);
      return {
        x: Math.max(0, Math.min(currentLocation.x + deltaX, this.width-1)),
        y: Math.max(0, Math.min(currentLocation.y + deltaY, this.height-1))
      }
    } else {
      return {
        x: (currentLocation.x + deltaX) % this.width,
        y: (currentLocation.y + deltaY) % this.height
      }
    }
  }

}

module.exports = World;