const fs = require('fs');
const { spawn } = require('child_process');
const buffer = require('buffer');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('content-type', 'text/plain');

  const wasmedge = spawn(path.join(__dirname, 'WasmEdge-0.8.1-Linux/bin/wasmedge'), ['--dir', `/:${__dirname}`, path.join(__dirname, 'wasi.wasm')]);

  wasmedge.stdout.on('data', (data) => {
    let filePath = new String(data);
    res.write(fs.readFileSync(path.join(__dirname, filePath.trim())));
  });

  wasmedge.stderr.on('data', (data) => {
    res.write(`stderr: ${data}`);
  });

  wasmedge.on('close', (code) => {
    res.end('');
  });

  let l = fs.readFileSync(path.join(__dirname, 'cowboy.png'));
  wasmedge.stdin.write(l);
  wasmedge.stdin.end('');

  res.setHeader('Content-Type', 'application/octet-stream');
  res.write('');
}

