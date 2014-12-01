#!/bin/bash
export ANDROID_SDKS=android-20,sysimg-20 
export ANDROID_TARGET=android-20  
export ANDROID_ABI=armeabi-v7a

export PATH=${PATH}:/usr/local/bin
# npm install grunt-cli -g
# npm install bower -g
# npm install

if [ "$(uname)" == "Darwin" ]; then {
    # If the git user name isnt set, use jenkins      
    git config --get user.name ||{
        git config user.email "jenkins@host"
        git config user.name "Builder Bot"
    }
    export ANDROID_HOME=$HOME/android-adt-bundle/sdk
    PATH=${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools
} elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then {
    # sudo npm install -g grunt-cli

    # Do something under Linux platform
    sudo apt-get update -qq
    if [ `uname -m` = x86_64 ]; then sudo apt-get install -qq libstdc++6:i386 lib32z1; fi
    wget http://dl.google.com/android/android-sdk_r22.0.5-linux.tgz
    tar xzf android-sdk_r22.0.5-linux.tgz
    export ANDROID_HOME=$PWD/android-sdk-linux
    export PATH=${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools
    echo y | android update sdk --filter platform-tools,build-tools-20.0.1,android-20,sysimg-20 --no-ui --force > /dev/null
} elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then {
    # Do something under Windows NT platform
    echo "You can fill in the Windows instructions to get android."
}
fi

# Download all the code and updates for the first time
# cd ../
# git clone https://github.com/ProjetDeRechercheSurLecriture/dyslex-disorth-game-sikuli.git
