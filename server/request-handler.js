
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


var storage = {
  results: []
};

var requestHandler = function(request, response) {  

  var statusCode = 200;
  var headers = defaultCorsHeaders;
  var endpoint = request.url.substring(0, 17);
  
  if (endpoint !== '/classes/messages') {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }

  if (request.method === 'GET') {
    response.end(JSON.stringify(storage));
  }

  if (request.method === 'POST') {
    var temp = '';
    statusCode = 201;
    // storage.results.push()
    request.on('data', function(chunk) {
      temp += chunk;
    }).on('end', function() {
      storage.results.push(JSON.parse(temp));
    });

  }

  headers['Content-Type'] = 'text/plain';

  response.writeHead(statusCode, headers);

  response.end(JSON.stringify(storage));
};

exports.requestHandler = requestHandler;
