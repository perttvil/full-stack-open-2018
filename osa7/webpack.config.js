const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
    console.log('argv', argv.mode)

    const backend_url = argv.mode === 'production'
        ? 'https://radiant-plateau-25399.herokuapp.com/api/notes'
        : 'http://localhost:3001/notes'

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
        },
        devServer: {
            contentBase: path.resolve(__dirname, "dist"),
            compress: true,
            port: 3000
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['env', 'react'],
                        plugins: [require('babel-plugin-transform-class-properties')]
                    },
                },
                {
                    test: /\.css$/,
                    loaders: [
                        'style-loader',
                        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap&-minimize'
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            })
        ]
    }
}

module.exports = config
