const axios = require('axios');
const fs = require('fs');

class MemeTvRenderer {

  constructor(uri) {
    this.uri = uri;
  }

  render(canvas) {
    const stream = canvas.createPNGStream();
    let bufferParts = [];
    stream.on('data', chunk => {
      bufferParts.push(chunk);
    });
    stream.on('end', () => {
      let buffer = Buffer.concat(bufferParts);
      axios({
        method: 'post',
        url: this.uri,
        data: buffer,
        headers: {
          'Content-Type': 'image/png',
          'Content-Length': buffer.length,
        }
      })
      .then(function (response) {
        if (response.status != 200) {
          console.log(`Got ${response.status} HTTP response status`);
        }
      })
      .catch(function (error) {
        console.log("Failed to upload image to meme tv");
      });
    })
  }

}

module.exports = MemeTvRenderer;