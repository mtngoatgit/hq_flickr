angular
  .module('flickrApp')
  .controller('flickrCtrl', function($scope, flickrSrvc){

    $scope.postSearch = function(search) {
      flickrSrvc.postSearch(search).then(function(response){
        $scope.search.term = null;
        flickrSrvc.getPhotos(search).then(function(response){
          console.log(response);
          response == false ? ($scope.notfound = "No Results", $scope.photos = response
            ) : (
              $scope.photos = response, $scope.notfound = ""
            );
        })
      })
    }

    $scope.clearInput = function(){
      $scope.search = null;
    }

  })
