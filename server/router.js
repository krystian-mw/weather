const router = require('express').Router()
const Axios = require('axios').default

router.get('/autocomplete/:input', (req, res) => {
    Axios.get('https://maps.googleapis.com/maps/api/place/queryautocomplete/json', {
        params: {
            input: req.params.input,
            key: `AIzaSyAXMb2bZvOTRJ3XQ1-4GS5ePTRDbyGTfsU`
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
            key: `AIzaSyAXMb2bZvOTRJ3XQ1-4GS5ePTRDbyGTfsU`
        }
    }).then(response => {
        res.json(response.data.result.geometry.location)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('/forecast/:latlng', (req, res) => {
    Axios.get(`https://api.darksky.net/forecast/2808ca0e1aa31ee0b6d16d3aa7659c18/${req.params.latlng}`, {
        params: {
            lang: 'pl',
            units: 'si',
            exclude: 'minutely,alerts,flags'
        }
    }).then(response => {
        Axios.get(`https://geocode.xyz/${req.params.latlng}`, {
            params: {
                geoit: 'json',
                key: '94793317891362771971x4708'
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
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router