module.exports = {

    devServer: {
        host: '0.0.0.0',
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            "/api": {
                target: `http://127.0.0.1:8081`,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ''
                }
            }
        },
    }

}