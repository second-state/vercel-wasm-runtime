const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

module.exports = (req, res) => {
  const wasmedge = spawn(path.join(__dirname, 'wasmedge'), [path.join(__dirname, 'grayscale.wasm')]);
  console.log(os.tmpdir());

  let d = [];
  wasmedge.stdout.on('data', (data) => {
    d.push(data);
  });

  wasmedge.on('close', (code) => {
    let buf = Buffer.concat(d);

    res.setHeader('Content-Type', req.headers['image-type']);
    res.send(buf);
  });

  wasmedge.stdin.write(req.body);
  wasmedge.stdin.end('');
}

