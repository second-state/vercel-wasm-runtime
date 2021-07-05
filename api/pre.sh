#!/bin/bash

curl -L https://github.com/second-state/WasmEdge-tensorflow-tools/releases/download/0.8.0/WasmEdge-tensorflow-tools-0.8.0-manylinux2014_x86_64.tar.gz -o ./WasmEdge-tensorflow-tools-0.8.0-manylinux2014_x86_64.tar.gz
tar xzvf WasmEdge-tensorflow-tools-0.8.0-manylinux2014_x86_64.tar.gz wasmedge-tensorflow-lite
rm WasmEdge-tensorflow-tools-0.8.0-manylinux2014_x86_64.tar.gz

curl -L https://github.com/second-state/WasmEdge-tensorflow-deps/releases/download/0.8.0/WasmEdge-tensorflow-deps-TFLite-0.8.0-manylinux2014_x86_64.tar.gz -o ./WasmEdge-tensorflow-deps-TFLite-0.8.0-manylinux2014_x86_64.tar.gz
tar xzvf WasmEdge-tensorflow-deps-TFLite-0.8.0-manylinux2014_x86_64.tar.gz
rm WasmEdge-tensorflow-deps-TFLite-0.8.0-manylinux2014_x86_64.tar.gz
