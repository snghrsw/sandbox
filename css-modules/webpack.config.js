module.exports = {
  entry: './app/index.js',
  output: {
    filename: './dist/bundle.js'
  },
  resolve: {
    extensions: ['', '.js','.styl']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query:{
          presets:['react','es2015']
        }
      },
      {
        test: /\.styl$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:4]!stylus'
      }
    ]
  }
}
