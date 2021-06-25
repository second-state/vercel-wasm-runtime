const BuiltTime = require('./built-time')
module.exports = (req, res) => {
  res.setHeader('content-type', 'text/plain')
  res.send(`
    This Serverless Function was built at ${new Date(BuiltTime)}.
    The current time is ${new Date()}
  `)
}
