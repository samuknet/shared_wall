angular.module('sharedWall')
    .controller('NavCtrl', ['$scope', 'ItemService', function($scope, ItemService) {
        $scope.isActive = false;
        $scope.toggle = function() {
            $scope.isActive = !$scope.isActive;
        }
    }]);

angular.module('sharedWall')
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                
                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

angular.module('sharedWall')
.controller('AddItemFormCtrl', ['$scope', '$http', 'TypeService', 'ItemService', function($scope, $http, TypeService, ItemService) {
    $scope.types = TypeService.types;
    $scope.valid = false;
    $scope.type = '';
    $scope.title = '';
    $scope.url = '';
    $scope.addItem = function (type, title, url) {
        if (!$scope.valid || !type || !title || (type !== 'image') && !url) {
            // Invalid
            addItemForm.classList.add('form-invalid');
            return;
        }
        
        addItemForm.classList.remove('form-invalid');
        ItemService.addItem(type, title, url, $scope.imageFile);

        // Reset form
        // $scope.type = '';
        $scope.title = '';
        $scope.url = '';
    };  
}]);

    