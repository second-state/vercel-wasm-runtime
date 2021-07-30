#!/bin/bash

# get wasmedge & wasmedgec
curl -L https://github.com/second-state/WasmEdge-tensorflow-tools/releases/download/0.8.2-rc2/WasmEdge-tensorflow-tools-0.8.2-rc2-manylinux2014_x86_64.tar.gz -o ./WasmEdge-tensorflow-tools-0.8.2-rc2-manylinux2014_x86_64.tar.gz
tar xzvf WasmEdge-tensorflow-tools-0.8.2-rc2-manylinux2014_x86_64.tar.gz wasmedge-tensorflow-lite
tar xzvf WasmEdge-tensorflow-tools-0.8.2-rc2-manylinux2014_x86_64.tar.gz wasmedgec-tensorflow
rm WasmEdge-tensorflow-tools-0.8.2-rc2-manylinux2014_x86_64.tar.gz

curl -L https://github.com/second-state/WasmEdge-tensorflow-deps/releases/download/0.8.0/WasmEdge-tensorflow-deps-TFLite-0.8.0-manylinux2014_x86_64.tar.gz -o ./WasmEdge-tensorflow-deps-TFLite-0.8.0-manylinux2014_x86_64.tar.gz
tar xzvf WasmEdge-tensorflow-deps-TFLite-0.8.0-manylinux2014_x86_64.tar.gz
rm WasmEdge-tensorflow-deps-TFLite-0.8.0-manylinux2014_x86_64.tar.gz

# compile all .wasm to .so
for file in *.wasm; do
    [ -f "$file" ] || continue
    ./wasmedgec-tensorflow --generic-binary "$file" "${file/.wasm/.so}"
    rm "$file"
done

# clean
rm wasmedgec-tensorflow