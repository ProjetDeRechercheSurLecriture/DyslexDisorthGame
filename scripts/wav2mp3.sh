#!/bin/bash
#http://ubuntuforums.org/showthread.php?t=1379134
SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
for wav in *.wav; 
  #http://stackoverflow.com/questions/125281/how-do-i-remove-the-file-suffix-and-path-portion-from-a-path-string-in-bash
  do 
     filename=${wav%%.*};
     /Applications/ffmpeg -i $wav $filename.mp3; 
  done
IFS=$SAVEIFS
