
echo "Copying icons from www to android"
mkdir platforms/android/res/drawable-ldpi
mkdir platforms/android/res/drawable-mdpi
mkdir platforms/android/res/drawable-hdpi
mkdir platforms/android/res/drawable-xhdpi

cp www/res/icon/android/icon-36-ldpi.png platforms/android/res/drawable-ldpi/icon.png
cp www/res/icon/android/icon-48-mdpi.png platforms/android/res/drawable-mdpi/icon.png
cp www/res/icon/android/icon-72-hdpi.png platforms/android/res/drawable-hdpi/icon.png
cp www/res/icon/android/icon-96-xhdpi.png platforms/android/res/drawable-xhdpi/icon.png

mkdir platforms/android-test/res/drawable-ldpi
mkdir platforms/android-test/res/drawable-mdpi
mkdir platforms/android-test/res/drawable-hdpi
mkdir platforms/android-test/res/drawable-xhdpi

cp www/res/icon/android/icon-36-ldpi.png platforms/android-test/res/drawable-ldpi/icon.png
cp www/res/icon/android/icon-48-mdpi.png platforms/android-test/res/drawable-mdpi/icon.png
cp www/res/icon/android/icon-72-hdpi.png platforms/android-test/res/drawable-hdpi/icon.png
cp www/res/icon/android/icon-96-xhdpi.png platforms/android-test/res/drawable-xhdpi/icon.png

echo "Copying icons from www to ios"
mkdir platforms/ios/MobileEmbeddedDemos/Resources/icons
cp www/res/icon/ios/icon-57.png platforms/ios/MobileEmbeddedDemos/Resources/icons/icon.png
cp www/res/icon/ios/icon-57-2x.png platforms/ios/MobileEmbeddedDemos/Resources/icons/icon@2x.png
cp www/res/icon/ios/icon-72.png platforms/ios/MobileEmbeddedDemos/Resources/icons/icon-72.png
cp www/res/icon/ios/icon-72-2x.png platforms/ios/MobileEmbeddedDemos/Resources/icons/icon-72@2x.png

echo "Copying slash screen from www to android"
echo "  Not copying any splash screen for android"

echo "Copying slash screen from www to ios"
echo "  TODO should copy the splash screen for ios"

