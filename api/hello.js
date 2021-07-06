const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

module.exports = (req, res) => {
  const wasmedge = spawn(
    path.join(__dirname, 'wasmedge-tensorflow-lite'),
    [path.join(__dirname, 'classify.so')],
    {env: {'LD_LIBRARY_PATH': __dirname}}
  );

  let d = [];
  wasmedge.stdout.on('data', (data) => {
    d.push(data);
  });

  wasmedge.on('close', (code) => {
    res.setHeader('Content-Type', `text/plain`);
    res.send(d.join(''));
  });

  wasmedge.stdin.write(req.body);
  wasmedge.stdin.end('');
}

