import React from 'react'
import ReactDOM from 'react-dom'

if (process.env.API_PROXY) {
    import('axios').then(Axios => {
        Axios.default.defaults.baseURL = process.env.API_PROXY
    })
}

import('bootstrap/scss/bootstrap.scss')
import('./Styles/index.scss')

import('./App')
    .then(App => {
        ReactDOM.render(<App.default />, document.getElementById('root'))
    })
    .catch(err => {
        console.log(err)
    })
