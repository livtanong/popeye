var webpack = require('webpack');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var bourbon = require('node-bourbon');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var path = require("path");

module.exports = function(options) {
	var output;

	if (options.prerender) {
		output = {
			filename: "bundle.js",
			path: path.resolve(__dirname, "build"),
			libraryTarget: "umd",
			publicPath: "/"
		}
	}

	var styleLoaders = [
	  { test: /\.css$/, loader: "css" },
	 	{ test: /\.scss$/, loader: "css!sass?includePaths[]="+bourbon.includePaths }
	]
	styleLoaders.forEach(function(item) {
		if(Array.isArray(item.loader)) {
      item.loader = item.loader.join("!");
    }
	  item.loader = ExtractTextPlugin.extract('style-loader', item.loader);
	});

	var routePaths = [
	  "/",
	  "/guide/"
	]

	return {
		entry: path.resolve(__dirname, "docs/js/entry.jsx"),
		output: output,
		resolve: {
      extensions: ['', '.js', '.jsx']
    },
    plugins: [
    	new ExtractTextPlugin("bundle.css"),
    	new StaticSiteGeneratorPlugin("bundle.js", routePaths)
    ],
		module: {
		  loaders: styleLoaders.concat([
		    { test: /\.html$/, loader: 'html' },
		    { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"},
		    { test: /\.woff($|\?)/,   loader: "url?limit=10000&mimetype=application/font-woff" },
		    { test: /\.woff2($|\?)/,  loader: "url?limit=10000&mimetype=application/font-woff2" },
		    { test: /\.ttf($|\?)/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
		    { test: /\.eot($|\?)/,    loader: "file" },
		    { test: /\.svg($|\?)/,    loader: "url?limit=10000&mimetype=image/svg+xml" },
		    { test: /\.png($|\?)/,    loader: "url?limit=10000&mimetype=image/png" },
		    { test: /\.jpg($|\?)/,    loader: "url?limit=10000&mimetype=image/jpeg" },
		    { test: /\.ico($|\?)/,    loader: "url?limit=10000&mimetype=image/x-icon" }
		  ])
		}
	}
}