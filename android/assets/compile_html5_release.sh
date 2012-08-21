#!/bin/bash

rm -rf release
bash ../../server/compile_client_release.sh
cp -r ../../server/release release
