const path = require('path');
const base = require('./webpack.base');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(base, {
	mode: 'production',
	output: {
		filename: "[name].[contentHash].js",
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				removeAttributeQuotes: true,
				removeComments: true,
				collapseWhitespace: true,
			},
			filename: 'index.html',
			inject: 'body'
		}),
		new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' })
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				]
			},
		]

	},
})