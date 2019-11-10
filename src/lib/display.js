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

  pixel(x, y, color="#00FF00") {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, 1, 1);
  }

  line(startLocation, endLocation, color="#00FF00") {
    this.context.translate(0.5, 0.5);   // Offset to fix 1px width line
    this.context.strokeStyle = color;
    this.context.lineWidth = 1;
    this.context.lineCap = 'square';
    this.context.beginPath();
    this.context.moveTo(startLocation.x, startLocation.y);
    this.context.lineTo(endLocation.x, endLocation.y);
    this.context.stroke();
    this.context.setTransform(1, 0, 0, 1, 0, 0);    // Reset offset
  }
  
  render() {
    const out = fs.createWriteStream(__dirname + '/test.png');
    this.canvas.createPNGStream().pipe(out);
    out.on('finish', () => console.log('The PNG file was created.'));
  }
}

module.exports = Display;