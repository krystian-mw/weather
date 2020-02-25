import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import { useParams, withRouter } from 'react-router-dom'

import Weather from '../Components/Weather'

class Location extends React.Component {
    constructor (props) {
        super()
        const [city_name, place_id] = window.location.pathname.replace('/location/', '').split('/')
        const placeholder = <p>Got the location, checking weather ... </p>
        this.state = {
            initial_Component: placeholder,
            city_name,
            place_id,
            Component: placeholder
        }
    }

    showWeather = () => {
        Axios.get('/api/coords/' + this.state.place_id).then(res => {
            this.setState({ Component:
                <Weather 
                    city={decodeURI(this.state.city_name)}
                    latitude={res.data.lat}
                    longitude={res.data.lng}
                />
            })
        })
    }

    componentDidUpdate (previous_props) {
        const [city_name, place_id] = window.location.pathname.replace('/location/', '').split('/')
        if (this.props.location.pathname !== previous_props.location.pathname) {
            this.setState({ city_name, place_id, Component: this.state.initial_Component })
            this.showWeather()
        }
    }

    componentDidMount () { this.showWeather() }

    render () { return this.state.Component }
}

export default withRouter(Location)