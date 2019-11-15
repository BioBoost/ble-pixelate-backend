class PixelEngine {

  static TICK_RATE = 150;
  static REFRESH_RATE = 1000;

  constructor(display) {
    this.display = display;
    this.models = [];
  }

  // Order of registration determines order of rendering
  register_model(model) {
    this.models.push(model);
  }

  init() {
    this.models.forEach(model => model.init());
    this.start_update();
    this.start_render();
  } 

  start_update() {
    // Runs at constant tick rate
    const NS_PER_SEC = 1e9;
    let refTime = process.hrtime();
    this.updateInterval = setInterval(() => {
      refTime = process.hrtime(refTime);
      let delta = refTime[0] * NS_PER_SEC + refTime[1];

      this.models.forEach(model => model.update(delta));
      console.log(`Tick: ${delta}ms`);
    }, PixelEngine.TICK_RATE);
  }

  start_render() {
    // Runs as fast as the display allows us
    this.renderInterval = setInterval(() => {
      this.display.clear();
      this.models.forEach(model => model.render(this.display));
      console.log(`Rendering`);
      this.display.render();
    }, PixelEngine.REFRESH_RATE);
  }

  kill() {
    if (this.updateInterval) clearInterval(this.updateInterval);
    if (this.renderInterval) clearInterval(this.renderInterval);
  }
}

module.exports = PixelEngine;