const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = merge(require('./webpack.common.config'), {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    hotOnly: true,
    port: 3000,
    open: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Ki-UI',
      template: './index.html',
    }),
  ],
});
