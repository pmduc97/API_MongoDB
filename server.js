var express = require('express');
var bodyParser = require('body-parser');
var routes = require("./api/routes.js");
var app = express();
var db = require("./api/db.js");

db.on('error', function (err) {
    console.log('Ket noi MongoDB loi');
});
db.on('connected', function () {
    console.log('Ket noi MongoDB thanh cong');
    console.log('Dang ket noi Database: ' + db.name);
	console.log('--------------------------------------------');
});
//---------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(3000, function () {
    console.log("Application running on port: ", server.address().port);
});
