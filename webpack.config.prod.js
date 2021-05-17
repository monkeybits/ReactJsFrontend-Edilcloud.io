const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const reScript = /\.(js|jsx|mjs)$/;
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
const staticAssetName = '[path][name].[ext]?[hash:8]';

module.exports = {
	context: __dirname,
	entry: path.join(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				exclude: /\/excludes/
			})
		]
	},
	devServer: {
		historyApiFallback: true
	},
	resolve: {
		alias: {
			app: path.resolve(__dirname, 'src/app/'),
			'@fake-db': path.resolve(__dirname, 'src/@fake-db/'),
			'@fuse': path.resolve(__dirname, 'src/@fuse/'),
			'@lodash': path.resolve(__dirname, 'src/@lodash/'),
			'@history': path.resolve(__dirname, 'src/@history/')
		},
		extensions: ['', '.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: reScript,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-transform-runtime']
					}
				},
				resolve: {
					fullySpecified: false
				}
			},
			{
				test: reStyle,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(ttf|otf|eot|woff2?|)?$/,
				use: 'url-loader'
			},
			{
				test: reImage,
				oneOf: [
					// Or return public URL to image resource
					{
						loader: 'file-loader',
						options: {
							name: staticAssetName
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.PUBLIC_URL': JSON.stringify(path.resolve(__dirname, 'public'))
		}),
		new webpack.ProgressPlugin(),
		new CompressionPlugin(),
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
			filename: 'index.html',
			favicon: path.resolve(__dirname, 'public/favicon.ico'),
			minify: true
		})
	]
};
