module.exports = {
    productionSourceMap: false,//防止打包生成map文件
    publicPath: './', // 基本路径
    // publicPath: process.env.NODE_ENV === 'production' ? './' : '/', //打包app需要修改
    lintOnSave: false, // 取消校验代码
    outputDir: 'dist', // 输出文件目录

    devServer: {
        disableHostCheck: true,
        host: 'lploss.cn',
        port: 9000,
        proxy: {
            '/api': {
                target: 'http://localhost:12345',// 要跨域的域名
                secure:false,
                changeOrigin: true, // 是否开启跨域
                pathRewrite:{
                    "^/api":""
                }
            }
        }
    }
}
