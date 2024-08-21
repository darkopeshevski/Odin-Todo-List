



const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'super-main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'ready.html',
      inject: 'body',
    })
  ],
  devtool: 'inline-source-map',
  watch: true,
};