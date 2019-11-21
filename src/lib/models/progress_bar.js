class ProgressBar {

  static WIDTH = 96;

  constructor(maxValue, color) {
    this.maxValue = maxValue;
    this.color = color;
  }

  init() {
      this.currentProgress = 0;
  }

  update(delta) {
  }

  render(display) {
    let pixelWidth = Math.round(this.currentProgress * (this.maxValue / ProgressBar.WIDTH));
    display.line({ x: 0, y: 0 }, { x: pixelWidth, y: 0 }, this.color);
  }
}

module.exports = ProgressBar;