var path = require("path");

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    '__dirname': __dirname,
    'process.cwd()': process.cwd(),
    './': path.resolve("./")
  });
}
