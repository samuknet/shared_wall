angular.module('sharedWall')
    .service('ItemService', ['$q', '$http', function($q, $http) {
        this.getItems =  function() {
            return $q((resolve, reject)=> {
                $http.get('items.json').then((response) => {
                    resolve(response.data);
                }, reject);
            });

        };
    }]);