angular.module('sharedWall')
    .service('ItemService', ['$http', 'FileUploadService', function($http, FileUploadService) {
        this.items = [];
        var self = this;
        $http.get('/items').then(function (response) {
            var items = response.data;
            items.forEach(function (item) {
                self.items.push(item);
            });
        }, function (err) {
            console.log(err);
        });

        this.addItem = function (type, title, url, imageFile) {
            var items = this.items;
            var item = {
                    type: type,
                    title: title,
                    url: url
            };
            var promise;
            // If uploading file, use special file upload request, otherwise use normal post request
            if (type === 'image' && imageFile) {
                // Use file upload
                promise = FileUploadService.uploadFileToUrl('/items', imageFile, item);
            } else {
                promise =  $http({
                    method: 'POST',
                    url: '/items',
                    data: item
                });
            }

            // Handle result
            promise          
                .success(function (data) {
                    items.push(data);
                })
                .error(function (data, status) {
                    console.log('err');
                });
            
        };

        this.deleteItem = function(itemToDelete) {
            /*
                Assume the item will be deleted
                successfully and remove it immediately
                from the display.

                In the unlikely event the delete
                turns out to fail, re add it back
            */

            var index = _.findIndex(self.items, {_id: itemToDelete._id});
            self.items.splice(index, 1);



            return $http.delete('/items/' + itemToDelete._id)
            .success(function () {
                // Already deleted!
            })
            .error(function() {
                // The delete failed, add it back in as we predicted wrong.
                self.items.splice(index, 0, itemToDelete);
            })
            ;
        }
    }]);