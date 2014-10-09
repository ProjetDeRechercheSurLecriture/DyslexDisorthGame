/* globals FieldDB, d3 */
'use strict';

/**
 * @ngdoc function
 * @name adminDashboardApp.controller:SAILSReportController
 * @description
 * # SAILSReportController
 * Controller of the adminDashboardApp
 */
angular.module('adminDashboardApp').controller('SAILSReportController', function($scope, $timeout) {
  $scope.loading = true;
  $scope.options = {
    chart: {
      type: 'scatterChart',
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 60,
        left: 65
      },
      x: function(stimulusResponse) {
        // "itemNumberInExperiment": 9,
        //       "subexperimentLabel": "Test"
        if (stimulusResponse && stimulusResponse.itemNumberInExperiment) {
          return stimulusResponse.itemNumberInExperiment;
        } else {
          return 0;
        }
      },
      y: function(stimulusResponse) {
        console.log('getting y', stimulusResponse);
        if (stimulusResponse && stimulusResponse.response && stimulusResponse.response.reactionTimeAudioOffset) {
          return stimulusResponse.response.reactionTimeAudioOffset ;
        } else {
          return 0;
        }
      },
      average: function(d) {
        // return d.mean;
        return d.mean ;
      },

      color: d3.scale.category10().range(),
      transitionDuration: 300,
      useInteractiveGuideline: true,
      clipVoronoi: false,

      xAxis: {
        // axisLabel: 'X Axis',
        tickFormat: function(stimulusNumberInExperiment) {
          // if (stimulusResponse && stimulusResponse.stimulusId) {
          //   return stimulusResponse.stimulusId;
          // } else {
          //   return "NA";
          // }
          if (stimulusNumberInExperiment && stimulusNumberInExperiment) {
            return stimulusNumberInExperiment;
          } else {
            return "NA";
          }

          //todo DONT make it a date
          // return d3.time.format('%m/%d/%y')(new Date(d));
        },
        showMaxMin: true
        // staggerLabels: true
      },

      yAxis: {
        axisLabel: 'Reaction Time Post Audio Offset (ms)',
        tickFormat: function(reactionTimeAudioOffset) {
          // return reactionTimeAudioOffset;
          return d3.format(',f')(reactionTimeAudioOffset);
          // return d3.format(',.1%')(reactionTimeAudioOffset);
        },
        showMaxMin: true,
        axisLabelDistance: 20
      }
    }
  };

  $scope.data = [];

  var isOutlier = function(response) {
    return false;
  };
  $timeout(function() {
    if (FieldDB && FieldDB.FieldDBObject && FieldDB.FieldDBObject.application && FieldDB.FieldDBObject.application.corpus) {
      FieldDB.FieldDBObject.application.corpus.fetchCollection('experiments', null, null, null, null, 'sails').then(function(results) {
        $scope.results = results;
        if (!$scope.$$phase) {
          $scope.$digest(); //$digest or $apply
        }
      });
      $scope.loading = false;

      FieldDB.FieldDBObject.application.corpus.fetchCollection('responses').then(function(responses) {

        var fossil = {};
        responses = fossil.rows.map(function(doc) {
          return doc.value;
        });
        $scope.data = [];
        $scope.participants = {};

        responses.map(function(response) {
          if (!response || !response[1] || !response[1].participant) {
            console.warn('this response contains no participant. not including it', response);
            return;
          }
          var participantId = response[1].participant;
          $scope.participants[participantId] = $scope.participants[participantId] || {
            key: participantId,
            values: []
          };
          if (!isOutlier(response)) {
            $scope.participants[participantId].values.push(response[1]);
          }
        });
        var totalResponseTimeSum = 0;
        var totalResponseCount = 0;
        for (var participant in $scope.participants) {
          if (!$scope.participants.hasOwnProperty(participant)) {
            continue;
          }
          var participantResponseTimeSum = 0;
          $scope.participants[participant].values.map(function(response) {
            if (response && response.response && response.response.reactionTimeAudioOffset) {
              participantResponseTimeSum = participantResponseTimeSum + response.response.reactionTimeAudioOffset;
            }
          });
          totalResponseTimeSum = totalResponseTimeSum + participantResponseTimeSum;
          totalResponseCount = totalResponseCount + $scope.participants[participant].values.length;
          $scope.participants[participant].mean = participantResponseTimeSum / $scope.participants[participant].values.length;
          $scope.data.push($scope.participants[participant]);
        }
        $scope.totalResponseCount = totalResponseCount;
        $scope.totalResponseTimeSum = totalResponseTimeSum;
        $scope.overallResponseTimeMean = totalResponseTimeSum / totalResponseCount;
        console.log("Mean overall response time ", $scope.overallResponseTimeMean);
        if (!$scope.$$phase) {
          $scope.$digest(); //$digest or $apply
        }
      });

    }
  }, 1000);
});
