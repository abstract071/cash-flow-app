const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const DevServerConfig = require('./configs/dev-server.config');

const PATHS = {
    app: path.join(__dirname, 'src', 'app'),
    dist: path.join(__dirname, 'dist')
};

const commonConfig = merge([
    {
        entry: {
            app: PATHS.app
        },
        output: {
            filename: '[name].[hash].js',
            path: PATHS.dist
        },
        module: {
            rules: [
                {
                    test: /\.(ttf|woff|woff2)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '../fonts/[name].[hash].[ext]'
                        }
                    }
                },
                {
                    test: /\.(png|jpg|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 25000,
                                name: '../images/[name].[hash].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        },
        plugins: [
            new HtmlPlugin({
                title: 'Spendee like app',
                template: 'src/index.html'
            })
        ]
    }
]);

const developmentConfig = merge([
    {
        entry: {
            app: ['react-hot-loader/patch', PATHS.app]
        }
    },
    {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                }
            ]
        }
    },
    DevServerConfig({
        host: process.env.HOST,
        port: process.env.PORT
    })
]);

const productionConfig = merge([
    {
        entry: {
            vendors: [
                'react',
                'react-dom',
                'redux',
                'react-redux',
                'semantic-ui-react'
            ]
        }
    },
    {
        devtool: "source-map"
    },
    {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        use: ["css-loader", "sass-loader"]
                    })
                }
            ]
        }
    },
    {
        plugins: [
            new CleanPlugin(PATHS.dist),
            new ExtractTextPlugin({
                filename: '[name].[contenthash].css'
            }),
            new webpack.optimize.CommonsChunkPlugin({
               names: ['vendors', 'manifest'] // try
            })/*,
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                minChunks: Infinity
            })*/
            ,
            new BabiliPlugin()
        ]
    }
]);

module.exports = (env) => {
    process.env.BABEL_ENV = env;

    return env === 'production' ?
        merge(commonConfig, productionConfig) :
        merge(commonConfig, developmentConfig);
};