#!/bin/bash

curl -L https://github.com/second-state/vercel-wasm-runtime/releases/download/v0.1/musl-linux-lib.tar.gz -o ./musl-linux-lib.tar.gz

tar xzvf musl-linux-lib.tar.gz

rm -f musl-linux-lib.tar.gz

ln -s ld-musl-x86_64.so.1 libm.so.6
ln -s ld-musl-x86_64.so.1 libpthread.so.0
ln -s ld-musl-x86_64.so.1 libc.so.6
