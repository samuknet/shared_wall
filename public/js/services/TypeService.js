angular.module('sharedWall')
    .service('TypeService', function() {
        this.types = [{name: 'image'}, {name: 'spotify'}, {name: 'youtube'}, {name: 'link'}];
    });