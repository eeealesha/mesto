const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин 
// подключите к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { url } = require('inspector');

module.exports = {
    entry: { main: './src/pages/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [ // rules — это массив правил
            // добавим в него объект правил для бабеля
            {
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,

                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: '/node_modules/',
                // при обработке этих файлов нужно использовать babel-loader
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] }
                }]
            },
            // добавили правило для обработки файлов
            {
                test: /.(png|svg|jpg|gif)$/,
                loader: 'file-loader?name=./images/[name].[ext]'
            },
            {
                test: /.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]',
            },
            // аналогично добавьте правило для работы с html
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.css$/,
                // заменили строку css-loader на объект
                // для «Вебпака» это то же самое
                loader: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        // добавьте объект options
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // путь к файлу index.html
            favicon: './src/images/profile-picture.png'
        }),
        new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
    ] 
};