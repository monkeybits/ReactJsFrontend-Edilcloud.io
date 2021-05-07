const DeadCodePlugin = require('webpack-deadcode-plugin');

module.exports = {
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 0,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 6,
			maxInitialRequests: Infinity,
			automaticNameDelimiter: '~',
			automaticNameMaxLength: 30,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
						return `npm.${packageName.replace('@', '')}`;
					}
				},
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		},
    usedExports: true,
	},
  plugins: [
    new DeadCodePlugin({
      patterns: [
        'src/**/*.(js|jsx|css)',
      ],
      exclude: [
        '**/*.(stories|spec).(js|jsx)',
      ],
    })
  ]
};
