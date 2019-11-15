class World {

  constructor({width = 96, height = 64} = {}) {
    this.width = width;
    this.height = height;
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
          display.pixel(x, y, "#00FF00");
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

}

module.exports = World;