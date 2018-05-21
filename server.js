// this file is the server file for the heroku deployment
var express = require('express'); 
var app = express();
// serve static assets
app.use(express.static(__dirname + '/dist'));
var port = process.env.PORT || 8080;
app.listen(port, () => console.log('running on port ' + port));