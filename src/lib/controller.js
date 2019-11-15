class Controller {

  constructor(id, player) {
    this.id = id;
    this.player = player;
  }

  queue_action(action) {
    // this comes from the game
    // this.actions.push(action);
  }

  init() {
  }

  update() {
    // let size = this.actions.length;
    // for (size) : action = pop
    // if (.....) 
    //   player.go_up
    //   player.shoot

    // switch (action) {
    //   case 'D': player.go_down(); break;
    //   case 'U': player.go_up(); break;
    //   case 'L': player.go_left(); break;
    //   case 'R': player.go_right(); break;
    //   // case 'B': game.explosion(update.id); break;
    //   // case 'A': game.laser(update.id); break;
    //   // case 'X': game.mark_x(update.id); break;
    // }
  }

  render() {
    // EMPTY ! Controller cannot be rendered
  }

}

module.exports = Controller;