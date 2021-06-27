#!/bin/bash

curl -L https://github.com/WasmEdge/WasmEdge/releases/download/0.8.1/WasmEdge-0.8.1-manylinux1_x86_64.tar.gz -o ./WasmEdge-0.8.1-manylinux1_x86_64.tar.gz
tar xzvf WasmEdge-0.8.1-manylinux1_x86_64.tar.gz WasmEdge-0.8.1-Linux/bin/wasmedge
