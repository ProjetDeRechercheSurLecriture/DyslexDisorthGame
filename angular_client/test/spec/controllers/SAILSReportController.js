'use strict';

describe('Controller: SAILSReportController', function () {

  // load the controller's module
  beforeEach(module('adminDashboardApp'));

  var SAILSReportController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SAILSReportController = $controller('SAILSReportController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings).toBeUndefined();
  });
});
