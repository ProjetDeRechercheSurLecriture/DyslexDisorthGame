#!/bin/bash

THISROOT=$HOME/git/DyslexDisorthGame/client
OPRIMEROOT=$HOME/git/OPrime/OPrime-HTML5

echo "Building OPrime in $OPRIMEROOT"
cd $OPRIMEROOT
./scripts/build_oprime_debug.sh
cd $THISROOT
rm -rf app/libs/oprime
cp -r $OPRIMEROOT/build app/libs/oprime 

echo "Cleaning up from previous build in $THISROOT"
rm -rf app/modules/tcpp/libs
rm -rf app/modules/tcpp/fonts
mkdir app/modules/tcpp/libs
rm -rf app/modules/tcpp/release

echo "Copying over the libs to do the build"
cp -r app/libs/angular app/modules/tcpp/libs/angular
cp -r app/libs/font_awesome app/modules/tcpp/libs/font_awesome
cp -r app/libs/angular-ui app/modules/tcpp/libs/angular-ui
cp app/libs/require.js app/modules/tcpp/libs/ 
cp app/libs/underscore.js app/modules/tcpp/libs/ 

echo "Copying over fonts"
cp -r app/fonts app/modules/tcpp/fonts

echo "Copying over libs from other repositories"
rm -rf app/modules/tcpp/libs/oprime
cp -r $HOME/git/OPrime/OPrime-HTML5/build app/modules/tcpp/libs/oprime 

echo "Building TCPP"
node_modules/requirejs/bin/r.js -o  app/modules/tcpp/js/tcpp_build_config.js
node_modules/requirejs/bin/r.js -o cssIn=app/modules/tcpp/tcpp.css out=app/modules/tcpp/release/tcpp.css
cp app/modules/tcpp/release/tcpp.css app/modules/tcpp/tcpp.min.css
cp app/modules/tcpp/release/tcpp.js app/modules/tcpp/tcpp.min.js

date; 