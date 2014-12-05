#!/bin/bash
echo ""
echo ""
echo "Copying files to android assets"
#cd ../android/assets
rm -rf release
cp -r ../../client/app  release

