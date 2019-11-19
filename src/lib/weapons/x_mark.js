class XMark {
    static SIZE = 8;

    constructor() {
      this.shotsLeft = 3;
    }
  
    activate(world, player) {
        if (this.shotsLeft <= 0) return;

        for (let i = 0; i < XMark.SIZE+1; i++) {
            let claimLocation = world.next_field(player.location, {
                dx: -XMark.SIZE/2+i,
                dy: -XMark.SIZE/2+i
            });
            world.claim_field(claimLocation, player);

            claimLocation = world.next_field(player.location, {
                dx: XMark.SIZE/2-i,
                dy: -XMark.SIZE/2+i
            });
            world.claim_field(claimLocation, player);
        }
        this.shotsLeft--;
    }
}

module.exports = XMark;