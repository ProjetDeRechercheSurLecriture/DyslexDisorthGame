'use strict';

describe('Controller: SAILSReportController', function() {

  // load the controller's module
  beforeEach(module('adminDashboardApp'));

  var SAILSReportController,
    scope,
    sampleStimulusResponse = {
      participant: '2014-10-09_15.55_1412884516311',
      experimenter: 'devgina',
      stimulusId: '4e06b60e129dff5c7bb4bb234990fc37',
      stimulusRev: '3-51c1a0a46b6bba5fa990410deaa42aa3',
      prime: {
        audioFile: 'https://speechdev.lingsync.org/sails-fr-ca/GR02A_Gris_MOD.mp3',
        imageFile: '',
        orthography: 'gris',
        utterance: 'gʁi'
      },
      target: {
        orthography: 'gris',
        utterance: 'gʁi',
        imageFile: 'https://speechdev.lingsync.org/sails-fr-ca/gris.png',
        audioFile: 'https://speechdev.lingsync.org/sails-fr-ca/GR02A_Gris_MOD.mp3',
        visualChoice: 'visualChoiceA'
      },
      response: {
        reactionTimeAudioOffset: 1077.3,
        reactionTimeAudioOnset: 1941,
        reactionTimeVisualOffset: 25860,
        reactionTimeVisualOnset: 25860,
        x: 216,
        y: 233,
        pageX: 216,
        pageY: 233,
        choice: {
          orthography: 'gris',
          utterance: 'gʁi',
          imageFile: 'https://speechdev.lingsync.org/sails-fr-ca/gris.png',
          audioFile: 'https://speechdev.lingsync.org/sails-fr-ca/GR02A_Gris_MOD.mp3',
          visualChoice: 'visualChoiceA'
        },
        score: 1
      },
      score: 1,
      itemNumberInExperiment: 1,
      subexperimentLabel: 'Practique'
    };

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    SAILSReportController = $controller('SAILSReportController', {
      $scope: scope
    });
  }));

  it('should attach a stimuli corpus to the scope', function() {
    expect(scope.stimuliCorpus).toBeDefined();
    expect(scope.stimuliCorpus.dbname).toEqual('sails-fr-ca');
    expect(scope.loading).toBeTruthy();
  });

  it('should attach a reactionTimeLineChart to the scope', function() {
    expect(scope.reactionTimeLineChart.options.chart.x(sampleStimulusResponse)).toEqual(1);
    expect(scope.reactionTimeLineChart.options.chart.y(sampleStimulusResponse)).toEqual(1077.3);
    expect(scope.reactionTimeLineChart.participants).toEqual([]);
  });

  it('should ignore outliers', function() {
    expect(typeof scope.isOutlier).toEqual('function');
    expect(scope.isOutlier({})).toBeTruthy();
    expect(scope.isOutlier(sampleStimulusResponse)).toBeFalsy();
  });


  it('should be able to reload the responses upon user request', function() {
    expect(typeof scope.loadResponses).toEqual('function');

    scope.loadResponses([
      [1412884509802, {
        'participant': '2014-10-09_15.55_1412884516311',
        'experimenter': 'devgina',
        'stimulusId': '4e06b60e129dff5c7bb4bb2349916da1',
        'stimulusRev': '3-35925209be0c47a47782939a7996afa6',
        'prime': {
          'audioFile': 'https://speechdev.lingsync.org/sails-fr-ca/GR17A_Gris_MOD.mp3',
          'imageFile': '',
          'orthography': 'gris',
          'utterance': 'gji'
        },
        'target': {
          'orthography': 'gris',
          'utterance': 'gji',
          'imageFile': 'https://speechdev.lingsync.org/sails-fr-ca/pas_gris.png',
          'audioFile': 'https://speechdev.lingsync.org/sails-fr-ca/GR17A_Gris_MOD.mp3',
          'visualChoice': 'visualChoiceB'
        },
        'response': {
          'reactionTimeAudioOffset': 845.55,
          'reactionTimeAudioOnset': 1448,
          'reactionTimeVisualOffset': 285,
          'reactionTimeVisualOnset': 285,
          'x': 217,
          'y': 200,
          'pageX': 217,
          'pageY': 200,
          'choice': {
            'imageFile': 'gris.png',
            'utterance': 'gʁi',
            'orthography': 'gris',
            'audioFile': '',
            'visualChoice': 'visualChoiceA'
          },
          'score': 0
        },
        'score': 0,
        'itemNumberInExperiment': 13,
        'subexperimentLabel': 'Test'
      }],
      [1412889932215, {
        'participant': '2014-10-09_17.25_1412889940161',
        'experimenter': 'devgina',
        'stimulusId': '4e06b60e129dff5c7bb4bb234990fc37',
        'stimulusRev': '3-51c1a0a46b6bba5fa990410deaa42aa3',
        'prime': {
          'audioFile': 'https://speechdev.lingsync.org/sails-fr-ca/GR02A_Gris_MOD.mp3',
          'imageFile': '',
          'orthography': 'gris',
          'utterance': 'gʁi'
        },
        'target': {
          'orthography': 'gris',
          'utterance': 'gʁi',
          'imageFile': 'https://speechdev.lingsync.org/sails-fr-ca/gris.png',
          'audioFile': 'https://speechdev.lingsync.org/sails-fr-ca/GR02A_Gris_MOD.mp3',
          'visualChoice': 'visualChoiceA'
        },
        'response': {
          'reactionTimeAudioOffset': 319.29999999999995,
          'reactionTimeAudioOnset': 1183,
          'reactionTimeVisualOffset': 2186,
          'reactionTimeVisualOnset': 2186,
          'x': 434,
          'y': 433,
          'pageX': 434,
          'pageY': 433,
          'choice': {
            'orthography': 'gris',
            'utterance': 'gʁi',
            'imageFile': 'https://speechdev.lingsync.org/sails-fr-ca/gris.png',
            'audioFile': 'https://speechdev.lingsync.org/sails-fr-ca/GR02A_Gris_MOD.mp3',
            'visualChoice': 'visualChoiceA'
          },
          'score': 1
        },
        'score': 1,
        'itemNumberInExperiment': 10,
        'subexperimentLabel': 'Practique'
      }],
      [1412910271673, sampleStimulusResponse]
    ]);
    expect(scope.participants['2014-10-09_17.25_1412889940161']).toBeDefined();
    expect(scope.reactionTimeLineChart.participants.length).toEqual(2);
    expect(scope.reactionTimeLineChart.participants[0].values.length).toEqual(14);
    expect(scope.reactionTimeLineChart.participants[0].values[0]).toEqual({});
    expect(scope.reactionTimeLineChart.participants[0].values[2]).toEqual(undefined);
    expect(scope.reactionTimeLineChart.participants[1].values[10].stimulusId).toEqual('4e06b60e129dff5c7bb4bb234990fc37');
    expect(scope.reactionTimeLineChart.participants[0].values[13].stimulusId).toEqual('4e06b60e129dff5c7bb4bb2349916da1');
    expect(scope.reactionTimeLineChart.participants[0].mean).toEqual(136.34642857142856);
    expect(scope.reactionTimeLineChart.participants[0].key).toEqual('2014-10-09_15.55_1412884516311');
    expect(scope.reactionTimeLineChart.participants[1].key).toEqual('2014-10-09_17.25_1412889940161');
  });

});
