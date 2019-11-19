class Bomb {
    static RADIUS = 8;

    constructor() {
      this.shotsLeft = 3;
    }
  
    activate(world, player) {
        if (this.shotsLeft <= 0) return;

        // Crude solution for circle, no more time
        for (let dx = Bomb.RADIUS; dx >= -Bomb.RADIUS; dx--) {
            for (let dy = Bomb.RADIUS; dy >= -Bomb.RADIUS; dy--) {
                if (dx*dx + dy*dy <= Bomb.RADIUS*Bomb.RADIUS) {
                    let claimLocation = world.next_field(player.location, {
                        dx: dx,
                        dy: dy
                    });
                    world.claim_field(claimLocation, player);
                }
            }
        }
        this.shotsLeft--;
    }
}

module.exports = Bomb;