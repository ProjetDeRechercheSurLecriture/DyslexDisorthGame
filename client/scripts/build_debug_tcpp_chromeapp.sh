#!/bin/bash

echo "Clearing out the old chrome debug app"
rm -rf debug_chromeapp
mkdir debug_chromeapp
mkdir debug_chromeapp/js

echo "Building and combining sources to one file"
./scripts/build_tcpp_minified.sh
cp app/modules/tcpp/release/tcpp.js debug_chromeapp/js
cp app/modules/tcpp/release/tcpp.css debug_chromeapp

echo "Copying only the relevant files to the chrome debug app"
cp app/modules/tcpp/manifest.json debug_chromeapp
cp app/modules/tcpp/index.html debug_chromeapp
cp app/modules/tcpp/report.html debug_chromeapp
cp app/modules/tcpp/tcpp.html debug_chromeapp

echo "Copying assets"
cp -r app/modules/tcpp/image_stimuli debug_chromeapp
cp -r app/modules/tcpp/audio_stimuli debug_chromeapp
#cp -r app/modules/tcpp/partials debug_chromeapp

echo "Copying libraries"
mkdir debug_chromeapp/libs
cp -r app/libs/font_awesome debug_chromeapp/libs/font_awesome
cp app/libs/require.js debug_chromeapp/libs
cp -r app/fonts debug_chromeapp
cp -r app/modules/tcpp/images debug_chromeapp

echo "Removing temporary build directory"
rm -rf client/app/modules/tcpp/release