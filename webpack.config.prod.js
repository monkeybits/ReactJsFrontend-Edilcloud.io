const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config( {
	path: path.join(__dirname, '.env.production')
});

const reScript = /\.(js|jsx|mjs)$/;
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
const staticAssetName = '[path][name].[ext]?[hash:8]';

module.exports = () => {
	const env = dotenv.parsed;
	
	const envKeys = Object.keys(env).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(env[next]);
		return prev;
	}, {});

	return {
		context: __dirname,
		entry: path.join(__dirname, 'src/index.js'),
		output: {
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/dist/',
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
			new webpack.DefinePlugin(envKeys),
			new webpack.ProgressPlugin(),
			new CompressionPlugin(),
			new HtmlWebPackPlugin({
				template: path.resolve(__dirname, 'public/index.html'),
				filename: 'index.html',
				favicon: path.resolve(__dirname, 'public/favicon.ico'),
				minify: true
			})
		]
	}
};
