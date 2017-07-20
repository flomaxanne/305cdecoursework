var request = require('request')


exports.search = function(query, callback) {
  console.log('search')
  if (typeof query !== 'string' || query.length === 0) {
  	console.log('No input for query')
    callback({code:400, response:{status:'error', message:'No input for query'}})
  }


        $scope.search = function() {
        request.get(Map.search($scope.searchTerm)
        .then(
            function(err,res,body) { // success
            if (err) {
          	console.log('Google Search failed')
             return callback({code:500, response:{status:'error', message:'Google Search failed', data:err}})
    }
            }
        )
    )};
    
    

    const json = JSON.parse(body)	//convert body to object
    const results = json.results
    if (results){
	    const places = results.map(function(element) {
	      return {id:element.id, name:element.name, place_id:element.placeid, geometry:{lat:element.geometry.location.lat(), lng:element.geometry.location.lng(),
	              types:element.types, rating:element.rating, icon:element.icon
	              
	      }}
	    })
	    console.log(places.length +' places found')
	    callback({code:200, response:{status:'success', message:'Google places found', data:places}})
    }
    else
    	callback({code:500, response:{status:'No places found', message:'Google Search failed', data:''}})
  
}


