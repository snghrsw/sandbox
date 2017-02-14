
import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import routes from './routes';
import logger from 'morgan';
import favicon from 'serve-favicon';
import ECT from 'ect';

require('es6-promise').polyfill();
require('isomorphic-fetch');

var app = express();

app.set('views', path.join(__dirname, './../../public'));
app.engine('ect', ECT({ watch: true, root: './../../public', ext: '.ect' }).render);
app.set('view engine', 'ect');
// app.use(favicon(__dirname + '/public/favicon.ico'));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  name: 'zenin-jinji',
  resave: false,
  saveUninitialized: false,
  secret: 'keyboard cat',
  expires: false,
  cookie:{
    httpOnly: false
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, './../../public')));
app.use(routes);

import './../server/passportInitializer';
// import './../server/localInitializer';

app.listen(app.get('port'), () => {
  console.log('ServerListenable:' + app.get('port'));
});


export default app;
