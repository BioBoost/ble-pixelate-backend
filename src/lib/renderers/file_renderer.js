const fs = require('fs');


class FileRenderer {

  constructor(filename) {
    this.filename = filename;
  }

  render(canvas) {
    const out = fs.createWriteStream(this.filename);
    canvas.createPNGStream().pipe(out);
    out.on('finish', () => console.log('The PNG file was created.'));
  }

}

module.exports = FileRenderer;