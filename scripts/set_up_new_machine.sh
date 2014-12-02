#!/bin/bash
echo "Verifying Android install"
echo ""
export ANDROID_SDKS=android-20,sysimg-20 
export ANDROID_TARGET=android-20  
export ANDROID_ABI=armeabi-v7a

# export PATH=$(PATH}:/usr/local/bin
# npm install grunt-cli -g
# npm install bower -g
# npm install


### Step 1: Download android tools if necessary
echo "Location of android tools"
which android || {
    if [ "$(uname)" == "Darwin" ]; then {
        echo "   This is a mac"
        cd $HOME
        curl -O --retry 999 --retry-max-time 0 -C - http://dl.google.com/android/android-sdk_r23.0.2-macosx.zip
        tar -xvf android-sdk_r23.0.2-macosx.tgz 
        mv android-sdk-macosx android-sdk
        echo 'export ANDROID_HOME=$HOME/android-sdk'  >> $HOME/.bash_profile
        echo 'PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools'  >> $HOME/.bash_profile
        source $HOME/.bash_profile
    } elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then {
        echo "   This is a linux machine"
        cd $HOME
        # sudo npm install -g grunt-cli

        # Install 32 bit libs so we can run the emulator on Linux
        sudo apt-get update -qq
        if [ `uname -m` = x86_64 ]; then { 
            # sudo apt-get install -qq libstdc++6:i386 lib32z1;
            sudo apt-get install -qq lib32z1 lib32ncurses5 lib32bz2-1.0  lib32stdc++6;
        } fi
        wget http://dl.google.com/android/android-sdk_r23.0.2-linux.tgz
        tar -xzf android-sdk_r23.0.2-linux.tgz
        mv android-sdk-linux android-sdk
        echo 'export ANDROID_HOME=$HOME/android-sdk'  >> $HOME/.bashrc
        echo 'PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools'  >> $HOME/.bashrc
        source $HOME/.bashrc
    } elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then {
        # Do something under Windows NT platform
        echo "   The Windows instructions to get android are unknown by us. Please download and set them up yourself."
        exit 1
    } fi
}

### Step 2: Download sdk 20 if necessary
echo ""
echo "Installed android sdks"
ls $ANDROID_HOME/platforms || {
    echo $PATH
    which adb
    which android && {
        echo y | android update sdk --filter platform-tools,build-tools-20.0.1,android-20,sysimg-20 --no-ui --force > /dev/null
    } || {
        echo "   Setting the path didn't work."
        exit 2
    }
} || {
    echo "   Setting the android dependancies didn't work."
    exit 2
}


echo ""
echo "Location of sikuli"
if [ -z "$SIKULI_IDE_JAR" ]; then {
    if [ "$(uname)" == "Darwin" ]; then {
        echo "   This is a mac"
        ls /Applications/SikuliX-IDE.app/Contents/sikuli-ide.jar && {
            echo 'export SIKULI_IDE_JAR=/Applications/SikuliX-IDE.app/Contents/sikuli-ide.jar'  >> $HOME/.bash_profile
            source $HOME/.bash_profile
        } || {
            echo "TODO download mac sikuli and install it in Applications"
        }
    } elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then {
        echo "   This is a linux machine"
        cd $HOME
        sudo apt-get install build-essential
        sudo apt-get install tesseract-ocr-eng libswing-layout-java jruby jython junit
        sudo apt-get install libpng-dev
        sudo apt-get install libjpeg-dev
        sudo apt-get install libtesseract-dev libopencv-dev 
        mkdir sikuli
        cd sikuli
        wget http://nightly.sikuli.de/sikulixsetup-1.1.0.jar
        java -jar sikulixsetup-1.1.0.jar options 1.1
        echo 'export SIKULI_IDE_JAR=$HOME/sikuli/sikuli-ide.jar'  >> $HOME/.bashrc
        source $HOME/.bashrc
    } elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then {
        echo "   The Windows instructions to get sikuli are unknown by us. Please download and set them up yourself."
        exit 1
    } fi
} fi
echo "Location of sikuli"
echo $SIKULI_IDE_JAR 



# If the git user name isnt set, use jenkins      
echo ""
echo "Git user"
git config --get user.email ||{
    git config user.email "jenkins@host"
    git config user.name "Builder Bot"
}

echo ""
echo "Completed verification of Android install"
# Download all the code and updates for the first time
# cd ../
# git clone https://github.com/ProjetDeRechercheSurLecriture/dyslex-disorth-game-sikuli.git


