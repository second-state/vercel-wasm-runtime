const fs = require('fs');
const { spawn } = require('child_process');
const buffer = require('buffer');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('content-type', 'text/plain');

  const wasmedge = spawn(path.join(__dirname, 'WasmEdge-0.8.1-Linux/bin/wasmedge'), ['--dir', `/:${__dirname}`, path.join(__dirname, 'wasi.wasm')]);

  let b = [];
  wasmedge.stdout.on('data', (data) => {
    b.push(data);
  });

  wasmedge.stderr.on('data', (data) => {
    b.push(data);
  });

  wasmedge.on('close', (code) => {
    // res.write(fs.readFileSync(path.join(__dirname, 'r.png')));
    res.write(b.join(''));
    res.write('<>-----');
  });

  setTimeout(() => {
    res.send('...');
  }, 5000);

  let l = fs.readFileSync(path.join(__dirname, 'cowboy.png'));
  wasmedge.stdin.write(l);
  wasmedge.stdin.end('');

  // res.setHeader('Content-Type', 'application/octet-stream');
}

