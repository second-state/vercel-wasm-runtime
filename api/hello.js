const fs = require('fs')
const { join } = require('path')
const { grayscale } = require('./grayscale_lib.js');

module.exports = (req, res) => {
  res.setHeader('content-type', 'text/plain')

  var img_src = fs.readFileSync(join(__dirname, 'cowboy.png'));
  // fs.writeFileSync(join(__dirname, 'gray.png'), grayscale(img_src));

  let x = fs.existsSync(join(__dirname, 'gray.png'))
  res.send(`$(__dirname} ${x}`)
}
