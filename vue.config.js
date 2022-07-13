const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const isProduction = process.env.NODE_ENV === 'production'

const pages = require('./pages')

module.exports = {
    pages: pages.pages,
    devServer: {
        hot: true,
        host: '0.0.0.0',
        // public: '172.168.179.196:8081',
        // port: 8080,
        https: false,
        hotOnly: false,
        disableHostCheck: true,
        port: 8081, // 端口
        proxy: { // 代理配置
            '/api': {
                target: 'http://localhost:3000/api',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    publicPath: './',
    productionSourceMap: false,
    // configureWebpack: config => {
    //     // 开启gzip压缩js，确保ng上的gizp是开的
    //     // if ( true ) {
    //         config.plugins.push( new CompressionWebpackPlugin( {
    //             algorithm: 'gzip',
    //             test: /\.js$|\.html$|\.json$|\.css/,
    //             threshold: 10240,
    //             minRatio: 0.8,
    //         } ) )
    //         // 开启分片式打包js
    //         config.optimization = {
    //             runtimeChunk: 'single',
    //             splitChunks: {
    //                 chunks: 'all',
    //                 maxInitialRequests: Infinity,
    //                 minSize: 20000,
    //                 cacheGroups: {
    //                     vendor: {
    //                         test: /[\\/]node_modules[\\/]/,
    //                         name( module ) {
    //                             // get the name. E.g. node_modules/packageName/not/this/part.js
    //                             // or node_modules/packageName
    //                             const packageName = module.context.match( /[\\/]node_modules[\\/](.*?)([\\/]|$)/ )[ 1 ]
    //                             // npm package names are URL-safe, but some servers don't like @ symbols
    //                             return `npm.${ packageName.replace( '@', '' ) }`
    //                         },
    //                     },
    //                 },
    //             },
    //         }
    //         // 取消打包时的一些超出最大限制提醒
    //         config.performance = {
    //             hints: 'warning',
    //             //入口起点的最大体积
    //             maxEntrypointSize: 50000000,
    //             //生成文件的最大体积
    //             maxAssetSize: 30000000,
    //             //只给出 js 文件的性能提示
    //             assetFilter: function( assetFilename ) {
    //                 return assetFilename.endsWith( '.js' )
    //             },
    //         }
    //     // }
    // },
    lintOnSave: false, // 取消 eslint 验证
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.sass` 这个文件
                // 注意：在 sass-loader v7 中，这个选项名是 "data"
                // prependData: '@import "~@/assets/css/_global-variables.sass";'
            },
            postcss: {
                plugins: [
                    autoprefixer({
                        overrideBrowserslist: [
                            "Android 4.1",
                            "iOS 7.1",
                            "Chrome > 31",
                            "ff > 31",
                            "ie >= 8"
                        ]
                    }),
                    pxtorem({
                        rootValue: 37.5, // 根节点的
                        propList: ['*'],
                        unitPrecision: 5,
                        // propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
                        selectorBlackList: [],
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 0,
                        exclude: /node_modules/i
                    })
                ]
            }
        }
    }
}
