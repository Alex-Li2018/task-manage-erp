const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;

module.exports =  {
    entry: {
        app: './src/main.ts'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@api': path.resolve(__dirname, '../src/api')
        },
        extensions: ['.vue', '.ts', '.tsx', '.js'],
    },
    resolveLoader: {
        modules: ['node_modules', 'loader']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                  appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        compress: true,
        port: 3000,
        open: true
    },
    plugins: [
        // new CleanWebpackPlugin([
        //     "./dist"
        // ]),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: './client/index.html',
            filename: './index.html',
        })
    ]
};