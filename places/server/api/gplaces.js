var request = require('request')


exports.search = function(query, callback) {
  console.log('search')
  if (typeof query !== 'string' || query.length === 0) {
  	console.log('No input for query')
    callback({code:400, response:{status:'error', message:'No input for query'}})
  }

  const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
  const query_string = {q: query, maxResults: 40, html_attributions: 'results(id,name,place_id,geometry(location.lat(),location.lng()))'}
  request.get({url: url, qs: query_string}, function(err, res, body) {	//body is a string
    if (err) {
    	console.log('Google search has failed')
      return callback({code:500, response:{status:'error', message:'Google search has failed', data:err}})
    }
    
    
        exports.search = function() {
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
	      return {id:element.id, name:element.name, place_id:element.placeid, geometry:{lat:element.geometry.location.lat(), lng:element.geometry.location.lng()}}
	    })
	    console.log(places.length +' places found')
	    callback({code:200, response:{status:'success', message:'Google places found', data:places}})
    }
    else
    	callback({code:500, response:{status:'No places found', message:'Google Search failed', data:''}})
  })
}


