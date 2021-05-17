module.exports = {
	sourceType: 'unambiguous',
	presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
	plugins: [
		[
			'@babel/plugin-transform-runtime',
			{
				asyncGenerators: true,
				generators: true,
				async: true
			}
		],
		'@babel/plugin-proposal-class-properties'
	]
};
