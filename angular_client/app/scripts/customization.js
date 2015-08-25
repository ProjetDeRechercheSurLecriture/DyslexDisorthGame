'use strict';
/* globals FieldDB, window */

if (FieldDB &&
  FieldDB.FieldDBObject &&
  FieldDB.PsycholinguisticsApp &&
  FieldDB.Contextualizer &&
  FieldDB.Authentication) {

  FieldDB.FieldDBObject.warn = function(message, message2, message3, message4) {
    var type = this.fieldDBtype || this._id || 'UNKNOWNTYPE';
    if (type === 'DatumField') {
      return;
    }
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

  // FieldDB.Database.prototype.BASE_DB_URL = 'https://corpus.lingsync.org';
  // FieldDB.Database.prototype.BASE_AUTH_URL = 'https://auth.lingsync.org';
  // FieldDB.AudioVideo.prototype.BASE_SPEECH_URL = 'https://speech.lingsync.org';

  // FieldDB.Database.prototype.BASE_DB_URL = 'https://corpusdev.lingsync.org';
  // FieldDB.Database.prototype.BASE_AUTH_URL = 'https://apidev.lingsync.org';
  // FieldDB.AudioVideo.prototype.BASE_SPEECH_URL = 'https://speech.lingsync.org';

  var fieldDBAppSettings = {
    online: true,
    apiURL: FieldDB.Database.prototype.BASE_AUTH_URL,
    offlineCouchURL: 'https://localhost:6984',
    brand: 'Phophlo',
    brandLowerCase: 'phophlo',
    website: 'http://get.phophlo.ca',
    faq: 'http://get.phophlo.ca/faq',
    tagline: 'Prédiction des Habiletés Orthographiques  Par des Habiletés Langage Oral',
    // basePathname: window.location.origin + '/#',
    basePathname: window.location.origin + '/',
    whiteListCORS: [
      // Allow same origin resource loads.
      'self',
      // Allow loading from outer domain.
      'https://*.lingsync.org/**',
      'http://*.lingsync.org/**',
      'https://*.phophlo.ca/**',
      'http://*.phophlo.ca/**'
    ]
  };

  console.log("Ensuring FieldDB app is ready. ");
  if (!FieldDB.FieldDBObject.application) {
    console.log("    Creating a PsycholinguisticsApp ");
    FieldDB.FieldDBObject.application = new FieldDB.PsycholinguisticsApp(fieldDBAppSettings);
  } else {
    console.log("    An application is already available, it might be a Montage application, or a fielddb app.", FieldDB.FieldDBObject.application);
    for (var property in fieldDBAppSettings) {
      if (!fieldDBAppSettings.hasOwnProperty(property)) {
        continue;
      }
      FieldDB.FieldDBObject.application[property] = fieldDBAppSettings[property];
    }
  }

  if (!FieldDB.FieldDBObject.application.authentication || !(FieldDB.FieldDBObject.application.authentication instanceof FieldDB.Authentication)) {
    FieldDB.FieldDBObject.application.authentication = new FieldDB.Authentication({
      user: {
        authenticated: false
      }
    });
    console.log("    Authentication was not available", FieldDB.FieldDBObject.application.authentication);
  } else {
    console.log("    Authentication was available", FieldDB.FieldDBObject.application.authentication);
  }

  if (!FieldDB.FieldDBObject.application.contextualizer || !(FieldDB.FieldDBObject.application.contextualizer instanceof FieldDB.Contextualizer)) {
    FieldDB.FieldDBObject.application.contextualizer = new FieldDB.Contextualizer().loadDefaults();
    console.log("    Contextualizer was not available", FieldDB.FieldDBObject.application);
  } else {
    console.log("    Contextualizer was available", FieldDB.FieldDBObject.application.contextualizer);
  }

  if (window.location.pathname.indexOf('android_asset') > -1) {
    fieldDBAppSettings.basePathname = window.location.pathname;
  }

  FieldDB.FieldDBObject.application.participantsList.title.default = 'Élèves';
  FieldDB.FieldDBObject.application.participantsList.description.default = 'Voici tous les élèves de votre base de données. Pour importer davantage d\'élèves, utiliser les menus Nouveau > Classe';

  // FieldDB.FieldDBObject.application.authentication.dispatchEvent("appready");

  // FieldDB.FieldDBObject.application.contextualizer.addUrls(['en/messages.json','fr/messages.json']).then(function(){
  //   console.log('Added urls');
  // });

}
