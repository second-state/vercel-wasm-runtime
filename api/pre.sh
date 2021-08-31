#!/bin/bash

# get wasmedge & wasmedgec
curl -sSfL https://github.com/WasmEdge/WasmEdge/releases/download/0.8.2-rc.2/WasmEdge-0.8.2-rc.2-manylinux2014_x86_64.tar.gz -o ./WasmEdge.tar.gz
tar --strip-components 2 -xzvf WasmEdge.tar.gz WasmEdge-0.8.2-rc.2-Linux/bin
rm WasmEdge.tar.gz

# compile all .wasm to .so
for file in *.wasm; do
    [ -f "$file" ] || continue
    ./wasmedgec --generic-binary "$file" "${file/.wasm/.so}"
    rm "$file"
done

# clean
rm wasmedgec