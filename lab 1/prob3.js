var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
 fs.writeFile('write.txt', 'Hello There!!\nThis is to be written in the file', function (err) {
  if (err) throw err;
});

}).listen(4000);