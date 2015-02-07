var http = require('http');

/*jslint unparam: true*/
var server = http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Hello World');
  response.end();
});
/*jslint unparam: false*/

server.listen(8000, function () {
  console.log('Node server now listening on port 8000');
});