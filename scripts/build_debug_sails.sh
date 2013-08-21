#!/bin/bash

cd client/release_sails_couchapp

cp ../app/modules/sails/index.html .
cp -r ../app/modules/sails/partials .
cp -r ../app/modules/sails/css .
cp ../app/libs/bootstrap/css/bootstrap.css ./css
cp ../app/libs/bootstrap/css/bootstrap-responsive.css ./css
cp -r ../app/libs/font_awesome/ ./css/font_awesome
cp ../app/css/dashboard.css ./css
cp -r ../app/fonts .
cp -r ../app/modules/sails/image_stimuli .
cp -r ../app/modules/sails/audio_stimuli .
cp ../app/modules/sails/manifest.json .
cp -r ../app/modules/sails/img .
cp ../app/libs/require.js .

cd ../../

./scripts/build_sails_minified.sh

cp client/app/modules/release/sails.js client/release_sails_couchapp/

#Remove temporary build directory
rm -rf client/app/modules/release