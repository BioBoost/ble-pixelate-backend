class PixelEngine {

  static TICK_RATE = 20;
  static REFRESH_RATE = 120;

  constructor(display, { debug = false } = {}) {
    this.display = display;
    this.clear_models();
    this.debug = debug;
  }

  // Order of registration determines order of rendering
  register_model(model) {
    this.models.push(model);
  }

  clear_models() {
    this.models = [];
  }

  init() {
    this.kill();
    this.models.forEach(model => model.init());
    this.start_render();
    this.start_update();
  } 

  start_update() {
    // Runs at constant tick rate
    let start = process.hrtime.bigint();
    this.updateInterval = setInterval(() => {
      let end = process.hrtime.bigint();
      let delta = this.calculate_delta_ms(start, end);
      start = end;
      if (this.debug) console.log(`Tick: ${delta}ms`);

      this.models.forEach(model => model.update(delta));
    }, PixelEngine.TICK_RATE);
  }

  start_render() {
    // Runs as fast as the display allows us
    this.renderInterval = setInterval(() => {
      let start = process.hrtime.bigint();
      this.display.clear();
      this.models.forEach(model => model.render(this.display));
      this.display.render();
      let end = process.hrtime.bigint();
      const renderTime = this.calculate_delta_ms(start, end);
      if (this.debug) console.log(`Rendering took ${renderTime}ms.`);
    }, PixelEngine.REFRESH_RATE);
  }

  kill() {
    if (this.updateInterval) clearInterval(this.updateInterval);
    if (this.renderInterval) clearInterval(this.renderInterval);
  }

  ///////////// Internal methods
  calculate_delta_ms(start, end) {
    const NS_PER_MS = 1e6;
    return (Number)(end - start) / NS_PER_MS;
  }

}

module.exports = PixelEngine;