import React from 'react'
import ReactDOM from 'react-dom'

import('bootstrap/scss/bootstrap.scss')
import('./Styles/index.scss')

import('./App')
    .then(App => {
        ReactDOM.render(<App.default />, document.getElementById('root'))
    })
    .catch(err => {
        console.log(err)
    })