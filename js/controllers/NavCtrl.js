angular.module('sharedWall')
    .controller('NavCtrl', ['$scope', 'TypeService', 'ItemService', function($scope, TypeService, ItemService) {
        $scope.isActive = false;
        $scope.types = TypeService.types;
        $scope.toggle = function() {
        	$scope.isActive = !$scope.isActive;
        }
    }]);
