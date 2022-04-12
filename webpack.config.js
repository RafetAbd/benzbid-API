const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
let dotenv = require("dotenv").config({ path: __dirname + "/.env" });
let webpack = require('webpack');


module.exports = {
    // entry point of the application
    entry: './src/index.ts',
    // mode: NODE_ENV,
    mode: 'development',
    target: 'node',
    
    // output point of the application
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
    },
    devtool : 'inline-source-map',
    module: {
        // set rules for modules
        rules: [
            {
                // find any file with a .ts extension
                test: /\.ts$/,
                // use ts-loader to load the file
                use: 'ts-loader',
                // exclude node_modules folder
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        // extensions to be used to resolve modules
        extensions: ['.ts', '.js']
    },
    externals: [ nodeExternals() ],
    plugins: [
        new webpack.DefinePlugin({
            "process.env.DOTENV": JSON.stringify(dotenv.parsed),
          }),
        new WebpackShellPluginNext({
            onBuildEnd: ['npm run run:dev'],
        })
        
    ]
}