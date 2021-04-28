const { merge } = require('webpack-merge');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = merge(require('./webpack.common.config'), {
  mode: 'production',
  output: {
    filename: 'js/[name]_[contenthash:6].js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    // css 压缩
    new CssMinimizerWebpackPlugin({
      parallel: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Ki-UI',
      template: './index.html',
    }),
  ],
});
