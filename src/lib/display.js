const { createCanvas, loadImage } = require('canvas')
const fs = require('fs');

class Display {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.canvas = createCanvas(width, height);
    this.context = this.canvas.getContext('2d');
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  pixel(x, y, color) {
    this.context.fillStyle = `rgb(250, 0, 0)`;
    this.context.fillRect(x, y, 1, 1);
  }
  
  render() {
    const out = fs.createWriteStream(__dirname + '/test.png');
    this.canvas.createPNGStream().pipe(out);
    out.on('finish', () => console.log('The PNG file was created.'));
  }
}

module.exports = Display;