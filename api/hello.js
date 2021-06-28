const fs = require('fs');
const { spawn } = require('child_process');
const buffer = require('buffer');
const path = require('path');

module.exports = (req, res) => {
  // res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Type', 'text/plain');

  try {
    const wasmedge = spawn(path.join(__dirname, 'WasmEdge-0.8.1-Linux/bin/wasmedge'), ['--dir', `/:${__dirname}`, path.join(__dirname, 'wasi.wasm')]);

    let c = 0;

    wasmedge.stdout.on('data', (data) => {
      // let filePath = new String(data);
      // res.send(fs.readFileSync(path.join(__dirname, filePath.trim())));
      res.write(__dirname);
      if (c == 0) {
        res.send(data);
        c = c + 1;
      }
    });

    wasmedge.stderr.on('data', (data) => {
      // let filePath = new String(data);
      // res.send(fs.readFileSync(path.join(__dirname, filePath.trim())));
      res.write(__dirname);
      if (c == 0) {
        res.send(data);
        c = c + 1;
      }
    });

    let l = fs.readFileSync(path.join(__dirname, 'cowboy.png'));
    wasmedge.stdin.write(l);
    wasmedge.stdin.end('');
  } catch (e) {
    // res.send(e);
  }

  res.write(__dirname);
}

