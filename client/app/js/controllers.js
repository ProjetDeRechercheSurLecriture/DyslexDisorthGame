'use strict';

/* Controllers */

function ParticipantListCtrl($scope, $http) {
  $http.get('data/participant_data.json').success(function(data) {
    $scope.participants = data;
  });

  $scope.orderProp = 'id';
}

PartcipantListCtrl.$inject = ['$scope', '$http'];
