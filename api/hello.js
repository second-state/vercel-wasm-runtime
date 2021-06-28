const fs = require('fs');
const { spawn } = require('child_process');
const buffer = require('buffer');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/octet-stream');

  const wasmedge = spawn(path.join(__dirname, 'WasmEdge-0.8.1-Linux/bin/wasmedge'), ['--dir', `/:${__dirname}/api`, path.join(__dirname, 'wasi.wasm')]);

  wasmedge.stdout.on('data', (data) => {
    let filePath = new String(data);
    res.send(fs.readFileSync(path.join(__dirname, filePath.trim())));
  });

  let l = fs.readFileSync(path.join(__dirname, 'cowboy.png'));
  wasmedge.stdin.write(l);
  wasmedge.stdin.end('');
}

