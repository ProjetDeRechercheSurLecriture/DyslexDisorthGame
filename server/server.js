var express     = require('express')
    ,util       = require('util')
    
    ,mongooseAuth  = require('mongoose-auth')
    ,Users = require('./lib/restfullmongooseusers.js')
    
    ,https      = require('https')
    ,crypto     = require('crypto')
    ,fs         = require('fs');

var apphttpsdomain = "https://localhost:3036";
var httpsOptions = {
	key : fs.readFileSync('dyslexdisorthgame_debug.key'),
	cert : fs.readFileSync('dyslexdisorthgame_debug.crt')
};

var productionMode = false;
if (productionMode) {
	apphttpsdomain = "https://dyslexdisorthgame.ilanguage.ca";
	httpsOptions = {
		key : fs.readFileSync('dyslexdisorthgame.key'),
		cert : fs.readFileSync('dyslexdisorthgame.crt')
	};
}
var app = express.createServer(httpsOptions);

app.configure(function() {
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "90ndsj9dfdsfwewfead3"}));
  app.use(express.static(__dirname + '/public'));
//  app.use(app.router); //do not turn this on, see notes on https://github.com/bnoguchi/mongoose-auth/
  app.use(mongooseAuth.middleware());
  app.use(express.errorHandler());
});


mongooseAuth.helpExpress(app);

port = "3036";
app.listen(port);
console.log("Listening on " + apphttpsdomain)
