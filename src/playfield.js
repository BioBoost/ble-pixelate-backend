const { createCanvas, loadImage } = require('canvas')
const fs = require('fs');

class Playfield {
  static WIDTH = 96;
  static HEIGH = 64;

  constructor() {
    this.canvas = createCanvas(Playfield.WIDTH, Playfield.HEIGH);
    this.context = this.canvas.getContext('2d');
    this.reset();
  }

  reset() {
    this.context.clearRect(0, 0, Playfield.WIDTH, Playfield.HEIGH);
  }

  fill_pixel(x, y, color) {
    this.context.fillStyle = `rgb(255, 139, 0)`;
    this.context.fillRect(x, y, 1, 1);
  }
  

  render() {
    const out = fs.createWriteStream(__dirname + '/test.png');
    this.canvas.createPNGStream().pipe(out);
    out.on('finish', () => console.log('The PNG file was created.'));
  }
}

module.exports = Playfield;