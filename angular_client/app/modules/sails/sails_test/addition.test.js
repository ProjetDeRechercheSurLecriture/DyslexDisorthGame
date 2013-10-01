/*global describe it expect */

describe('SAILS', function() {

    it('should return 4 when adding 2 and 2', function() {
        expect(2 + 2).toBe(4);
    });

    // beforeEach(module('SAILS'));
    // console.log('test');

    // describe('Product Search Controller', function() {

    //   //require(['CatalogManagement/ProductSearch/ProductSearchController'], function () {

    //   var scope;

    //   beforeEach(inject(function($rootScope, $controller) {

    //     scope = $rootScope.$new();
    //     $controller('ProductSearchController', {
    //       $scope: scope
    //     });
    //   }));

    //   it('controller values returned', function() {

    //     expect(scope.test).toBe("test");
    //   });

    //   //});

    // });
  // });

});


// describe('SAILS', function() {
//   // 'use strict';

//   // describe('addition', function() {
//   'use strict';

//   var scope, controller;
//   beforeEach(angular.mock.module('SAILS'));


// beforeEach(module(function($provide) {
//   var service = {
//     blankSAILSTemplate: function() {
//       return true;
//     }
//   };
//   $provide.value('SAILS_data', service);
// }));

// it('should return 4 when adding 2 and 2', function() {
//   expect(2 + 2).toBe(4);
// });

// describe('SAILS_data test', function() {
//   describe('when I call SAILS_data.blankSAILSTemplate', function() {
//     it('returns object', function() {
//       var $injector = angular.injector(['SAILS.services']);
//       var service = $injector.get('SAILS_data');
//       expect(service.blankSAILSTemplate).not.toBe(null);
//     });
//   });
// });
// });