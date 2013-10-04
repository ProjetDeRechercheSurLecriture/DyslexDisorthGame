ANDROID_SDKS=android-18,sysimg-18 ANDROID_TARGET=android-18  ANDROID_ABI=armeabi-v7a

npm install grunt
npm install -g grunt-cli
npm install grunt-exec
npm install grunt-contrib-jshint
npm install grunt-contrib-watch
npm install grunt-contrib-copy
  # - npm install -g cordova

sudo apt-get update -qq
if [ `uname -m` = x86_64 ]; then sudo apt-get install -qq libstdc++6:i386 lib32z1; fi
wget -O android-sdk.tgz http://dl.google.com/android/android-sdk_r22.0.5-linux.tgz
tar xzf android-sdk.tgz
export ANDROID_HOME=$PWD/android-sdk-linux
export PATH=${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools

  # Install required components.
  # For a full list, run `android list sdk -a --extended`
  # Note that sysimg-16 downloads the ARM, x86 and MIPS images (we should optimize this).
  # Note that `echo y` only accepts the first license. This is actually convenient, since
  # it prevents the installation of the ATOM and MIPS emulator images. It might cause
  # issues in the future though.
echo y | android update sdk --filter platform-tools,build-tools-18.0.1,android-18,sysimg-18 --no-ui --force > /dev/null
