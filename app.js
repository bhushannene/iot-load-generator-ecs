
var http = require('http');
var uuid = require('uuid');

var user = {
  userId: 'bnene',
  propertyId: 'US-SFO-HYATT',
  propertyLocation: 'US',
  action: 'view',
  timestamp:''
};

var hotels = [{ "days": [], "menuItems": [{ "name": "King Bed", "price": 175 }, { "name": "Double Bed", "price": 175 }], "price": 3, "rating": 3, "id": "hyatt-emeryville", "name": "Hyatt house Emeryville", "cuisine": "us", "opens": "11:30:00", "closes": "22:30:00", "location": "22 Teutonic Ave.", "description": "Located at the foot of the San Francisco Bay Bridge near Oakland and Berkeley." },
{ "days": [], "menuItems": [{ "name": "Bay View", "price": 350 }, { "name": "City View", "price": 250 }], "price": 4, "rating": 4, "id": "hyatt-miami-blue", "name": "Hyatt Miami at The Blue", "cuisine": "us", "opens": "11:30:00", "closes": "22:30:00", "location": "22 Teutonic Ave.", "description": "Escape to Doral, just 20 minutes west of downtown Miami. Golf fanatics, spa lovers and foodies alike." },
{ "days": [], "menuItems": [{ "name": "Standard", "price": 250 }, { "name": "Excutive Suite", "price": 300 }], "price": 3, "rating": 1, "id": "hyatt-london", "name": "Hyatt Regency London", "cuisine": "europe", "opens": "11:30:00", "closes": "22:30:00", "location": "22 Teutonic Ave.", "description": "One of the finest 5 star hotels in London, Hyatt Regency London - The Churchill enjoys a prime location in Central London's West End." },
{ "days": [], "menuItems": [{ "name": "Water View", "price": 650 }, { "name": "Junior Suite", "price": 800 }], "price": 5, "rating": 4, "id": "hyatt-hk", "name": "Grand Hyatt Hong Kong", "cuisine": "asia", "opens": "11:30:00", "closes": "22:30:00", "location": "22 Teutonic Ave.", "description": " Ideally situated in the “heart of the city”, Hong Kong Island’s Wanchai district." }
];

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
      path: '/telemetry/hotel-view-telemetry',
      //path: '/telemetry',
      method: 'POST',
      headers: headers
    };
    var req = http.request(options, function(res) {
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

/*var PostUserDataInBatch = function (numUsers)
{
    while (numUsers > 0)
    {
        numUsers--;

        var num = Math.random() * 100;
        if (num < 90)
            user.action = 'view';
        else
            user.action = 'book';

        var num = Math.round (Math.random() * 100);
        user.propertyId = num.toString();
        if (num < 60)
            user.propertyLocation = 'US';
        else if (num < 90)
            user.propertyLocation = 'EUROPE';
        else
            user.propertyLocation = 'ASIA';

        user.userId = uuid.v4();
        user.timestamp = Date.now();

        PostData(user);
    }
} */

//var batchSize = 100;
//setInterval (function(){ PostUserDataInBatch(batchSize); }, 10);

//while (iterations > 0)
//{
//    iterations--;
//    setTimeout (PostUserDataInBatch(batchSize), 10000);

//}
var iterations = 100;

while (iterations > 0)
{
    iterations--;

    var num = Math.random() * 100;
    if (num < 90)
        user.action = 'view';
    else
        user.action = 'book';

    var num = Math.round(Math.random() * 100);
    var index = num % hotels.length;
    var hotel = hotels[index];
    user.propertyId = hotel.id;
    user.propertyLocation = hotel.cuisine;

    //user.propertyId = num.toString();
    //if (num < 60)
    //    user.propertyLocation = 'US';
    //else if (num < 90)
    //    user.propertyLocation = 'EUROPE';
    //else
    //    user.propertyLocation = 'ASIA';

    user.userId = uuid.v4();
    user.timestamp = Date.now();

    PostData(user);
}

