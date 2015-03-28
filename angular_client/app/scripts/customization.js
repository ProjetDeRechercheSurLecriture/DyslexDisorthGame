'use strict';
/* globals FieldDB */

if (FieldDB &&
  FieldDB.FieldDBObject &&
  FieldDB.PsycholinguisticsApp &&
  FieldDB.Contextualizer &&
  FieldDB.User) {

  FieldDB.FieldDBObject.warn = function(message, message2, message3, message4) {
    var type = this.fieldDBtype || this._id || 'UNKNOWNTYPE';
    console.warn(type.toUpperCase() + ' WARN: ' + message);
    if (message2) {
      console.warn(message2);
    }
    if (message3) {
      console.warn(message3);
    }
    if (message4) {
      console.warn(message4);
    }
  };

  //Dont show alerts when in this app, until we have error modals or something
  FieldDB.FieldDBObject.bug = FieldDB.FieldDBObject.prototype.todo;


  FieldDB.Database.prototype.BASE_DB_URL = 'https://localhost:6984';
  FieldDB.Database.prototype.BASE_AUTH_URL = 'https://localhost:3183';
  FieldDB.AudioVideo.prototype.BASE_SPEECH_URL = 'https://localhost:3184';

  // FieldDB.Database.prototype.BASE_DB_URL = 'https://corpus.example.org';
  // FieldDB.Database.prototype.BASE_AUTH_URL = 'https://auth.example.org';
  // FieldDB.AudioVideo.prototype.BASE_SPEECH_URL = 'https://speech.example.org';

  // FieldDB.Database.prototype.BASE_DB_URL = 'https://corpusdev.example.org';
  // FieldDB.Database.prototype.BASE_AUTH_URL = 'https://apidev.example.org';
  // FieldDB.AudioVideo.prototype.BASE_SPEECH_URL = 'https://speech.example.org';

  var fieldDBApp = new FieldDB.PsycholinguisticsApp({
    authentication: {
      user: new FieldDB.User({
        authenticated: false
      })
    },
    contextualizer: new FieldDB.Contextualizer().loadDefaults(),
    online: true,
    apiURL: FieldDB.Database.prototype.BASE_AUTH_URL,
    offlineCouchURL: 'https://localhost:6984',
    brand: 'DyslexDysorth',
    brandLowerCase: 'dyslexdisorth',
    website: 'http://get.dyslexdisorth.ca',
    faq: 'http://get.dyslexdisorth.ca/faq',
    tagline: 'Prédiction des Habiletés Orthographiques  Par des Habiletés Langage Oral',
    basePathname: window.location.origin + '/#',
    resourceUrlWhitelist: [
      // Allow same origin resource loads.
      'self',
      // Allow loading from outer domain.
      'https://*.example.org/**',
      'https://*.dyslexdisorth.ca/**'
    ]
  });

  if (window.location.pathname.indexOf('android_asset') > -1) {
    fieldDBApp.basePathname = window.location.pathname;
  }

  FieldDB.FieldDBObject.application.participantsList.title.default = 'Élèves';
  FieldDB.FieldDBObject.application.participantsList.description.default = 'Voici tous les élèves de votre base de données. Pour importer davantage d\'élèves, utiliser les menus Nouveau > Classe';


  // FieldDB.FieldDBObject.application.contextualizer.addUrls(['en/messages.json','fr/messages.json']).then(function(){
  //   console.log('Added urls');
  // });

}
