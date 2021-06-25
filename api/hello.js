const fs = require('fs')
module.exports = (req, res) => {
  res.setHeader('content-type', 'text/plain')
  let x = fs.existsSync('./libLLVM-10.so.1')
  let x1 = fs.existsSync('../libLLVM-10.so.1')
  let x2 = fs.existsSync('../../libLLVM-10.so.1')
  res.send(`${x} ${x1} ${x2}`)
}
