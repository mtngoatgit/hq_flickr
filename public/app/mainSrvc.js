angular
  .module('flickrApp')
  .service('flickrSrvc', function($http){

      this.postSearch = function(search) {
        return $http.post('/photos/' + search).then(function(response){
          console.log("RESPONSE IN mainSERVICE", response.data);
          response.data == "not found" ? "not found" : response.status;
        })
      }

      this.getPhotos = function(term){
        return $http.get('/photos/' + term).then(function(response){
          return response.data;
        })
      }


  })
