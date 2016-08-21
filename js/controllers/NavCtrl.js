angular.module('sharedWall')
    .controller('NavCtrl', ['$scope', 'ItemService', function($scope, ItemService) {
        $scope.isActive = false;
        $scope.toggle = function() {
            $scope.isActive = !$scope.isActive;
        }
    }]);

angular.module('sharedWall')
    .directive('file', function () {
    return {
        scope: {
            file: '='
        },
        link: function ($scope, el, attrs) {
            el.bind('change', function (event) {
                var file = event.target.files[0];
                $scope.file = file ? file : undefined;
                $scope.$apply();
            });
        }
    };
});
angular.module('sharedWall')
.controller('AddItemFormCtrl', ['$scope', '$http', 'TypeService', 'ItemService', function($scope, $http, TypeService, ItemService) {
    $scope.types = TypeService.types;
    $scope.valid = false;
    $scope.type = '';
    $scope.title = '';
    $scope.url = '';
    $scope.addItem = (type, title, url) => {
        if (!$scope.valid || !type || !title || (type !== 'image') && !url) {
            // Invalid
            addItemForm.classList.add('form-invalid');
            return;
        }
        
        addItemForm.classList.remove('form-invalid');

        ItemService.addItem(type, title, url, $scope.file);
                              

        // Reset form
        // $scope.type = '';
        $scope.title = '';
        $scope.url = '';
        $scope.valid = false;
    };  
}]);

    