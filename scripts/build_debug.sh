#!/bin/bash

# cd ../

# ./scripts/build_angular_client.sh

cd android

echo ""
echo "Setting android build to android-20 sdk" 
# http://stackoverflow.com/questions/23811315/gradle-fails-with-ambiguous-method-overloading-for-method-java-io-fileinit
android project update .p ./app/src/main/ -t android-20
cp ./app/src/main/local.properties ./local.properties # or ln if you feel so

echo ""
echo "Building and installing android app on emulator" 
./gradlew 

echo ""
echo "Running sikuli test for login and logout on the emulator" 
./gradlew testLoginLogout
