const router = require('express').Router()
const Axios = require('axios').default

router.get('/autocomplete/:input', (req, res) => {
    Axios.get('https://maps.googleapis.com/maps/api/place/queryautocomplete/json', {
        params: {
            input: req.params.input,
            key: process.env.GOOGLE_API_KEY
        }
    }).then(response => {
        let out = []
        response.data.predictions.forEach(pred => {
            out.push({des: pred.description, key: pred.place_id})
        })
        res.json(out)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('/coords/:place_id', (req, res) => {    
    Axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
        params: {
            place_id: req.params.place_id,
            key: process.env.GOOGLE_API_KEY
        }
    }).then(response => {
        res.json(response.data.result.geometry.location)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('/forecast/:latlng', (req, res) => {
    Axios.get(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${req.params.latlng}`, {
        params: {
            lang: 'pl',
            units: 'si',
            exclude: 'minutely,alerts,flags'
        }
    }).then(response => {
        Axios.get(`https://geocode.xyz/${req.params.latlng}`, {
            params: {
                geoit: 'json',
                key: process.env.GEOCODE_API_KEY
            }
        }).then(location_response => {
            res.json({
                forecast: response.data,
                location: `${location_response.data.city}, ${location_response.data.region}`
            })
        }).catch(err => {            
            res.json({
                forecast: response.data,
                location: `Cannot determine the name of the city where you currently are ...`,
                err
            })
        })
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('/ip', (req, res) => {
    if (
        process.env.NODE_ENV === 'development'
        || req.connection.remoteAddress === '127.0.0.1'
    ) req.headers['x-forwarded-for'] = '134.201.250.155' // random IP address pulled out from ipstacks docs
    Axios.get(`http://api.ipstack.com/${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`, {
        params: {
            access_key: process.env.IPSTACK_API_KEY,
            fields: `latitude,longitude`
        }
    }).then(response => {
        res.json(response.data)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router