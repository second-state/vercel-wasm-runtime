const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

module.exports = (req, res) => {
  const wasmedge = spawn(path.join(__dirname, 'wasmedge'), [path.join(__dirname, 'grayscale.so')]);

  let d = [];
  wasmedge.stdout.on('data', (data) => {
    d.push(data);
  });

  wasmedge.on('close', (code) => {
    let r = Buffer.concat(d);
    let format = r.subarray(0, 3).toString();
    let buf = r.subarray(3);

    res.setHeader('Content-Type', `image/${format}`);
    res.send(buf);
  });

  wasmedge.stdin.write(req.body);
  wasmedge.stdin.end('');
}

