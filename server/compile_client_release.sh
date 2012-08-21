#!/bin/bash

rm -rf release/
mkdir release

node r.js -o compile_client_release.js
