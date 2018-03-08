const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
		app: ['webpack/hot/dev-server', './src/js/entry.js'],
	},

	output: {
		path: path.resolve('./public/built'),
		filename: 'bundle.js',
		publicPath: 'http://localhost:8080/built/'
	},

	devServer: {
		contentBase: './public',
		publicPath: 'http://localhost:8080/built'
	},

	module: {
		rules: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/,
				use: [ 
					{ loader: 'babel-loader' }
				] 
			},
			{ 
				test: /\.css$/, 
				use: [ 
					{ loader: 'style-loader' }, 
					{ loader: 'css-loader' }
				] 
			},
			{ 
				test: /\.less$/, 
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'less-loader' }
				] 
			},
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}