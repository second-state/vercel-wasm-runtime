#!/bin/bash

# get wasmedge & wasmedgec
curl -sSfL https://github.com/WasmEdge/WasmEdge/releases/download/0.8.1/WasmEdge-0.8.1-manylinux2014_x86_64.tar.gz -o ./WasmEdge-0.8.1-manylinux2014_x86_64.tar.gz
tar xzvf WasmEdge-0.8.1-manylinux2014_x86_64.tar.gz WasmEdge-0.8.1-Linux/bin
rm WasmEdge-0.8.1-manylinux2014_x86_64.tar.gz

# compile all .wasm to .so
for file in *.wasm; do
    [ -f "$file" ] || continue
    WasmEdge-0.8.1-Linux/bin/wasmedgec "$file" "${file/.wasm/.so}"
    rm "$file"
done

# clean
rm WasmEdge-0.8.1-Linux/bin/wasmedgec