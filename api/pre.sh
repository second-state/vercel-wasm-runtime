#!/bin/bash

# get wasmedge & wasmedgec
curl -sSfL https://github.com/WasmEdge/WasmEdge/releases/download/0.8.1/WasmEdge-0.8.1-manylinux2014_x86_64.tar.gz -o ./WasmEdge-0.8.1-manylinux2014_x86_64.tar.gz
tar xzvf WasmEdge-0.8.1-manylinux2014_x86_64.tar.gz WasmEdge-0.8.1-Linux/bin
rm WasmEdge-0.8.1-manylinux2014_x86_64.tar.gz

# install rust
export HOME=/root
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env

rustup default 1.50.0
rustup target add wasm32-wasi

cd functions/image_grayscale
cargo build --target wasm32-wasi --release
mv target/wasm32-wasi/release/grayscale.wasm ../..
cd ../..
WasmEdge-0.8.1-Linux/bin/wasmedgec grayscale.wasm grayscale.so

# clean
rm grayscale.wasm
rm WasmEdge-0.8.1-Linux/bin/wasmedgec