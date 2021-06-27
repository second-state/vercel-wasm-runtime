#!/bin/bash

curl -L https://github.com/second-state/vercel-wasm-runtime/releases/download/v0.1/musl-linux-lib.tar.gz -o ./musl-linux-lib.tar.gz

tar xzvf musl-linux-lib.tar.gz

rm -f musl-linux-lib.tar.gz

ln -s ld-musl-x86_64.so.1 libm.so.6
ln -s ld-musl-x86_64.so.1 libpthread.so.0
ln -s ld-musl-x86_64.so.1 libc.so.6

mkdir t
cd t
wget https://github.com/WasmEdge/WasmEdge/releases/download/0.8.1/WasmEdge-0.8.1-manylinux1_x86_64.tar.gz
tar xzvf WasmEdge-0.8.1-manylinux1_x86_64.tar.gz
./WasmEdge-0.8.1-Linux/bin/wasmedge
