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
        echo 'export ANDROID_HOME="$HOME/android-sdk"'  >> $HOME/.bash_profile
        source $HOME/.bash_profile
        echo 'export PATH="$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools"'  >> $HOME/.bash_profile
        tail $HOME/.bash_profile
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
        ls
        mv android-sdk-linux android-sdk
        echo 'export ANDROID_HOME="$HOME/android-sdk"'  >> ~/.bashrc
        source ~/.bashrc
        echo "Android sdks contents should be non-empty: "
        echo $ANDROID_HOME

        echo " Contents of the home directory"
        ls ~/

        echo 'export PATH="$PATH:~/android-sdk/tools:~/android-sdk/platform-tools"'  >> ~/.bashrc
        tail ~/.bashrc
        source ~/.bashrc
    } elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then {
        # Do something under Windows NT platform
        echo "   The Windows instructions to get android are unknown by us. Please download and set them up yourself."
        exit 1
    } fi
}
if [ -z "$ANDROID_HOME" ]; then {
    echo "   Setting the android dependancies didn't work."
    echo $PATH
    exit 2
} fi

### Step 2: Download sdk 20 if necessary
echo ""
echo "Installed android sdks: "
ls $ANDROID_HOME/platforms 

echo "PATH is currently: "
echo $PATH

which android && {
    echo y | android update sdk --filter platform-tools,build-tools-20.0.1,android-20,sysimg-20 --no-ui --force > /dev/null
} || {
    echo "   Setting the path didn't work."
    exit 3
}

echo ""
echo "Location of sikuli"
if [ -z "$SIKULI_IDE_JAR" ]; then {
    if [ "$(uname)" == "Darwin" ]; then {
        echo "   This is a mac"
        ls /Applications/SikuliX-IDE.app/Contents/sikuli-ide.jar && {
            echo 'export SIKULI_IDE_JAR="/Applications/SikuliX-IDE.app/Contents/sikuli-ide.jar"'  >> $HOME/.bash_profile
            tail $HOME/.bash_profile
            source $HOME/.bash_profile
        } || {
            echo "TODO test download mac sikuli and install it in Applications"
            cd $HOME/Downloads
            curl -O --retry 999 --retry-max-time 0 -C - http://www.sikuli.org/uploads/1/3/6/8/13689586/sikuli-r930-osx-10.6.dmg
            echo Y | hdiutil mount sikuli-r930-osx-10.6.dmg
            sudo cp -R "/Volumes/Sikuli-r930-osx-10.6/SikuliX-IDE.app" /Applications
            echo 'export SIKULI_IDE_JAR="/Applications/SikuliX-IDE.app/Contents/sikuli-ide.jar"'  >> $HOME/.bash_profile
            tail $HOME/.bash_profile
            source $HOME/.bash_profile
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
        echo 'export SIKULI_IDE_JAR="$HOME/sikuli/sikuli-ide.jar"'  >> ~/.bashrc
        tail ~/.bashrc
        source ~/.bashrc
    } elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then {
        echo "   The Windows instructions to get sikuli are unknown by us. Please download and set them up yourself."
        exit 1
    } fi
} fi

echo "Location of sikuli now:"
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


