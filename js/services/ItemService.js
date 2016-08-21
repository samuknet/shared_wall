angular.module('sharedWall')
    .service('ItemService', ['$http', function($http) {
        this.items = [];
        // http://192.168.0.9/shared_wall/public/items
        $http.get('items.json').then((response) => {
            var items = response.data;
            items.forEach((item) => {
                this.items.push(item);
            });
        }, (err) => {
            console.log(err);
        });

        this.addItem = function (type, title, url, image) {
            // TODO: post to server

            $http({
                method: 'POST',
                url: 'http://192.168.0.9/shared_wall/public/items',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    type: type,
                    title: title,
                    url: url,
                    image: image
                },
                transformRequest: function (data, headersGetter) {
                    var formData = new FormData();
                    angular.forEach(data, function (value, key) {
                        formData.append(key, value);
                    });

                    var headers = headersGetter();
                    delete headers['Content-Type'];

                    return formData;
                }
            })
            .success(function (data) {
            this.items.push(data);
            })
            .error(function (data, status) {
            console.log('err');
            });
            
        };
    }]);