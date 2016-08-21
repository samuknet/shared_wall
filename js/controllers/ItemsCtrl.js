angular.module('sharedWall')
    .controller('ItemsCtrl', ['$scope', 'TypeService', 'ItemService', function($scope, TypeService, ItemService) {
        $scope.types = TypeService.types;
        ItemService.getItems().then((items) => {
            $scope.items = items;
        });
    }]);
