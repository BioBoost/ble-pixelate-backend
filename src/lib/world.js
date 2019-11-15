class World {

  constructor({width = 96, height = 64} = {}) {
    this.width = width;
    this.height = height;
  }

  init() {
    this.playfield = Array(this.width).fill(null).map(f => Array(this.height).fill(null));
  }

  render(display) {
    // this renders the playfield on the display
    // If field is not owned by player, we draw nothing
    // If owned we draw colored pixel at that location
  }

  update(delta) {
    // We need to do anything here ?
  }
  
  claim_field(location, player) {
    this.playfield[location.x][location.y] = player;
  }

}

module.exports = World;