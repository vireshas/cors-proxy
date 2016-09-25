'use strict';
var request = require('request');
var util = require('util');

exports.handler = function(event, context, callback) {

  console.log("MY Event:\n", util.inspect(event, {depth: 5}));

  var headers = {};
  headers["Access-Control-Allow-Origin"] = "*";
  headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
  headers["Access-Control-Allow-Credentials"] = true;
  headers["Access-Control-Max-Age"] = '86400';
  headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";

  var response = {};
  response["headers"] = headers;
  var urlToHit = event.queryStringParameters.url;

  console.log("response " + response)
  console.log("URL: " + urlToHit);

  request(
    {
      url: urlToHit,
      method: context.httpMethod,
      timeout: 3000
    },
    function (error, response, body) {
      if (error) {
				callback({ error: error })

      }
    }

  ).on('error', function(response) {
    callback({ error: "Internal server error" })
  }).on('response', function(response) {
    response.on('data', function(data) {
      callback(null, String(data))
    })
  })
}
