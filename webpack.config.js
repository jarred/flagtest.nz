module.exports = {
  entry: "./assets/js/main.js",
  output: {
    path: __dirname,
    filename: "./assets/js/app.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded" },
      { test: /\.ejs$/, loader: "ejs-loader" }
    ]
  }
};
