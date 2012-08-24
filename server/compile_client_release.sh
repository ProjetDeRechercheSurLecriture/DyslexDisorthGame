#!/bin/bash

rm -rf release/
mkdir release

echo ""
echo ""
echo "Put the source into production mode"
sed 's/Utils.debugMode *= *true/Utils.debugMode = false/' public/libs/Utils.js  > output
mv output public/libs/Utils.js
sed 's/Utils.productionMode *= *false/Utils.productionMode = true/' public/libs/Utils.js  > output
mv output public/libs/Utils.js

echo ""
echo ""
echo "Compile handlebar templates"
bash compile_handlebars.sh

echo ""
echo ""
echo "Minify the client code"
node r.js -o client_release_config.js

echo ""
echo ""
echo "Minify the client css"
node r.js -o cssIn=public/dashboard.css out=release/dashboard.css

echo ""
echo ""
echo "Minify the sails code into another release, and bring just its main file to this app"
node r.js -o client_sails_release_config.js
cp releasesails/main_sails.js release/main_sails.js
rm -rf releasesails

echo ""
echo ""
echo "Removing libraries that dont need to be in release to reduce zip size"
rm -rf release/libs

echo ""
echo ""
echo "Remove dev from the Chrome extension title"
sed 's/DEV - //' release/_locales/en/messages.json  > output
mv output release/_locales/en/messages.json
sed 's/DEV - //' release/_locales/fr/messages.json  > output
mv output release/_locales/fr/messages.json

echo ""
echo ""
echo "Remove localhost (dev) servers from the manifest"
sed 's/.*localhost.*//' release/manifest.json  > output
mv output release/manifest.json

echo ""
echo ""
echo "Return the source to dev mode"
sed 's/Utils.debugMode *= *false/Utils.debugMode = true/' public/libs/Utils.js  > output
mv output public/libs/Utils.js
sed 's/Utils.productionMode *= *true/Utils.productionMode = false/' public/libs/Utils.js  > output
mv output public/libs/Utils.js

echo ""
echo ""
echo "Finished. Results are in the release folder"
