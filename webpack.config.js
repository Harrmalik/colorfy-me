var webpack = require("webpack");
var path = require("path");

// returns a Compiler instance
module.exports = {
    // Configuration
    entry: {
        app: path.resolve('React', 'App.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public', 'js', 'react'),
        publicPath: "/"
    },
    module: {
        loaders: [
            {
                "test": /\.jsx?$/,
                "include": /\/React/,
                "exclude": /node_modules/,
                "loader": "babel-loader",
                "query": {
                    "presets": [
                        "es2015",
                        "react"
                    ]
                }
            }
        ]
    }
};
