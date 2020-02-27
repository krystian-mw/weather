const { Router, static } = require('express')
const webpack = require('webpack')

const router = Router()

webpack(require('../webpack.config'), (err, res) => {
    if (err) throw err
    console.log('Compiled and serving at port: ', process.env.PORT)
})

router.use(static(__dirname + '/../dist'))

router.use((req, res) => {
    res.sendFile('index.html', {
        root: __dirname + '/../dist'
    })
})

module.exports = router