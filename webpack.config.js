const path = require('path');
const glob = require('glob');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
  devtool: 'source-map',
  entry: './src/app.js',
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'src/assets' }],
    }),
    new ImageminPlugin({
      minFileSize: 250000,
      externalImages: {
        context: 'src',
        sources: glob.sync('src/assets/images/**/*.*'),
        destination: 'dist/images',
        fileName: '[name].[ext]',
      },
      plugins: [
        imageminMozjpeg({
          quality: 28,
          progressive: true,
        }),
      ],
    }),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), 'src/templates', '*.hbs'),
      partials: [path.join(process.cwd(), 'src/templates/components', '*.hbs')],
      output: path.join(process.cwd(), 'dist', '[name].html'),
    }),
  ],
};
