const slsw = require('serverless-webpack')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: 'production',
  node: false,
  optimization: {minimize: false},
  resolve: {extensions: ['.ts', '.js']},
  externals: {
    'aws-sdk': 'aws-sdk',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {loader: 'ts-loader', options: {transpileOnly: true}},
      },
    ],
  },
}
