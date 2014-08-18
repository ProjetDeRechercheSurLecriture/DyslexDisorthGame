'use strict';

describe('Controller: MainController', function () {

  // load the controller's module
  beforeEach(module('adminDashboardApp'));

  var MainController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainController = $controller('MainController', {
      $scope: scope
    });
  }));

  it('should have an empty scope', function () {
    expect(scope.awesomeThings).toBe(undefined);
  });
});
