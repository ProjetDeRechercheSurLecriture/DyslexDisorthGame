#!/bin/bash
rm -rf release/
mkdir release

node r.js -o require_release.js
