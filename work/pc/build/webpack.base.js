const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;

module.exports =  {
    entry: {
        main: '../src/main.ts',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: prod ? `[name].[hash:8].js` : `[name].js`,
    },
    resolve: {
        extensions: ['.vue', '.ts', '.tsx', '.js'],
    },
    resolveLoader: {
        modules: ['node_modules', 'loader']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.tsx$/,
                use: [
                    'vue-loader', 'vue-tsx-loader?template=jade'
                ]
                
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
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        compress: true,
        port: 3000,
        open:true
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/index.html',
            filename: './index.html',
        })
    ]
};