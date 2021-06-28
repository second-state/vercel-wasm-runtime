const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('content-type', 'text/plain');

  const wasmedge = spawn(path.join(__dirname, 'WasmEdge-0.8.1-Linux/bin/wasmedge'), [path.join(__dirname, 'wasi.wasm')]);

  let d = [];

  wasmedge.stdout.on('data', (data) => {
    d.push(data);
  });

  wasmedge.stderr.on('data', (data) => {
    res.end(`stderr: ${data}`);
  });

  wasmedge.on('close', (code) => {
    d.push(`child process exited with code ${code}`);
    res.end(d.join(''));
  });

  let l = fs.readFileSync(path.join(__dirname, 'cowboy.png'));
  wasmedge.stdin.write(l);
  wasmedge.stdin.end('');

  res.write('');
}

