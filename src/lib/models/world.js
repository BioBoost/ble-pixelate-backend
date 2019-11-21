class World {

  constructor({enableBoundaries = true, width = 96, height = 64, xOffset = 0, yOffset = 0} = {}) {
    this.width = width;
    this.height = height;
    this.enableBoundaries = enableBoundaries;
    this.xOffset = xOffset;
    this.yOffset = yOffset;

    console.log("Height = " + this.height);
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
          display.pixel(x+this.xOffset, y+this.yOffset, owner.claim_color());
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

  next_field(currentLocation, {dx = 0, dy = 0} = {}) {
    if (this.enableBoundaries) {
      return {
        x: Math.max(0, Math.min(currentLocation.x + dx, this.width-1)),
        y: Math.max(0, Math.min(currentLocation.y + dy, this.height-1))
      }
    } else {
      return {
        x: (currentLocation.x + dx) % this.width,
        y: (currentLocation.y + dy) % this.height
      }
    }
  }

  generate_spawn_locations(total, {distanceFromMid = 10} = {}) {
    // Spawn locations in a circle around mid
    let deltaAngle = (360 / total * Math.PI) / 180;
    let offset = Math.random();   // Randomize start locations each game

    let locations = Array(total).fill(null);
    for (let i = 0; i < locations.length; i++) {
      locations[i] = {
        x: this.width/2 + Math.floor(distanceFromMid * Math.cos(offset + i * deltaAngle)),
        y: this.height/2 + Math.floor(distanceFromMid * Math.sin(offset + i * deltaAngle))
      }
    }
    return locations;
  }

  determine_field_ownage() {
    let field_ownage = [];
    
    this.playfield.flat().forEach((field) => {
      if (field != null) {
        let player_field = field_ownage.filter(ownage => ownage.player === field);
        if (player_field.length > 0) {
          player_field[0].count++;
        } else {
          field_ownage.push( { player: field, count: 1});
        }
      }
    });
    return field_ownage;
  }

}

module.exports = World;