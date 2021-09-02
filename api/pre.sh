#!/bin/bash

# get wasmedge & wasmedgec
curl -sSfL https://github.com/WasmEdge/WasmEdge/releases/download/0.8.2/WasmEdge-0.8.2-manylinux2014_x86_64.tar.gz -o ./WasmEdge.tar.gz
tar --strip-components 2 -xzvf WasmEdge.tar.gz WasmEdge-0.8.2-Linux/bin/wasmedge
rm WasmEdge.tar.gz
