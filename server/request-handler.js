var fs = require('fs');

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

  // console.log(req.url, req);

  if (req.url === '/' || req.url.indexOf('/?username=') !== -1) { //req.url has the pathname, check if it conatins '.html'  || req.url === '/?username=' + username

    fs.readFile(__dirname + '/../client/index.html', function (err, data) {
      if (err) { console.log(err); }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });

  }

  if (req.url.indexOf('app.js') !== -1) { //req.url has the pathname, check if it conatins '.js'

    fs.readFile(__dirname + '/../client/scripts/app.js', function (err, data) {
      if (err) { console.log(err); }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });

  }

  if (req.url.indexOf('config.js') !== -1) { //req.url has the pathname, check if it conatins '.js'

    fs.readFile(__dirname + '/../client/env/config.js', function (err, data) {
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

  if (req.url.indexOf('/classes/messages') !== -1 || req.url.indexOf('/classes/room') !== -1) {
    
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
        fs.appendFile('storage.txt', temp, (err) => {
          if (err) { console.log( err ); }
        });
        var data = JSON.parse(temp);
        console.log(data);
        data.objectId = ++objectId;
        storage.results.push(data);
      });

    }

    headers['Content-Type'] = 'text/plain';

    res.writeHead(statusCode, headers);

    res.end(JSON.stringify(storage));
  }

};




exports.requestHandler = requestHandler;




