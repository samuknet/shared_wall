angular.module('sharedWall')
    .controller('ItemsCtrl', ['$scope', '$sce', 'TypeService', 'ItemService', function($scope, $sce, TypeService, ItemService) {
        $scope.types = TypeService.types;
        $scope.items = ItemService.items;

        $scope.onItemClick = (item) => {
            if (item.type === 'link') {
                window.location.href = item.content.url;
            }
        };

        $scope.getItemClass = (item) => {
            return 'item ' + 'item-' + item.type; 
        }
        $scope.getSpotifyIFrameSrc = (url) => {
            var url = 'https://embed.spotify.com/?theme=white&uri=' + encodeURIComponent(url);
            return $sce.trustAsResourceUrl(url);
        };

        $scope.cursor = 'pointer';

        var queryString = function (url) {
          var query_string = {};

          var query = url.substr(url.indexOf('?') + 1);
          var vars = query.split("&");
          for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
                // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
              query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
              var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
              query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
              query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
          } 
          return query_string;
        };

        $scope.getYoutubeIFrameSrc = (url) => {
            var youtubeVideoId = queryString(url).v;
            var url = 'https://www.youtube.com/embed/' + youtubeVideoId + '?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0';
            return $sce.trustAsResourceUrl(url);
        };
        // ItemService.getItems().then((items) => {
            // $scope.items = items;
        // });
    }]);
