const path = require('path');
const Dotenv = require('dotenv-webpack');


module.exports = {
  entry: "./src/app.js",
  output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
  },
  plugins: [
    new Dotenv()
  ],
  module: {
    rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
    }, {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      }, 
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000' },
    {
        test: /\.s?css$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
    }]
  },
  devtool: 'cheap-module-eval-source-map',
   devServer: {
       contentBase: path.join(__dirname, 'public')
   } 
};