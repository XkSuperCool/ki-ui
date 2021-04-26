const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = merge(require('./webpack.common.config'), {
  mode: 'production',
  entry: {
    'ki-ui': path.resolve(__dirname, '../src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    library: 'ki-ui',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: '/lib/',
  },
  externals: {
    // vue 不进行打包
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    },
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
  ],
});
