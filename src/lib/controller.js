class Controller {

  constructor(id, player) {
    this.id = id;
    this.player = player;
    this.actions = [];
    this.previousAction = '0';
  }

  queue_action(action) {
    this.actions.unshift(action);
  }

  init() {
  }

  update(delta) {
    let action = this.actions.pop();

    if (action === undefined && ['U', 'D', 'L', 'R'].includes(this.previousAction)) {
      action = this.previousAction;
    }

    switch (action) {
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
        this.player.x_mark();
        break;
      case 'A':
        this.player.shoot_laser();
        break;
      case 'B':
        this.player.explode();
        break;
    }

    this.previousAction = action;
  }

  render() {
    // EMPTY ! Controller cannot be rendered
  }

}

module.exports = Controller;