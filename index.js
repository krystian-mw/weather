require('dotenv').config()

process.env.NODE_ENV = process.argv[2]

const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.static(path.join('public')))
app.use('/api', require( path.join(__dirname, 'routers', 'api') ))
app.use(require( path.join(__dirname, 'routers', process.env.NODE_ENV) ))
app.listen(process.env.PORT, '0.0.0.0')