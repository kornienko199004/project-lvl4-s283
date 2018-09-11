module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['babel-polyfill', `${__dirname}/src/index.js`],
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'application.js',
    path: `${__dirname}/dist/assets`,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
