const router = require('express').Router()

const webpack = require('webpack')

const webpackHotMiddleware = require('webpack-hot-middleware')

const webpackConfig = require('../webpack.config')

const compiler = webpack({
    ...webpackConfig,
    mode: "development" // throws fatal error if set in webpack.config.js
})

const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    noInfo: true
})

router.use(webpackDevMiddleware)

router.use(webpackHotMiddleware(compiler))

module.exports = router