class Laser {

  constructor() {
    this.shotsLeft = 3;
  }

  activate(world, player) {
    if (this.shotsLeft <= 0) return;

    let deltaLocation = player.determine_delta_direction();

    let laserLength = (player.direction == 'down' || player.direction == 'up' ? world.height : world.width);
    let currentField = Object.assign({}, player.location);
    for (let i = 0; i < laserLength; i++) {
      let claimLocation = world.next_field(currentField, deltaLocation);
      world.claim_field(claimLocation, player);
      currentField = claimLocation;
    }
    this.shotsLeft--;
  }
}

module.exports = Laser;