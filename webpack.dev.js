const path = require('path');
const base = require('./webpack.base')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(base, {
	mode: 'development',
	devServer: {
		// contentBase: path.join(__dirname, 'public'),
		static: './dist',
		compress: true,
		port: 3000
	},
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
			},
		]

	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
})