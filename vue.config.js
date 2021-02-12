module.exports = {

    devServer: {
        host: '0.0.0.0',
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            "/api": {
                target: process.env.target,
                changeOrigin: true
            }
        },
    }
};