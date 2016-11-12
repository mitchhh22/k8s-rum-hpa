var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');



io.on('connection', function(socket){
    socket.on('finalanswer', function(msg){
    	//console.log('new request')
      var filename = JSON.parse(msg)
      if(filename['Query String'] != undefined){
fs.writeFile(filename['Query String'] + '.json', msg, function (err) {
});
}
});    
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
