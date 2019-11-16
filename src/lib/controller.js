class Controller {

  constructor(id, player) {
    this.id = id;
    this.player = player;
    this.actions = [];
  }

  queue_action(action) {
    this.actions.unshift(action);
  }

  init() {
  }

  update() {
    let action = this.actions.pop();

    switch (action) {
      case undefined:
        this.player.move_in_current_direction();
        break;
      case 'U':
        this.player.go_up();
        break;
      case 'D':
        this.player.go_down();
        break;
      case 'L':
        this.player.go_left();
        break;
      case 'R':
        this.player.go_right();
        break;
      case 'X':
        console.log('X marks the spot');
        break;
      case 'A':
        console.log('Laser time');
        break;
      case 'B':
        console.log('Player goes boom');
        break;
      case '0':
        this.player.stop();
        break;
    }
  }

  render() {
    // EMPTY ! Controller cannot be rendered
  }

}

module.exports = Controller;