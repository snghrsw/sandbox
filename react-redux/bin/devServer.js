/* eslint no-console: off */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./../src/webpack/webpack.config.dev');

var PORT = 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  progress: true,
  debug: true,
  cache: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    chunks: false,
    'errors-only': true
  }
}).listen(PORT, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at http://localhost:' + PORT);
});