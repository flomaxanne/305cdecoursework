var books = require('./gplaces.js')
var restify = require('restify')
var server = restify.createServer()

/* import the required plugins to parse the body and auth header. */
server.use(restify.queryParser())		//to read querystring params
server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())


server.get('/search', function(req, res) {
	const searchTerm = req.query.q
  console.log('GET /search?q=' + searchTerm)

  // this is where you access MongoDb

  // this is where you access the external API for data
  books.search(searchTerm, function(data) {
    console.log('Responding...' + JSON.stringify(data))
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    //res.setHeader("Access-Control-Allow-Origin", "*")	//https://cde305-permacultureprogrammer.c9users.io:8081
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
    res.setHeader('Content-Type', 'application/json');
    res.send(data.code, data.response);
    console.log(JSON.stringify(data.response))
    res.end();
  })
})





//=========================================================================



var port = 8081;
server.listen(port, function (err) {
  if (err) {
      console.error(err);
  } else {
    console.log('App is ready at : ' + port);
  }
})
