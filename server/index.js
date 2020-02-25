const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log(req.url)
    next()
})

app.use(express.json())
app.use('/api', require('apicache').middleware('30 minutes'),require('./router'))

app.listen(8080, '0.0.0.0')