var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile('read.txt', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(data);
    res.end();
  });
}).listen(4000);