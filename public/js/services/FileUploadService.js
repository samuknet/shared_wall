angular.module('sharedWall')
    .service('FileUploadService', ['$http', function ($http) {
        this.uploadFileToUrl = function(uploadUrl, file, additionalData){
            var fd = new FormData();
            fd.append('file', file);
            for (var key in additionalData) {
                fd.append(key, additionalData[key]);
            }
            fd.append('test', 'hi');
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
          
        }
    }]);