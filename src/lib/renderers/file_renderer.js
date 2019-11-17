const fs = require('fs');


class FileRenderer {

  constructor(filename) {
    this.filename = filename;
  }

  render(canvas) {
    const out = fs.createWriteStream(this.filename);
    canvas.createPNGStream().pipe(out);
  }

}

module.exports = FileRenderer;