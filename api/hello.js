const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/octet-stream');

  const wasmedge = spawn(path.join(__dirname, 'WasmEdge-0.8.1-Linux/bin/wasmedge'), [path.join(__dirname, 'wasi.wasm')]);

  let b = [];
  wasmedge.stdout.on('data', (data) => {
    b.push(data);
  });

  wasmedge.stderr.on('data', (data) => {
  });

  wasmedge.on('close', (code) => {
    let buf = Buffer.from(b.join(''), 'hex');
    res.send(buf);
  });

  let l = fs.readFileSync(path.join(__dirname, 'cowboy.png'));
  wasmedge.stdin.write(l);
  wasmedge.stdin.end('');
}

