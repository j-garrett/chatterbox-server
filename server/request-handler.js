var fs = require('fs');
// var index = './client/index.html';

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

var requestHandler = function(req, res) {  
  console.log(req.url);

  if (req.url === '/') { //req.url has the pathname, check if it conatins '.html'

    fs.readFile(__dirname + '/../client/index.html', function (err, data) {
      if (err) { console.log(err); }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });

  }

  if (req.url.indexOf('.js') !== -1) { //req.url has the pathname, check if it conatins '.js'

    fs.readFile(__dirname + '/../client/scripts/app.js', function (err, data) {
      if (err) { console.log(err); }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });

  }

  if (req.url.indexOf('.css') !== -1) { //req.url has the pathname, check if it conatins '.css'

    fs.readFile(__dirname + '/../client/styles/styles.css', function (err, data) {
      if (err) { console.log(err); }
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  }

  if (req.url.indexOf('.gif') !== -1) { //req.url has the pathname, check if it conatins '.css'

    fs.readFile(__dirname + '/../client/images/spiffygif_46x46.gif', function (err, data) {
      if (err) { console.log(err); }
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  }

  if (req.url === '/classes/messages' || req.url === '/classes/room' ) {
    console.log('arrived at poop station');
    var statusCode = 200;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'application/json';

    if (req.method === 'GET') {
      res.writeHead(statusCode, headers);    
      res.end(JSON.stringify(storage));
    }

    if (req.method === 'POST') {

      var temp = '';
      statusCode = 201;

      req.on('data', function(chunk) {
        temp += chunk;
      });

      req.on('end', function() {
        var data = JSON.parse(temp);
        data.objectId = ++objectId;
        storage.results.push(data);
      });

    }

    headers['Content-Type'] = 'text/plain';

    res.writeHead(statusCode, headers);

    res.end(JSON.stringify(storage));
  }

  // if (req.url !== '/classes/messages' && req.url !== '/classes/room') {
  //   statusCode = 404;
  //   res.writeHead(statusCode, headers);
  //   res.end();
  // }

  // if (req.method === 'GET') {
  //   res.writeHead(statusCode, headers);    
  //   res.end(JSON.stringify(storage));
  // }

  // if (req.method === 'POST') {

  //   var temp = '';
  //   statusCode = 201;

  //   req.on('data', function(chunk) {
  //     temp += chunk;
  //   });

  //   req.on('end', function() {
  //     var data = JSON.parse(temp);
  //     data.objectId = ++objectId;
  //     storage.results.push(data);
  //   });

  // }

  // headers['Content-Type'] = 'text/plain';

  // res.writeHead(statusCode, headers);

  // res.end(JSON.stringify(storage));

};




exports.requestHandler = requestHandler;




