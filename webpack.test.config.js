var path = require('path');
var webpack = require('webpack');

var HOST = 'localhost';
var PORT = '3333';

module.exports = {
  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },
  entry: './tests.js',
  output: {
    path: __dirname + '/.tmp',
    filename: 'testBundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/
      //include: path.join(__dirname, 'src')
    }, {
      test: /\.scss$/,
      loader: 'null-loader'
    }]
  },
  devServer: {
    host: HOST,
    port: PORT
  }
};
