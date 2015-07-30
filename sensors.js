
var http = require('http');
var https = require('https');

//var uuid = require('uuid');

var sensor = {
  id: 'bnene',
  temp: 70,
  timestamp: '',
  userId: '1',
  zip: '98074',
  state: ''
};


// Setup the request.  The options parameter is
// the object we defined above.
var PostData = function (user)
{

    var userString = JSON.stringify(user);

    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': userString.length
    };

    var options = {
      host: 'localhost',
      port: 1337,
      //path: '/telemetry/hotel-view-telemetry',
      path: '/telemetry',
      method: 'POST',
      headers: headers
    };
    
    var api_gtw_options = 
    {
      host: 'b4e1adsyrb.execute-api.us-west-2.amazonaws.com',
      port: 443,
      path: '/v1/sensor',
      method: 'POST',
      headers: headers
    };
    
    
    var req = https.request(api_gtw_options, function(res) {
    //var req = http.request(options, function(res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function(data) {
        responseString += data;
        });

        res.on('end', function() {
        var resultObject = console.log(responseString);
        });
    });

    req.on('error', function(e) {
        console.log (e);
        // TODO: handle error.
    });

    req.write(userString);
    console.log ('Posting: ' + userString);

    req.end();
}


var iterations = 20;
var temp = 0;
while (iterations > 0)
{
    iterations--;

    temp = Math.round(Math.random() * 10);
    var num = Math.round(Math.random() * 100);
    if (num < 25) {
        sensor.zip = '98074';
        sensor.state = 'WA';
        sensor.temp = 60 + temp; }
    else if (num < 50) {
        sensor.zip = '90210';
        sensor.state = 'CA';
        sensor.temp = 80 + temp; }
     else if (num < 75) {
        sensor.zip = '10001';
        sensor.state = 'NY';
        sensor.temp = 40 + temp; }
     else if (num < 100) {
        sensor.zip = '33101';
        sensor.state = 'FL';
        sensor.temp = 90 + temp; }

    sensor.userId = num.toString();
    sensor.id = sensor.userId;
    sensor.timestamp = new Date().toISOString();

    PostData(sensor);
}

