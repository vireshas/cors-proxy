'use strict';
var http = require('http');
var url = require('url');
var marked = require('marked');
var request = require('request');
var readFile = require('fs').readFile;

var server = http.createServer(function (req, resp) {
  var headers = {};
  var regex = '(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})';

  headers["Access-Control-Allow-Origin"] = "*";
  headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
  headers["Access-Control-Allow-Credentials"] = true;
  headers["Access-Control-Max-Age"] = '86400';
  headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";

  if (req.url === '/' || req.url === '/favicon.ico') {
    readFile('./README.md', {encoding: 'utf-8'}, function(err, readmeStr) {
      marked(readmeStr, function(err, content) {
        if (err) {
          resp.end(JSON.stringify({ error: 'You shouldnt be reaching here!'}));
        }
        headers['Content-Type'] = 'text/html';
        resp.writeHead(200, headers);
        resp.end(content);
      });
    });
  } else {

    var urlRegex = new RegExp(regex, 'i');
    var urlToHit = req.url.replace('/','');
    urlToHit = urlToHit.replace( /https?\:\/\/?/g, 'https://' );

    if ( !urlRegex.test(urlToHit) ) {
      resp.writeHead(403, {});
      resp.end(JSON.stringify({ error: "Invalid URL: " + urlToHit}));
    }

    console.log("URL: " + urlToHit)
    request(
      {
        url: urlToHit,
        method: req.method,
        json: req.body,
        timeout: 3000
      },
      function (error, response, body) {
        if (error) {
          if (response) {
            resp.writeHead(response.statusCode, response.headers);
          } else {
            resp.writeHead(500, {});
          }
          resp.end(JSON.stringify({ error: "" + error}));
        }
      }
    ).pipe(resp);
  }
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log("Server running at http://127.0.0.1/ on port " + port);
});
