var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var CLIENT_DIR = path.resolve(__dirname, 'client');
var SERVER_DIR = path.resolve(__dirname, 'server/generated');
var DIST_DIR = path.resolve(__dirname, 'dist');

var loaders = [{
  test: /\.jsx$/,
  include: CLIENT_DIR,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    presets: ['es2015', 'react', 'stage-0']
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
  }
]

module.exports = [{
  name: 'client',
  target: 'web',
  context: CLIENT_DIR,
  entry: './src/app.jsx',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: loaders
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      components: path.resolve(CLIENT_DIR, 'components')
    }
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', {allChunks: true})
  ]
},
{
  name: 'server',
  target: 'node',
  context: CLIENT_DIR,
  entry: {
    app: './src/components/todoapp.jsx'
  },
  output: {
    path: SERVER_DIR,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    loaders: loaders
  },
  resolve: {
    alias: {
      components: path.resolve(CLIENT_DIR, 'components')
    }
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}];
