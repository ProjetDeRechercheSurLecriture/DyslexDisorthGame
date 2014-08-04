#!/bin/bash
CURRENTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../"

ls ../Releases/ || {
	mkdir ../Releases
}
cd angular_client &&
npm install || exit 1;
bower install || exit 1;

echo "Cloning and building a local fielddb-angular commonjs based on most recent commit";
ls bower_components/fielddb-angular/dist/scripts/scripts.js || {
	cd bower_components &&
	git clone https://github.com/cesine/FieldDB.git &&
	mv FieldDB fielddb-angular && 
	cd fielddb-angular && 
	npm install &&
	grunt travis 
} &&
grunt
