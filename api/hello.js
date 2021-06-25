const fs = require('fs')
const { join } = require('path');

module.exports = (req, res) => {
  res.setHeader('content-type', 'text/plain')
  let x = fs.existsSync(join(__dirname, 'libLLVM-10.so.1'))
  res.send(`${x}`)
}
