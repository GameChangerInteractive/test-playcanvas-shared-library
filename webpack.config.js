const path = require('path');
const webpack = require('webpack');
const src = path.join(__dirname, 'src');

const isProduction = process.env['NODE_ENV'] === 'production';

let environment = 'production';

if (
    !(
        isProduction &&
        process.env.CIRCLE_BRANCH &&
        (process.env.CIRCLE_BRANCH.indexOf('master') !== -1 || process.env.CIRCLE_BRANCH.indexOf('beta') !== -1)
    )
) {
    environment = 'development';
}

const config = {
    entry: {
        index: path.join(src, 'index.ts'),
    },
    externals: {
        playcanvas: 'pc'
    },
    output: {
        path: path.join(__dirname, 'playcanvas', 'scripts'),
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    //'to-string-loader',
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS, using Node Sass by default
                ],
                include: /lit\.(.+.){0,1}scss$/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
                exclude: /lit\.(.+.){0,1}scss$/,
            },
            {
                test: /\.(png|jpg|gif|otf|ttf)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: true,
                        },
                    },
                ],
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            GC_PRODUCTION: isProduction,
            BUILD_NUM: JSON.stringify(process.env.CIRCLE_BUILD_NUM),
            BRANCH: JSON.stringify(process.env.CIRCLE_BRANCH || 'develop'),
            ENVIRONMENT: JSON.stringify(environment),
        })
    ],
};

if (!isProduction) {
    config.devtool = 'inline-source-map';
}

module.exports = config;
