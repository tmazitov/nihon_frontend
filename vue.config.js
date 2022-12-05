module.exports = {
    lintOnSave: false,
    devServer: {
        clientLogLevel: "info",
        disableHostCheck: true,
        // host: "localhost",
        port: process.env.VUE_APP_LISTENER_PORT,
        proxy: {
            "^/aaa": {
                target: "http://localhost:8000"
            },
        },
    },
}