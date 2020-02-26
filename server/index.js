const express = require('express')
const path = require('path')
const app = express()

app.use(express.static('../dist'))

app.use(express.json())

app.use('/api', require('./router'))

app.use((req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../dist') })
})

app.listen(8080, '0.0.0.0')