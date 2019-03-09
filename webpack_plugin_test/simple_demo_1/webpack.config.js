const webpack = require('webpack')
const webpackFileHeaderPlugin = require('./webpackFileHeaderPlugin.js')

module.exports = {
    mode: 'none',
    entry: __dirname + '/index.js',
    output: {
        path: __dirname + '/dist'
    },
    plugins: [
        new webpackFileHeaderPlugin({
            AuthorName: `zhouwenkang`
        })
    ]
}