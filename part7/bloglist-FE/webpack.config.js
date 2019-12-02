const path = require('path')
const HtmlWebpackPlugin =require('html-webpack-plugin')

const config = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/, // define target file
        loader: 'babel-loader', // specify which loader to use
        query: {                // specify config parameter
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    historyApiFallback: true
  },
  plugins:[ new HtmlWebpackPlugin(
    {
      title: 'bloglist template',
      template: './build/index.html',
      publicPath: 'https://www.some-path.com'
    })],
  devtool: 'source-map',
}
module.exports = config