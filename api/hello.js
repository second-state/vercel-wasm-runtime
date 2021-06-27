const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('content-type', 'text/plain');

  const ls = spawn(path.join(__dirname, 'WasmEdge-0.8.1-Linux/bin/wasmedge'));

  let d = [];

  ls.stdout.on('data', (data) => {
    d.push(data);
  });

  ls.stderr.on('data', (data) => {
    res.send(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    d.push(`child process exited with code ${code}`);
    res.send(d.join(''));
  });
}
