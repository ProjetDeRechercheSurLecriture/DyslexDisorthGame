/*
 * This module depends on non-node services which must be running before this file executes
 *  mongodb: a database to store users
 *  
 */


var everyauth       = require('everyauth')
    ,Promise        = everyauth.Promise
    ,mongoose       = require('mongoose')
    ,Schema         = mongoose.Schema
    ,ObjectId       = mongoose.SchemaTypes.ObjectId
    ,mongooseAuth   = require('mongoose-auth')
    ,everyauthconf  = require('./everyauthconfig_debug')
    ,couchkeys      = require('./couchkeys_debug')
    ,cradle         = require('cradle')
    ,fs             = require('fs')
    
    
      ,_          = require('underscore')
      ,Backbone   = require('backbone')
      ,util       = require('util');


console.log("Loading the User Authentication and Permissions Module");


/**
 * this function compares the client and server's version of the user, combines them, saves them to the server and returns the user.
 * references: https://github.com/bnoguchi/mongoose-auth
 */
var syncUserDetails = function(User, clientsUser, serversUser, callback){
  if(serversUser.login == "sallytomato"){
    console.log("The user is attempting to sync sallytomato, not saving sallytomato's details because it might break his dashboard");
    console.log(util.inspect(clientsUser));
    callback(clientsUser);
    return;
  }
  
  console.log("this is the clients user");
  console.log(util.inspect(clientsUser));
  
//  console.log(" this is the servers user:");
//  console.log(util.inspect(serversUser));
  
  console.log("Updating "+clientsUser._id);
  try{
    User.findById(clientsUser._id, function (err, doc){
      doc.mostRecentIds = clientsUser.mostRecentIds;
      doc.prefs = clientsUser.prefs;
      doc.hotkeys = clientsUser.hotkeys;
      doc.sessionHistory = clientsUser.sessionHistory;
      doc.dataLists = clientsUser.dataLists;
      doc.activities = clientsUser.activities;
      doc.permissions = clientsUser.permissions;
      doc.teams = clientsUser.teams;
      
      doc.email = clientsUser.email;
//      username = clientsUser.username;
//      doc.password = clientsUser.password;
      doc.dyslexdisorthgamedatabases = clientsUser.dyslexdisorthgamedatabases;
      doc.gravatar = clientsUser.gravatar;
      doc.researchInterest = clientsUser.researchInterest;
      doc.affiliation = clientsUser.affiliation;
      doc.activityCouchConnection = clientsUser.activityCouchConnection;
      doc.description = clientsUser.description;
      doc.subtitle = clientsUser.subtitle;
      firstname = clientsUser.firstname;
      lastname = clientsUser.lastname;

      doc.save( function (err, doc) {
        if (err) {
          console.log("Here are the errors "+util.inspect(err));
          if(typeof callback == "function"){
            callback(clientsUser);
          }
        }else{
          console.log("Save didnt error. This is what the saved doc looked like:" + util.inspect(doc));
          if(typeof callback == "function"){
            callback(doc);
          }
        }
      });

    });
  }catch(e){
    console.log("There was an error in trying to find the model and modify it."+util.inspect(e));
    if(typeof callback == "function"){
      callback(clientsUser);
    }
  }
};
  

/*
 * Prepare everyauth and mongodb
 * 
 * TODO if remove activities fromthis schema, it shouldnt store the activities in the mongoose user anymore which will help reduce download times when the user authenticates.
 * do this when the usr's activity feed is working, or when ready. 
 * 
 * references: https://github.com/bnoguchi/mongoose-auth/pull/89/files
 */
everyauth.debug = true;
var UserSchema = new Schema({
  mostRecentIds: Schema.Types.Mixed,
  gravatar: String,
  researchInterest: String,
  affiliation: String,
  description: String,
  subtitle: String,
  dyslexdisorthgamedatabases: Array,
  activityCouchConnection: Schema.Types.Mixed,
  dataLists: Array,
  prefs: Schema.Types.Mixed,
  firstname: String,
  lastname: String,
  teams: Array,
  sessionHistory: Array,
  activities: Array,
  hotkeys: Schema.Types.Mixed
});
var User;

/*
 * Restful everyauth overrides for password logins
 * from https://gist.github.com/2938492
 */

UserSchema.plugin(mongooseAuth, {

  everymodule : {
    everyauth : {

      User : function() {
        return User;
      },

      handleLogout : function(req, res) {
        req.logout();
        res.contentType('application/json');
        res.send(JSON.stringify({
          user : null
        }));
      }
    }
  },
  password : {
    everyauth : (function() {

      var registerPath = '/register', loginPath = '/login';

      //from everyauth itself, add other fields here from the original POST 
      //which you want to include in the user creation
      function extractExtraRegistrationParams(req) {
        var userparams = {
          email : req.body.email,
          username : req.body.username,
          password : req.body.password,
          dyslexdisorthgamedatabases : req.body.dyslexdisorthgamedatabases,
          activityCouchConnection : req.body.activityCouchConnection,
          gravatar : req.body.gravatar,
          researchInterest : req.body.researchInterest,
          affiliation : req.body.affiliation,
          description : req.body.description,
          subtitle : req.body.subtitle,
          dataLists : req.body.dataLists,
          prefs : req.body.prefs,
          mostRecentIds : req.body.mostRecentIds,
          firstname : req.body.firstname,
          lastname : req.body.lastname,
          teams : req.body.teams,
          sessionHistory : req.body.sessionHistory,
          activities : req.body.activities,
          permissions : req.body.permissions,
          hotkeys : req.body.hotkeys
        };
        /*
         * Create a database here just before registering the user, ideally this
         * is too early, but it is the only time we have their unhashed password
         * so that it will match their couch password.
         */ 
        console.log("The userparams: " + util.inspect(userparams));
        console.log("Creating db/dyslexdisorthgamedatabase for the user: "
            + util.inspect(userparams));

        createDbaddUser(
            userparams.dyslexdisorthgamedatabases[userparams.dyslexdisorthgamedatabases.length - 1],
            userparams, 
            function(res) {
              console.log("There was success in creating the dyslexdisorthgamedatabase: "+res);
            }, function(err) {
              console.log("There was an error in creating the dyslexdisorthgamedatabase: "+err);
            });

        //return userparams regardless of whether creating their dyslexdisorthgamedatabase suceeded.
        //chances are that if the dyslexdisorthgamedatabase existed, the user did too so mongoose-auth will give the proper error to the user
        //TODO this should be changed to pass the dyslexdisorthgamedatabase error too perhaps, perhaps not.
        return userparams;
      };

      function respondToGetMethod(req, res) {
        respond(res, {
          errors : [ 'Unsupported HTTP method.' ]
        });
      }

      function respondToSucceed(res, user) {
        if (!user)
          return;
//        console.log("In the succeed function this is what the res req body looks like "+util.inspect(res.req.body));
        
        try{
          if(res.req.body.syncDetails == "true"){
            var clientuser = JSON.parse(res.req.body.syncUserDetails);
            syncUserDetails(User, clientuser, user, function(returneduser){
              //return the server's synced user
              respond(res, {
                user : returneduser
              });
            });
          }else{
            //return the standard response user created by mongoose auth
            respond(res, {
              user : user
            });
          }
        }catch(e){
          console.log("Somethign is wrong with the res structure. Returning user normally instead of syncing.");
        //return the standard response user created by mongoose auth
          respond(res, {
            user : user
          });
        }
      }

      function respondToFail(req, res, errors) {
        if (!errors || !errors.length){
          return;
        }
        console.log("Fail errors: "+util.inspect(errors));
        respond(res, {
          errors : errors
        });
      }

      function respond(res, output) {
        res.contentType('application/json');
        res.send(JSON.stringify(output));
      }

      return {
        getRegisterPath : registerPath,
        displayRegister : respondToGetMethod,
        postRegisterPath : registerPath,
        respondToRegistrationSucceed : respondToSucceed,
        respondToRegistrationFail : respondToFail,
        getLoginPath : loginPath,
        displayLogin : respondToGetMethod,
        postLoginPath : loginPath,
        respondToLoginSucceed : respondToSucceed,
        respondToLoginFail : respondToFail,
        extractExtraRegistrationParams : extractExtraRegistrationParams
      };

    })()
  },
  facebook : {
    everyauth : {
      myHostname : 'http://local.host:3000',
      appId : everyauthconf.facebook.appId,
      appSecret : everyauthconf.facebook.appSecret,
      redirectPath : '/'
    }
  },
  twitter : {
    everyauth : {
      myHostname : 'https://dyslexdisorthgame.ilanguage.ca',
      consumerKey : everyauthconf.twitter.consumerKey,
      consumerSecret : everyauthconf.twitter.consumerSecret,
      redirectPath : '/'
    }
  },
  github : {
    everyauth : {
      myHostname : 'http://local.host:3000',
      appId : everyauthconf.github.appId,
      appSecret : everyauthconf.github.appSecret,
      redirectPath : '/'
    }
  },
  google : {
    everyauth : {
      myHostname : 'http://localhost:3000',
      appId : everyauthconf.google.clientId,
      appSecret : everyauthconf.google.clientSecret,
      redirectPath : '/',
      scope : 'https://www.google.com/m8/feeds'
    }
  }
});


mongoose.model('User', UserSchema);

mongoose.connect('mongodb://localhost/test');

User = mongoose.model('User');
/*
 * End everyauth setup
 */

module.exports = UserSchema;


