module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        // '/api': { //测试
        //     target: 'http://172.22.0.58:8082/'
        // },
    }
}
