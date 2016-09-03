angular.module('sharedWall')
    .controller('NavCtrl', ['$scope', 'ItemService', function($scope, ItemService) {
        $scope.isActive = false;
        $scope.toggle = function() {
            $scope.isActive = !$scope.isActive;
        }
    }]);

angular.module('sharedWall')
.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});

angular.module('sharedWall')
.controller('AddItemFormCtrl', ['$scope', '$http', 'TypeService', 'ItemService', function($scope, $http, TypeService, ItemService) {
    $scope.imageFile = $scope.imageFile || {};
    $scope.addImageItem = function(evt) { // Called once file selected.
        var title = prompt('Enter title for image.');
        if (!title) {
            $scope.imageFile = '';
            return;
        }
        $scope.addItem('image', title, '', evt.target.files[0])
    }

    $scope.addSpotifyItem = function() {
        var title = prompt('Enter title');
        if (!title) {
            return;
        }

        var url = prompt('Enter Spotify URI');
        if (!url) {
            return;
        }

        $scope.addItem('spotify', title, url)
    }

    $scope.addYoutubeItem = function() {
        var title = prompt('Enter title');
        if (!title) {
            return;
        }

        var url = prompt('Enter Youtube URL');
        if (!url) {
            return;
        }

        $scope.addItem('youtube', title, url)
    }

    $scope.addLinkItem = function() {
        var title = prompt('Enter title');
        if (!title) {
            return;
        }

        var url = prompt('Enter Link URL');
        if (!url) {
            return;
        }

        $scope.addItem('link', title, url)
    }

    $scope.addItem = function (type, title, url, imageFile) {
        // Pre: validation already complete.
        ItemService.addItem(type, title, url, imageFile);

        // Reset form
        // $scope.type = '';
    };  
}]);

    