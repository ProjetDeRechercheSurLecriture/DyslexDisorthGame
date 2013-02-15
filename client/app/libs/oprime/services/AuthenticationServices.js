console.log("Loading AuthenticationServices");

'use strict';
define(
    [ "angular", "libs/oprime/services/CouchDB", "text!modules/OPrime/locale/en/messages.json",
        "text!modules/OPrime/locale/zh-cn/messages.json", "underscore" ],
    function(angular, CouchDBServices, Locale_en, Locale_zh_cn, _) {

      var AuthenticationServices = angular
          .module('Authentication.services', [ 'ngResource' ])
          /**
           * Encrypt accepts a string (UTF8) and returns a CryptoJS object, in
           * base64 encoding so that it looks like a string, and can be saved as
           * a string in the corpus.
           * 
           * @param contents
           *          A UTF8 string
           * @returns Returns a base64 string prefixed with "confidential" so
           *          that the views can choose to not display the entire string
           *          for the user.
           */
          .factory("EncryptUser", function(contents) {
            var result = CryptoJS.AES.encrypt(contents, OPrime.userEncryptionToken());
            // return the base64 version to save it as a string in the
            // corpus
            return "confidential:" + btoa(result);
          })
          /**
           * Decrypt uses this object's secret key to decode its parameter using
           * the AES algorithm.
           * 
           * @param encrypted
           *          A base64 string prefixed (or not) with the word
           *          "confidential"
           * @returns Returns the encrypted result as a UTF8 string.
           */
          .factory(
              "DecryptUser",
              function(encrypted) {
                encrypted = encrypted.replace("confidential:", "");
                // decode base64
                encrypted = atob(encrypted);
                resultpromise = CryptoJS.AES.decrypt(encrypted, OPrime.userEncryptionToken())
                    .toString(CryptoJS.enc.Utf8);
                return resultpromise;
              })
          .factory(
              'AuthService',
              function() {
                OPrime.debug("Initializing AuthenticationServices");

                var setUserAttributes = function(attributes) {
                  for ( var x in attributes) {
                    if (x == "name") {
                      // alert("setting name to "+attributes[x]);
                      if (attributes[x] == "") {
                        continue;
                      }
                    }
                    auth.users[0][x] = attributes[x];
                  }
                };

                var callbackToRenderAuth = function() {
                  OPrime.hub.publish('authInfoUpdated', auth);
                };
                var getUserDefinedStages = function() {
                  var activeStages = [];
                  for ( var i in auth.stages) {
                    if (auth.stages[i].label != "") {
                      activeStages.push(auth.stages[i]);
                    }
                  }
                  return activeStages;
                };
                var getDefaultUserPreferedInspectionStages = function() {
                  return [
                      {
                        "_id" : "3d84f25a-54ed-4e34-96fb-5e086af74ba6",
                        "label" : "Pre-production",
                        "image_src" : "planning.jpg",
                        "fields_to_show_an_inspector_on_dashboard" : [ "sku_name", "sku_number",
                            "qty:", "lotSize", "status" ],
                        "fields_to_show_a_chief_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "status", "conclusion" ]
                      },
                      {
                        "_id" : "82da86d5-fca3-4fbc-b4d4-371f17b778a2",
                        "label" : "During Production",
                        "image_src" : "production.jpg",
                        "fields_to_show_an_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "Date assigned:", "assignment_date_first_retrieved",
                            "status" ],
                        "fields_to_show_a_chief_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "Date completed:", "inspection_completed_date",
                            "status", "conclusion" ]
                      },
                      {
                        "_id" : "b906b468-c9cb-4836-9a8e-6e0dc6969c9f",
                        "label" : "Pre-Shipment",
                        "image_src" : "shipping.jpg",
                        "fields_to_show_an_inspector_on_dashboard" : [ "sku_name", "Expected inspection date:",
                            "sku_date_forecasted_inspection", "qty:", "lotSize", "PO:","purchaseOrder_number",
                            "status" ],
                        "fields_to_show_a_chief_inspector_on_dashboard" : [ "inspection_location",
                            "sku_name", "Date Ordered:", "purchaseOrder_order_date", "PO:",
                            "purchaseOrder_number", "qty:", "lotSize", "status", "conclusion" ]
                      },
                      {
                        "_id" : "94bcad11-44e3-49e0-9a78-03b25fc0cee8",
                        "label" : "Factory Audit",
                        "image_src" : "warehouse.jpg",
                        "fields_to_show_an_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "Date assigned:", "assignment_date_first_retrieved",
                            "PO:", "purchaseOrder_number", "status" ],
                        "fields_to_show_a_chief_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "Date completed:", "inspection_completed_date",
                            "PO:", "purchaseOrder_number", "status", "conclusion" ]
                      },
                      {
                        "_id" : "a6bbb2fc-a969-4372-93a3-199704bba73f",
                        "label" : "",
                        "image_src" : "warehouse.jpg",
                        "fields_to_show_an_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "status" ],
                        "fields_to_show_a_chief_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "status" ]
                      },
                      {
                        "_id" : "ca077180-e398-4d29-866e-22e88648354d",
                        "label" : "",
                        "image_src" : "warehouse.jpg",
                        "fields_to_show_an_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "status" ],
                        "fields_to_show_a_chief_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "status" ]
                      },
                      {
                        "_id" : "d40c5c17-f642-43f5-8f6a-47fce5329fc7",
                        "label" : "",
                        "image_src" : "warehouse.jpg",
                        "fields_to_show_an_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "status" ],
                        "fields_to_show_a_chief_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "status" ]
                      },
                      {
                        "_id" : "5691928d-ab97-42cd-9153-b877903e76c4",
                        "label" : "",
                        "image_src" : "warehouse.jpg",
                        "fields_to_show_an_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "status" ],
                        "fields_to_show_a_chief_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "status" ]
                      },
                      {
                        "_id" : "c2bcda8f-d8f7-4a21-be7f-7328a3ef7077",
                        "label" : "",
                        "image_src" : "warehouse.jpg",
                        "fields_to_show_an_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "status" ],
                        "fields_to_show_a_chief_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "status" ]
                      },
                      {
                        "_id" : "271c1b5c-7693-4a63-bdaf-24d39cc204aa",
                        "label" : "",
                        "image_src" : "warehouse.jpg",
                        "fields_to_show_an_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "status" ],
                        "fields_to_show_a_chief_inspector_on_dashboard" : [ "sku_name",
                            "sku_description", "status" ]
                      } ];
                };
                var getDefaultUserPreferedColumnHeadings = function() {
                  return [ {
                    "label" : "id",
                    "title" : "locale_view",
                    "show" : "1"
                  }, {
                    "label" : "starred",
                    "title" : "locale_starred",
                    "show" : "1"
                  }, {
                    "label" : "status",
                    "title" : "locale_status",
                    "show" : "1"
                  }, {
                    "label" : "assignment_date_first_retrieved",
                    "title" : "locale_assignment_date_first_retrieved",
                    "show" : "1"
                  }, {
                    "label" : "inspectionStage_label",
                    "title" : "locale_inspection_stage",
                    "show" : "1"
                  }, {
                    "label" : "sku_date_forecasted_inspection",
                    "title" : "locale_sku_date_forecasted_inspection",
                    "show" : "1"
                  }, {
                    "label" : "sku_name",
                    "title" : "locale_sku_name",
                    "show" : "1"
                  }, {
                    "label" : "sku_number",
                    "title" : "locale_sku_number",
                    "show" : "1"
                  }, {
                    "label" : "sku_serial_no",
                    "title" : "locale_sku_serial_no",
                    "show" : "1"
                  }, {
                    "label" : "sku_description",
                    "title" : "locale_sku_description",
                    "show" : "0"
                  }, {
                    "label" : "inspection_location",
                    "title" : "locale_inspection_location",
                    "show" : "1"
                  }, {
                    "label" : "purchaseOrder_number",
                    "title" : "locale_purchaseOrder_number",
                    "show" : "1"
                  }, {
                    "label" : "purchaseOrder_order_date",
                    "title" : "locale_purchaseOrder_order_date",
                    "show" : "1"
                  }, {
                    "label" : "lotSize",
                    "title" : "locale_lotSize",
                    "show" : "1"
                  }, {
                    "label" : "assignment_id",
                    "title" : "locale_assignment_id",
                    "show" : "0"
                  }, {
                    "label" : "conclusion",
                    "title" : "locale_conclusion",
                    "show" : "0"
                  }, {
                    "label" : "actionRequired",
                    "title" : "locale_client_action_required",
                    "show" : "1"
                  } ];
                };
                var newUser = function(attributes) {
                  var newUser = {
                    userRole : "inspector",
                    userPublic : {
                      name : "",
                      username : "",
                      offlineLogins : [],
                      validated : false
                    },
                    preferedLanguage : {
                      iso_code : "zh-cn",
                      jslocalecode : "zh_cn",
                      languagename : "中文"
                    },
                    preferencesSkuInspection : {
                      defaultView : "view_all"
                    },
                    versionOfAppWhenUserWasCreated : {
                      software : auth.softwares[0],
                      hardware : auth.hardwares[0]
                    },
                    dateCreated : JSON.stringify(new Date()),
                    name : "",
                    username : "",
                    hash : "24d575589c8f9ec348931b1e01c07299",
                    validated : true,
                    offlineLogins : [],
                    notifications : [],
                    preferencesColumns : getDefaultUserPreferedColumnHeadings()
                  };
                  for ( var x in attributes) {
                    if (x == "name") {
                      // alert("setting name to "+attributes[x]);
                      if (attributes[x] == "") {
                        continue;
                      }
                    }
                    newUser[x] = attributes[x];
                  }
                  newUser.userPublic.offlineLogins = newUser.offlineLogins;
                  return newUser;
                };

                /*
                 * Load auth from localstorage or create a new app
                 */
                var initialize = function() {
                  // var encryptedAuth = localStorage.getItem("encryptedAuth");
                  // if (encryptedAuth) {
                  // encryptedAuth = JSON.parse(encryptedAuth);
                  // $scope.auth = encryptedAuth;
                  // } else {
                  // alert("Missing auth, redirecting you to the authentication
                  // page.");
                  // window.location.replace("authentication.html");
                  // return;
                  // }
                  auth = localStorage.getItem("encryptedAuth");
                  if (auth) {
                    // alert("Setting auth from localstorage");
                    auth = JSON.parse(auth);
                  } else {
                    // alert("Creating new auth.");
                    auth = {};
                    auth.error = "";
                    auth.websiteurl = "http://OPrime.com";
                    auth.connectivity = {
                      type : "? Connection",
                      online : false
                    };

                    auth.stages = getDefaultUserPreferedInspectionStages();

                    auth.hardwares = [ {
                      name : "Android Nexus 7",
                      identifier : "fakenexus",
                      version : "OPrimeAndroid v3.1a",
                      validated : true
                    }, {
                      name : "Motorola XOOM",
                      identifier : "fakexoom",
                      validated : true
                    } ];

                    auth.softwares = [ {
                      name : "OPrimeClient v3.0a",
                      validated : true
                    } ];

                    OPrime.getHardwareInfo(auth, function(result) {
                      OPrime.hub.unsubscribe("hardwareDetails", null, this);
                      OPrime.debug("Setting the AuthenticationController hardware details  to "
                          + JSON.stringify(result));
                      var indexInKnownHardware = _.pluck(auth.hardwares, "identifier");
                      if (indexInKnownHardware == -1) {
                        auth.hardwares.unshift(result);
                      } else {
                        var knownhardare = auth.hardwares.splice(indexInKnownHardware, 1);
                        auth.hardwares.unshift(knownhardare[0]);
                      }
                    });

                    auth.buyers = [ {
                      name : "Allied Biscuits",
                      validated : true,
                      logoImage : "logo_placeholder.png"
                    }, {
                      name : "ACME",
                      validated : true,
                      logoImage : "logo_placeholder.png"
                    } ];

                    auth.suppliers = [ {
                      name : "Foobars",
                      validated : true
                    } ];

                    auth.thirdparties = [ {
                      name : "Wentworth",
                      validated : true
                    } ];

                    auth.users = [ newUser({
                      userPublic : {
                        name : "Gina Cook",
                        username : "ginacook",
                        validated : true
                      },
                      name : "Gina Cook",
                      username : "ginacook",
                      hash : "",
                      validated : false,
                      couchConnection : {
                        complete : "https://wentworthinspections.iriscouch.com/alliedbiscuitinspections/",
                        protocol : "https://",
                        domain : "wentworthinspections.iriscouch.com",
                        port : "",
                        db : "alliedbiscuitinspections/"
                      },
                      offlineLogins : [ 1357830383678, 1357830384949, 1357830385965, 1357830386651,
                          1357830387291, 1357830387798, 1357830388308, 1357830389043 ],
                      notifications : [ {
                        message : "Assignment 123 transfered Phil",
                        timestamp : Date.now()
                      }, {
                        message : "Assignment 124 has been sent to clients for approval.",
                        timestamp : Date.now()
                      }, {
                        message : "Assignment 125 transfered Kevin",
                        timestamp : Date.now()
                      } ]
                    }) ];

                    auth.users.push(newUser({
                      userPublic : {
                        name : "Gina Local",
                        username : "ginalocal",
                        validated : true
                      },
                      name : "Gina Local",
                      username : "ginalocal",
                      hash : "awiomoeiajao0ije0aoijea",
                      validated : true,
                      authConnection : {
                        baseUrl : "https://demo.OPrime.com/sync/",
                        postUrl : "https://demo.OPrime.com/sync/wsx_sync.php?wsdl",
                        soapAction : "https://demo.OPrime.com/sync/wsx_sync.php",
                        namespace : "urn:wsx",
                        saltMethod : "getSalt",
                        getAssignmentsMethod : "getAssignment",
                        saveAssignmentMethod : "saveAssignment"
                      },
                      couchConnection : {
                        complete : "https://localhost:6984/alliedbiscuitinspections/",
                        protocol : "https://",
                        domain : "localhost",
                        port : ":6984",
                        db : "alliedbiscuitinspections/"
                      },
                      offlineLogins : [],
                      notifications : [ {
                        message : "Assignment 123 transfered Phil",
                        timestamp : Date.now()
                      }, {
                        message : "Assignment 124 transfered Joel",
                        timestamp : Date.now()
                      }, {
                        message : "Assignment 125 has been sent to clients for approval.",
                        timestamp : Date.now()
                      } ]
                    }));

                    // /*
                    // * Check on the state of things right now
                    // */
                    // OPrime.getConnectivityType(auth, function(result) {
                    // /*
                    // * Uncomment this to listen only once, but in general we
                    // * want the authentication controller to know if the
                    // * device goes offline
                    // * this.hub.unsubscribe("connectivityType", null, this);
                    // */
                    // OPrime.debug("Setting the AuthenticationController
                    // connection type to "
                    // + result);
                    // if (result.indexOf("Probably Online")) {
                    // if (this.connectivity.type.indexOf("WiFi") >= 0
                    // || this.connectivity.type.indexOf("3G") >= 0
                    // || this.connectivity.type.indexOf("4G") >= 0
                    // || this.connectivity.type.indexOf("Online") >= 0) {
                    // // Do nothing, dont overwrite with less precise
                    // // information
                    // return;
                    // }
                    // }
                    // this.connectivity.type = result;
                    // this.connectivity.online = "unknown";
                    // });

                  }

                  /*
                   * Load user's locale for the user interface.
                   */

                  Locale_en = JSON.parse(Locale_en);
                  Locale_zh_cn = JSON.parse(Locale_zh_cn);
                  for ( var item in Locale_en) {
                    locale_en_strings[item] = Locale_en[item].message;
                    try {
                      locale_zh_cn_strings[item] = Locale_zh_cn[item].message;
                    } catch (e) {
                      locale_zh_cn_strings[item] = "TODO Translate" + Locale_en[item].message;
                    }
                  }
                  var Locale = Locale_en;
                  if (auth.users[0].preferedLanguage.jslocalecode == "en") {
                    window.locale = locale_en_strings;
                  } else {
                    window.locale = locale_zh_cn_strings;
                  }
                  window.locale_en_strings = locale_en_strings;
                  window.locale_zh_cn_strings = locale_zh_cn_strings;

                  /*
                   * Leak scope out to the window so that we can debug, if we
                   * are in debugMode
                   */
                  if (OPrime.debugMode) {
                    window.auth = auth;
                  }
                };
                var auth = {};
                var locale_en_strings = {};
                var locale_zh_cn_strings = {};
                initialize();

                return {
                  'newUser' : newUser,
                  'getUserPublic' : function() {
                    /*TODO why is this function empty */
                    return;
                  },
                  'notify' : function(message) {
                    auth.users[0].notifications.unshift({
                      message : message,
                      timestamp : Date.now()
                    });
                    if (typeof callbackToRenderAuth == "function") {
                      callbackToRenderAuth();
                    }
                  },
                  /*
                   * Find the index of the notification with this timestamp, and
                   * remove it from the array
                   */
                  'removeNotification' : function(notification) {
                    auth.users[0].notifications.splice(_.pluck(auth.users[0].notifications,
                        "timestamp").indexOf(notification.timestamp), 1);
                    if (typeof callbackToRenderAuth == "function") {
                      callbackToRenderAuth();
                    }
                  },
                  'removeAllNotifications' : function() {
                    auth.users[0].notifications = [];
                    if (typeof callbackToRenderAuth == "function") {
                      callbackToRenderAuth();
                    }
                  },
                  'setStatus' : function(status) {
                    auth.status = status;
                    if (typeof callbackToRenderAuth == "function") {
                      callbackToRenderAuth();
                    }
                  },
                  'setError' : function(error) {
                    auth.error = error;
                    if (typeof callbackToRenderAuth == "function") {
                      callbackToRenderAuth();
                    }
                  },
                  'getHash' : function() {
                    return auth.users[0].hash;
                  },
                  'getUser' : function() {
                    return auth.users[0];
                  },
                  'getHardware' : function() {
                    return auth.hardwares[0];
                  },
                  'getSoftware' : function() {
                    return auth.softwares[0];
                  },
                  'getThirdparty' : function() {
                    return auth.thirdparties[0];
                  },
                  'getAuthConnection' : function() {
                    return auth.users[0].authConnection;
                  },
                  'setAuthConnection' : function(authConnection) {
                    auth.users[0].authConnection = authConnection;
                  },
                  'getCouchConnection' : function() {
                    var connection = JSON.parse(JSON.stringify(auth.users[0].couchConnection));
                    if (OPrime.isAndroidApp()) {
                      connection.db = "client0/"; // TODO dont change the db,
                      // use the same on the android
                      // and on the tablet
                      connection.complete = "http://localhost:8138/" + connection.db;
                      connection.protocol = "http://";
                      connection.domain = "localhost";
                      connection.port = ":8138";
                    }
                    return connection;
                  },
                  'getUserPreferredColumns' : function() {
                    return auth.users[0].preferencesColumns;
                  },
                  'setUserPreferredColumns' : function(preferencesColumns) {
                    auth.users[0].preferencesColumns = preferencesColumns;
                  },
                  'setCouchConnection' : function(couchConnection) {
                    auth.users[0].couchConnection = couchConnection;
                  },
                  'getUserDefinedStages' : getUserDefinedStages,
                  'addNewStage' : function(label) {
                    for ( var i in auth.stages) {
                      if (auth.stages[i].label == "") {
                        auth.stages[i].label = label;
                        return auth.stages[i];
                      }
                    }
                    OPrime.bug("You may have a maximum of 10 production stages.");
                    return null;
                  },
                  'setUserDefinedStages' : function(stages) {
                    for ( var stage in stages) {
                      if (stages[stage].label != "") {
                        var stageInAuth = _.pluck(auth.stages, "_id").indexOf(stages[stage]._id);
                        if (stageInAuth >= 0) {
                          auth.stages[stageInAuth] = stages[stage];
                        } else {
                          OPrime
                              .bug("Oddly enough, you have inserted a stage in the production cycle which the app doesn't understand. Not saving it in your preferences. If this happens again, please report it.");
                        }
                      }
                    }
                  },
                  'moveStageDown' : function(stage) {
                    var moveFromIndex = auth.stages.indexOf(stage);
                    var moveToIndex = moveFromIndex + 1;
                    var activeStagesCount = 0;
                    for ( var i in auth.stages) {
                      if (auth.stages[i].label != "") {
                        activeStagesCount++;
                      }
                    }
                    if (moveToIndex == activeStagesCount) {
                      return;
                    }
                    var tempStageData = auth.stages[moveToIndex];
                    auth.stages[moveToIndex] = stage;
                    auth.stages[moveFromIndex] = tempStageData;
                    return getUserDefinedStages();
                  },
                  'moveStageUp' : function(stage) {
                    var moveFromIndex = auth.stages.indexOf(stage);
                    var moveToIndex = moveFromIndex - 1;
                    if (moveFromIndex == 0) {
                      return;
                    }
                    var tempStageData = auth.stages[moveToIndex];
                    auth.stages[moveToIndex] = stage;
                    auth.stages[moveFromIndex] = tempStageData;
                    return getUserDefinedStages();
                  },
                  'deleteStage' : function(stage) {
                    var indexToDelete = auth.stages.indexOf(stage);
                    var deletedStage = auth.stages.splice(indexToDelete, 1);
                    OPrime.debug("Deleted stage: ", deletedStage);
                    if (deletedStage) {
                      return getUserDefinedStages();
                    }
                  },
                  'setDefaultInspectionStages' : function() {
                    auth.stages = getDefaultUserPreferedInspectionStages();
                  },
                  'setDefaultInspectionColumnHeadings' : function() {
                    auth.users[0].preferencesColumns = getDefaultUserPreferedColumnHeadings();
                  },
                  'setConnectivity' : function(connectivity) {
                    /*
                     * If the connection type is already more specific, don't
                     * overwrite
                     */
                    // if (connectivity.type.indexOf("Online")) {
                    // if (auth.connectivity.type.indexOf("WiFi") >= 0
                    // || auth.connectivity.type.indexOf("3G") >= 0
                    // || auth.connectivity.type.indexOf("4G") >= 0) {
                    // connectivity.type = auth.connectivity.type;
                    // }
                    // }
                    // if (!connectivity.timestamp) {
                    // connectivity.timestamp == auth.connectivity.timestamp;
                    // }
                    if (connectivity.type) {
                      auth.connectivity.type = connectivity.type;
                    }
                    if (connectivity.online) {
                      auth.connectivity.online = connectivity.online;
                    }
                    if (connectivity.timestamp) {
                      auth.connectivity.timestamp = connectivity.timestamp;
                    }
                  },
                  'setUserAttributes' : setUserAttributes,
                  'setThirdParty' : function(thirdParty) {
                    var knownThirdParty = _.pluck(auth.thirdparties, "name").indexOf(
                        thirdParty.name);
                    if (knownThirdParty > -1) {
                      var oldVersion = auth.thirdparties.splice(knownThirdParty, 1);
                    }
                    OPrime.debug("Replacing ", oldVersion, " with ", thirdParty);
                    auth.thirdparties.unshift(thirdParty);
                  },
                  'setBuyer' : function(buyer) {
                    var knownBuyer = _.pluck(auth.buyers, "name").indexOf(buyer.name);
                    if (knownBuyer > -1) {
                      var oldVersion = auth.buyers.splice(knownBuyer, 1);
                    }
                    OPrime.debug("Replacing ", oldVersion, " with ", buyer);
                    auth.buyers.unshift(buyer);
                  },
                  /**
                   * If the User currently has English, switch to simplified
                   * Chinese, else switch it to English. Note: if we have more
                   * than 2 localizations we should refactor this method to take
                   * in an ISO language code.
                   * 
                   * @param iso_code
                   * @returns a language object which can be stored in the scope
                   */
                  'changeLanguage' : function(iso_code) {
                    if (auth.users[0].preferedLanguage.iso_code == "en") {
                      auth.users[0].preferedLanguage = {
                        iso_code : "zh-cn",
                        jslocalecode : "zh_cn",
                        languagename : "中文"
                      };
                      window.locale = locale_zh_cn_strings;
                    } else {
                      auth.users[0].preferedLanguage = {
                        iso_code : "en",
                        jslocalecode : "en",
                        languagename : "EN"
                      };
                      window.locale = locale_en_strings;
                    }
                    return auth.users[0].preferedLanguage;
                  },
                  'getUsersLanguage' : function() {
                    return auth.users[0].preferedLanguage;
                  },
                  'getAuthInfo' : function() {
                    return auth;
                  },
                  'setCallbackToRenderAuth' : function(callback) {
                    callbackToRenderAuth = callback;
                  },
                  'getWebsiteURL' : function() {
                    return auth.websiteurl;
                  },
                  'getUsersPreferedSkuInspectionDefaultView' : function() {
                    return auth.users[0].preferencesSkuInspection.defaultView;
                  },
                  'logoutIfTooManyOfflineLogins' : function() {
                    if (auth.users[0].validated) {
                      if (auth.users[0].offlineLogins.length > 10) {
                        // alert("Logging you out, you have logged in too many
                        // times offline. You must have an internet connection
                        // to proceed.");
                        // window.logout();
                        return "toomanyofflinelogins";
                      }
                      if (OPrime.debugMode)
                        OPrime
                            .debug("User is a validated user, not reccomending services to OPrime platform.");
                      auth.status = "Authenticated Offline.";
                      auth.users[0].offlineLogins.unshift(Date.now());
                      return "validated";
                    }
                    return "new";
                  },
                  'saveAuth' : function() {
                    if (auth) {
                      localStorage.setItem("encryptedAuth", JSON.stringify(auth));
                    }
                    OPrime.debug(auth);
                    // alert("Saved auth to local storage.");
                  },
                  'getWhoWhereHow' : function() {
                    return {
                      user : auth.users[0].userPublic,
                      hardware : auth.hardwares[0],
                      software : auth.softwares[0]
                    };
                  },
                  'setTotalDownloadedAssignments' : function(total, finishedCallback) {
                    auth.totalLastDownloadedAssignments = total;
                    auth.currentassignment = total;
                    auth.whenAssignmentsAreDownloadedAndBuilt = finishedCallback;
                  },
                  'oneMoreAssignmentDone' : function() {
                    auth.currentassignment = auth.currentassignment - 1;
                    if (auth.currentassignment == 0) {
                      if (typeof auth.whenAssignmentsAreDownloadedAndBuilt == "function") {
                        auth.whenAssignmentsAreDownloadedAndBuilt();
                        delete auth.whenAssignmentsAreDownloadedAndBuilt;
                      }
                    }
                    return auth.currentassignment <= 0;
                  },
                  'createWhoWhatWhereWhenHowWhy' : function(what) {
                    return {
                      whoWhereHow : {
                        user : auth.users[0].userPublic,
                        hardware : auth.hardwares[0],
                        software : auth.softwares[0],
                        inspectionStage : "TODO get this object from the preferences"
                      },
                      when : JSON.stringify(new Date()),
                      what : what
                    };
                  }
                };
              })
          .factory(
              'Authenticate',
              function(AuthService) {
                var newUsersDBConnection = {
                  complete : "https://wentworthinspections.iriscouch.com/newUsersDBTemplate/",
                  protocol : "https://",
                  domain : "wentworthinspections.iriscouch.com",
                  port : "",
                  db : "newUsersDBTemplate/"
                };

                return {
                  'login' : function(loginuser, loggedInClientSideCallback) {
                    OPrime.debug("Authenticating " + loginuser.username);
                    /*
                     * If the person trying to log in, isn't in the active user,
                     * then add them to the list and set them as the active
                     * user.
                     */
                    var usersIndexInKnownUsers = _.pluck(auth.users, "username").indexOf(
                        loginuser.username);
                    if (usersIndexInKnownUsers == -1) {
                      auth.users.unshift(AuthService.newUser({
                        username : loginuser.username
                      }));
                    } else {
                      var knownuser = auth.users.splice(usersIndexInKnownUsers, 1);
                      auth.users.unshift(knownuser[0]);
                      OPrime.debug("Welcome back " + auth.users[0].username + "!");
                    }
                    if (typeof loggedInClientSideCallback == "function") {
                      loggedInClientSideCallback();
                    }
                  },
                  'logout' : function() {
                    auth.users[0].hash = undefined;
                    auth.users[0].validated = false;
                    AuthService.saveAuth();
                    window.location.replace(AuthService.getWebsiteURL());
                    return;
                  },
                  'register' : function(couchuser) {
                    alert("TODO write functions to create a database, if this is a valid platform user.. and to turn on replication and redirect to users touchdb if they are on an android.");

                    return;
                  }
                };
              });

      console.log("Declaring AuthenticationServices");

      return AuthenticationServices;

    });