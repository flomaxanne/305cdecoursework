/*global angular  */

/* we 'inject' the ngRoute module into our app. This makes the routing functionality to be available to our app. */
var myApp = angular.module('myApp', ['ngRoute']) //like include, don't change

/* the config function takes an array. 1ST PART:DEFINE THE ROUTE */
myApp.config( ['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/search', {
		  templateUrl: 'pages/search.html',
      controller: 'searchController'
		})
		
	}])


myApp.service('Map', function($q) {
    
    this.init = function() {
        var options = {
        center: new google.maps.LatLng(40.7127837, -74.00594130000002),
        zoom: 13,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false,
        disableDefaultUI: true    
        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
        
        
    }
    
    this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str }, 
        function(results, status) {
          
            if (status == 'OK') {
			    d.resolve(results[0]);
			    $scope.places = results
                
            }
            else d.reject(status);
        });
        return d.promise;
    }
    
    
    this.addMarker = function(res) {
      
        if(this.marker) this.marker.setMap(null);
             
       this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
             
        this.map.setCenter(res.geometry.location);
    
}});



myApp.controller('searchController', function($scope, $http, Map) {
  
   $scope.initializeAutocomplete = function() {
     var input = document.getElementById('autocomplete');
              var options = {
                types: ['(cities)']
              };
                
               var autocomplete = new google.maps.places.Autocomplete(input, options);
  }
  
    
    $scope.places = {};
    $scope.search = function() {
        Map.search($scope.searchTerm)
        .then(
            function(res) { // success
            
                Map.addMarker(res);

                $scope.places.id =   res.place_id;
                $scope.places.placeid =   res.id;
                $scope.places.type =   res.types;
                $scope.places.rating =   res.rating;
                $scope.places.name = res.name;
                $scope.places.lat = res.geometry.location.lat();
                $scope.places.lng = res.geometry.location.lng();
                $scope.places.icon = res.photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 200 });
              }
        
        );
    }

  
    Map.init();
    
     
});


