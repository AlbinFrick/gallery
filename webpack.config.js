const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/js/index.js',
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: 'body'
		})
	],

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				]
			}
		]
	},

	devServer: {
		// contentBase: path.join(__dirname, 'public'),
		static: './dist',
		compress: true,
		port: 3000
	},
	output: {
		filename: 'main.bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
}