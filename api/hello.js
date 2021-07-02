const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

module.exports = (req, res) => {
  const wasmedge = spawn(path.join(__dirname, 'WasmEdge-0.8.1-Linux/bin/wasmedge'), [path.join(__dirname, 'wasi.so')]);

  let d = [];
  wasmedge.stdout.on('data', (data) => {
    d.push(data);
  });

  wasmedge.on('close', (code) => {
    let r = d.join('');
    let format = r.substring(0, 3);
    let buf = Buffer.from(r.substring(3), 'hex');

    res.setHeader('Content-Type', `image/${format}`);
    res.send(buf);
  });

  wasmedge.stdin.write(req.body);
  wasmedge.stdin.end('');
}

