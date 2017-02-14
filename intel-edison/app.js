var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
// var router = express.Router();

var server = app.listen('3060', function() {
  console.log("server start 3060");
});

var io = require('socket.io')(server);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var thisLedState = false;

app.all('/', function(req,res,next){
  next();
});

/* GET home page. */
app.get('/', function(req, res,  next) {
  console.log("get ok");
  res.json({flag: thisLedState});
  next();
});

app.post('/', function(req, res) {
  thisLedState = req.body.flag === 'true';
  console.log("EdisonのLEDを" + (thisLedState ? "点灯状態" : "消灯状態") + "に変更");
  io.emit('changeLedState', thisLedState);
  res.send("complete!: " + thisLedState);
});

module.exports = app;
