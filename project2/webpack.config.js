var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var production = process.env.NODE_ENV === 'production';

var plugins = [
  new HtmlWebpackPlugin({
    template: './index.html'
  }),
  new ExtractTextPlugin("app.bundle.css"),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]

if (production) {
    plugins = plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
          screw_ie8: true,
          warnings: false
        }
      })
    ]);
}

module.exports = {

  entry: [
    'webpack-hot-middleware/client',
    './app/main.ts'
  ],
  output: {
    path: './dist',
    filename: 'app.bundle.js'
  },
  debug:   !production,
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
            'style', 'css!sass'
        )
      },
      {
        test: /\.html$/,
        loader: "html"
      },
    ]
  },
  resolve: {
    extensions: [
      '',
      '.ts', '.js',
      '.css', '.scss',
      '.html'
    ]
  },
  plugins: plugins,
  devServer: {
    address: 'localhost',
    port: 8080,
    historyApiFallback: true
  }
};
