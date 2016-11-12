
var app = require('express')(),
  swig = require('swig'),
  people;
  var express = require("express");
  var appp     = express();
  var http = require('http');
var bodyParser = require('body-parser');
var app2 = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});
app.use(bodyParser.text()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var io = require('socket.io').listen(app2);

var fs = require('fs');

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.set('view cache', false);

swig.setDefaults({ cache: false });


app.use('/public', express.static(__dirname + "/Script/public"));

app.get('/', function (req, res) {
	var baseline = {data:''}
	baseline['data'] = req.headers
  if(Object.keys(req.query)[0] != null){
  baseline['data']['Query String'] = Object.keys(req.query)[0]
}
  res.render('index', baseline);
});

app.get('/api', function (req, res) {
  res.sendFile('/home/admin/' + Object.keys(req.query)[0] +'.json');
});


app.post('/post', function (req, res) {
  console.log(req.query.f)
fs.writeFile('data/' + req.query.f , req.body, function (err) {
});
res.send('success')
});

app.listen(8080);
console.log('Application Started');
