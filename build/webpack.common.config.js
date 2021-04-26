const path = require('path');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');

const styleRules = (importLoaders = 1) => [
  process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      importLoaders,
    },
  },
  'postcss-loader',
];

module.exports = {
  target: 'web',
  entry: path.resolve(__dirname, '../examples/index.ts'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/i,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.vue$/i,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
      {
        test: /\.md$/i,
        use: [
          'vue-loader',
          path.resolve(__dirname, './vue-md-loader'),
        ],
      },
      {
        test: /\.css$/i,
        use: [
          ...styleRules(),
        ],
      },
      {
        test: /\.less$/i,
        use: [
          ...styleRules(2),
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'images/[name]_[contenthash:6][ext]',
        },
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name]_[contenthash:6][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'types': path.resolve(__dirname, '../types'),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_theme.css',
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
    }),
  ],
};
