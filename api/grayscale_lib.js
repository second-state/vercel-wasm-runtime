let vm;

/**
* @param {Uint8Array} img_buf
* @returns {Uint8Array}
*/
module.exports.grayscale = function(img_buf) {
    if (Buffer.isBuffer(img_buf) && img_buf.byteLength < Buffer.poolSize) img_buf = new Uint8Array(img_buf.buffer.slice(img_buf.byteOffset, img_buf.byteOffset + img_buf.byteLength));
    let b = vm.RunUint8Array('grayscale', img_buf);
    return b.byteLength <  Buffer.poolSize ? new Uint8Array(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)) : b;
};

const path = require('path').join(__dirname, 'grayscale_lib_bg.wasm');
const ssvm = require('ssvm');
vm = new ssvm.VM(path, { args:process.argv, env:process.env, preopens:{'/': __dirname} });

