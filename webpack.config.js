const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  
  return {
    entry: './src/index.tsx',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // Skip type checking for faster builds
              compilerOptions: {
                noEmit: false, // Allow ts-loader to emit files
                sourceMap: true, // Enable source maps
              },
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.resx$/,
          use: [
            {
              loader: path.resolve(__dirname, 'loaders', 'resx-loader.js')
            }
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    output: {
      filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      sourceMapFilename: '[file].map',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
    devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000,
      hot: true,
      open: false,
      historyApiFallback: true, // For SPA routing
      client: {
        overlay: {
          warnings: false,
          errors: false, // Disable error overlay completely to avoid ResizeObserver errors
        },
        logging: 'warn', // Reduce console noise
      },
    },
    optimization: {
      splitChunks: isDevelopment ? false : {
        chunks: 'all',
      },
    },
  };
};
