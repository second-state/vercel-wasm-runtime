#!/bin/bash

# get wasmedge & wasmedgec
curl -L https://github.com/second-state/WasmEdge-tensorflow-tools/releases/download/0.8.0/WasmEdge-tensorflow-tools-0.8.0-manylinux2014_x86_64.tar.gz -o ./WasmEdge-tensorflow-tools-0.8.0-manylinux2014_x86_64.tar.gz
tar xzvf WasmEdge-tensorflow-tools-0.8.0-manylinux2014_x86_64.tar.gz wasmedge-tensorflow-lite
tar xzvf WasmEdge-tensorflow-tools-0.8.0-manylinux2014_x86_64.tar.gz wasmedgec-tensorflow
rm WasmEdge-tensorflow-tools-0.8.0-manylinux2014_x86_64.tar.gz

curl -L https://github.com/second-state/WasmEdge-tensorflow-deps/releases/download/0.8.0/WasmEdge-tensorflow-deps-TFLite-0.8.0-manylinux2014_x86_64.tar.gz -o ./WasmEdge-tensorflow-deps-TFLite-0.8.0-manylinux2014_x86_64.tar.gz
tar xzvf WasmEdge-tensorflow-deps-TFLite-0.8.0-manylinux2014_x86_64.tar.gz
rm WasmEdge-tensorflow-deps-TFLite-0.8.0-manylinux2014_x86_64.tar.gz

# install rust
export HOME=/root
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env

rustup default 1.50.0
rustup target add wasm32-wasi

cd functions/image-classification
cargo build --target wasm32-wasi --release
mv target/wasm32-wasi/release/classify.wasm ../..
cd ../..
./wasmedgec-tensorflow classify.wasm classify.so

# clean
rm classify.wasm
rm wasmedgec-tensorflow