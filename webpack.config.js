module.exports = {
    devtool: 'eval-source-map',

    entry:  ['babel-polyfill', __dirname + "/app/main.js"],
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
	hot: true,
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
					plugins: ["transform-decorators-legacy"],
                    presets:[ 'es2015', 'react', 'stage-2']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules'
            },
        ]
    },
    devServer: {
        contentBase: "./build",
        colors: true,
        historyApiFallback: true,
        hot: true,
        inline: true
    }
};