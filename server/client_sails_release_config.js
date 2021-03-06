({
  baseUrl : "./public",
  dir : "./releasesails",
//  optimize : 'none',
  optimize : 'uglify',
  uglify: {
    toplevel: true,
    ascii_only: true,
    beautify: true,
    max_line_length: 1000
  },
  inlineText: true,
  namespace: 'dyslexdisorthgame',
  skipModuleInsertion: false,
//  stubModules: ['underscore', 'jquery','backbone'],
//  wrap: {
//    start: "(function() {",
//    end: "}());"
//  },
  mainConfigFile : "public/main_sails.js",
  modules : [ {
    name : "main_sails"
  } ]
})