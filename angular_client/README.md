
# Build

This is the teacher dashboard where you can import class lists, play the games and view the results. It is built in Angular and uses Grunt to build. The dependancies are managed using NPM and Bower. To install dependancies run:

```
npm install
```

To run the tests:

```
npm test 
```

To build the project use:

```
grunt 
```

To work on the project use:

```
grunt serve
```

# Fossilization

We fossilized the project (checked in the compiled vendor.js and vendor.css) and removed the vendor deps (angular and fielddb) from the bower.json to ensure that the app can be modified in the future. This is mainly because this project is using the FieldDB project which was at version 2.x when this was built, and has breaking changes in 3.x


# How to update build dependancies

Grunt and Angular build dependancies change often and quickly, and sometimes result in build incompatabilities which you have to fix. The easiest way to fix them is to update all the dependancies and see if it will build.

Up date to the most recent grunt:
```
grunt --version
npm update grunt-cli -g
grunt --version
```

Clear your npm cache

```
npm cache clean
```

Change all the package versions to "*"
```
cat package.json
{
  "name": "admindashboard",
  "version": "0.0.0",
  "dependencies": {},
  "devDependencies": {
    "connect-modrewrite": "*",
    "grunt": "*",
    "grunt-angular-templates": "*",
    "grunt-autoprefixer": "*",
    "grunt-concurrent": "*",
    "grunt-contrib-clean": "*",
    "grunt-contrib-compress": "*",
    "grunt-contrib-concat": "*",
    "grunt-contrib-connect": "*",
    "grunt-contrib-copy": "*",
    "grunt-contrib-cssmin": "*",
    "grunt-contrib-htmlmin": "*",
    "grunt-contrib-jshint": "*",
    "grunt-contrib-uglify": "*",
    "grunt-contrib-watch": "*",
    "grunt-filerev": "*",
    "grunt-google-cdn": "*",
    "grunt-karma": "*",
    "grunt-newer": "*",
    "grunt-ngmin": "*",
    "grunt-svgmin": "*",
    "grunt-usemin": "*",
    "grunt-wiredep": "*",
    "jshint-stylish": "*",
    "karma-jasmine": "*",
    "karma-phantomjs-launcher": "*",
    "load-grunt-tasks": "*",
    "time-grunt": "^0.3.1"
  },
  "engines": {
    "node": ">=0.10.0"
  },
  "scripts": {
    "test": "grunt test",
    "postinstall": "bower install"
  }
}
```

Ask npm to update all dev dependancies to the latest
```
npm update --save-dev

```
