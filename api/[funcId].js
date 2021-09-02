const fs = require('fs');
const os = require('os');
const { spawn } = require('child_process');
const path = require('path');
const axios = require('axios');
const randomWords = require('random-words');

module.exports = async (req, res) => {
  const funcId = req.query.funcId;
  const wasmPath = os.tmpdir() + path.sep + funcId + '.wasm';

  try {
    await getWasmFile(wasmPath, funcId);
    let query = req.query.query;
    if (query) {
      query = encodeURIComponent(query);
    } else {
      query = randomWords();
    }
    const unsplashImageStream = await getUnsplashImage(query);
    if (unsplashImageStream) {
      const buf = await runVm(wasmPath, unsplashImageStream);
      res.setHeader('Content-Type', 'image/png');
      res.send(buf);
    } else {
      res.status(404).end(`Not found any image for query "${req.query.query}"`);
    }
  } catch(err) {
    console.error(err);
    res.status(500).end('Error occured');
  }

};

async function getWasmFile(wasmPath, funcId) {
  return new Promise((resolve, reject) => {
    fs.access(wasmPath, fs.constants.F_OK, (err) => {
      if (err) {
        axios({
          method: 'get',
          headers: {Authorization: process.env.REACTOR_APP_AUTH_TOKEN},
          url: `${process.env.REACTOR_API_PREFIX}/api/_funcs/${funcId}`,
          responseType: 'stream'
        }).then((wasmResp) => {
          wasmResp.data.on('end', () => {
            resolve();
          });

          wasmResp.data.pipe(fs.createWriteStream(wasmPath));
        }).catch(() => {
          reject();
        });
      } else {
        resolve();
      }
    });
  });
}

async function getUnsplashImage(query) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      headers: {Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`},
      url: 'https://api.unsplash.com/search/photos?page=1&per_page=1&query=' + query
    }).then((resp) => {
      const data = resp.data;
      if (data && data.results && data.results.length > 0) {
        axios({
          method: 'get',
          url: data.results[0].urls.small,
          responseType: 'stream'
        }).then((imgResp) => {
          resolve(imgResp.data);
        }).catch((err) => {
          reject();
        });
      } else {
        resolve();
      }
    });
  });
}

async function runVm(wasmPath, unsplashImageStream) {
  return new Promise((resolve, reject) => {
    const wasmedge = spawn(path.join(__dirname, 'wasmedge'), [wasmPath]);

    let d = [];
    wasmedge.stdout.on('data', (data) => {
      d.push(data);
    });

    wasmedge.on('close', (code) => {
      let buf = Buffer.concat(d);
      resolve(buf);
    });

    unsplashImageStream.pipe(wasmedge.stdin);
  });
}
