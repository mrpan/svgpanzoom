const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: './src/index.js',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Output Management'
		})
	],
	output: {
		library: "svgpanzoom",
  		libraryTarget: "umd",
		filename: 'svgpanzoom-dev.js',
		path: path.resolve(__dirname, 'dist')
	}
};