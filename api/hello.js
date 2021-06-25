const fs = require('fs')
module.exports = (req, res) => {
  res.setHeader('content-type', 'text/plain')
  res.send(fs.existsSync('./libLLVM-10.so.1'))
}
