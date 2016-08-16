
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


var storage = {
  results: [{username: 'Dan', text: 'Banana!', objectId: 0 }, {username: 'jon', text: 'Gorilla!', objectId: 1 }]
};
var objectId = 1;

var requestHandler = function(request, response) {  

  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  if (request.url !== '/classes/messages' && request.url !== '/classes/room') {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }

  if (request.method === 'GET') {
    response.writeHead(statusCode, headers);    
    response.end(JSON.stringify(storage));
  }

  if (request.method === 'POST') {

    var temp = '';
    statusCode = 201;

    request.on('data', function(chunk) {
      temp += chunk;
    });

    request.on('end', function() {
      var data = JSON.parse(temp);
      data.objectId = ++objectId;
      storage.results.push(data);
    });

  }

  // headers['Content-Type'] = 'text/plain';

  response.writeHead(statusCode, headers);

  response.end(JSON.stringify(storage));
};

exports.requestHandler = requestHandler;
