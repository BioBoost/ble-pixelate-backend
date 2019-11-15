const Display = require('./display');
const Player = require('./player');
const FileRenderer = require('./renderers/file_renderer');
const MemeTvRenderer = require('./renderers/meme_tv_renderer');
const World = require('./world');

const Engine = require('./pixel_engine');

class Game {

  constructor() {
    this.engine = new PixelEngine();

    // When set to go
    this.engine.init();
  }


}

module.exports = Game;