const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				use: [
					'file-loader',
				]
			}
		]
	},

}