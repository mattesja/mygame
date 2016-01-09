var path = require('path');
var webpack = require('webpack');

var HOST = 'localhost';
var PORT = '3333';

module.exports = {
  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },
  entry: 'mocha!./tests.js',
  output: {
    path: path.resolve(__dirname,  '/.tmp'),
    filename: 'test.js'
    //publicPath: '.tmp'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel']
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
