var fs = require("fs");

export default (req, res) => {
  res.statusCode = 200;
  let e = fs.existsSync('./libLLVM-10.so.1');
  res.json({result: e});
}
