console.log("环境变量：", process.env.NODE_ENV)
console.log("VUE_APP_CURRENTMODE变量：", process.env.VUE_APP_CURRENTMODE)
const path = require('path')
module.exports = {

    /**
     * 配置:打包后要部署的位置
     * 根据 测试环境 或 生产环境配置不同的部署目录
    */
    baseUrl: (process.env.VUE_APP_CURRENTMODE === 'production' && '/') || (process.env.VUE_APP_CURRENTMODE === 'productionTest' && './') || '',


    /**
     * 配置:指定打包时输出的目录 默认dist
     * 根据当前打包环境获取目录位置
    */
    outputDir: process.env.outputDir,

    /**
     * 用于嵌套打包后的静态资产（js，css，img，fonts）的目录。
    */
    assetsDir: 'static',

    /**
     * 以多页模式构建应用程序。每个“页面”都应该有一个相应的JavaScript条目文件。
     * 该值应该是一个对象，其中键是条目的名称
     * 例如：指定其的对象entry，template，filename和title || entry
    */
    // pages: {
    //     hemo: {
    //         entry: 'src/index/main.js',
    //         template: 'public/index.html',
    //         filename: 'index.html',
    //         title: '首页'
    //     },
    //     list: "entry.js"
    // },

    /**
     * 是否开启eslint保存检测
     * 有效值：boolean(开发环境检测) | error(构建时检测)
     * 注意：仅在安装eslint插件时才会考虑此值生效。@vue/cli-plugin-eslint
    */
    lintOnSave: false,

    /**
     * 默认情况下babel-loader忽略其中的所有文件node_modules
     * 这个数组可额外增加例外的包名
    */
    transpileDependencies: [],

    /**
     * 是否在构建时生成sourceMap文件，false将提高构建速度
    */
    productionSourceMap: false,

    /**
     * 该对象将使用webpack-merge合并到最终的webpack配置中
     */
    configureWebpack: {
        resolve: {
            alias: {
                '@src': path.resolve(__dirname, './src'),
                '@c': path.resolve(__dirname, './src/components'),
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        module: {
            // rules: [
            //     {
            //         test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            //         loader: 'url-loader',
            //         options: {
            //             limit: 10000,
            //             name: "/[name].[hash:7].[ext]"
            //         }
            //     }
            // ]
        },
        plugins: [
        ]
    },
    chainWebpack: (config) => {

        //添加构建报告插件
        if (process.env.npm_config_report) {
            var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
            config.plugin("webpack-report").use(BundleAnalyzerPlugin, [{}]);
        }
    },

    /**
     * 配置高于chainWebpack（webpack链接）中关于css loader的配置
    */
    css: {
        //默认情况下，只有以文件结尾的文件*.module.[ext]才会被视为CSS模块。将此设置为true允许您.module放入文件名并将所有*.(css|scss|sass|less|styl(us)?)文件视为CSS模块。
        modules: false,
        //css单独打包 是否将组件中的CSS提取到独立的CSS文件中（而不是在JavaScript中内联并动态注入）
        extract: true,
        //是否构建样式地图，false增加构建速度
        sourceMap: false,
        //css loader预设器配置 支持：
        // css-loader
        // postcss-loader
        // sass-loader
        // less-loader
        // stylus-loader
        loaderOptions: {
            css: {
                localIdentName: '[name]-[hash]',
                camelCase: 'only'
            }
        }
    },

    /**
     * 开发环境服务器配置
    */
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        //配置跨域处理,只有一个代理
        proxy: 'http://tm.yeepiao.com',
        //配置跨域处理,多个代理
        // disableHostCheck: true,
        // proxy: {
        //     '/api': {
        //         target: 'http://118.190.149.38:8088',
        //         changeOrigin: false
        //     }
        // }
    },

    /**
     * 第三方插件配置
    */
    pluginOptions: {}

}