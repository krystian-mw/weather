import React from 'react'
import Axios from 'axios'

import { withRouter } from 'react-router-dom'

import Weather from '../Components/Weather'

class Location extends React.Component {

    constructor (props) {
        super()
        this.state = {
            loaded: false
        }
    }

    getLocationData = () => {
        const [city_name, place_id] = location.pathname.replace('/location/', '').split('/')        
        Axios.get('/api/coords/' + place_id).then(res => {
            this.setState({
                city_name,
                place_id,
                lat: res.data.lat,
                lng: res.data.lng,
                loaded: true
            })
        })
    }

    componentDidUpdate (previous) {
        if (this.props.location.pathname !== previous.location.pathname) {
            this.getLocationData()
        }
    }

    componentDidMount () {
        this.getLocationData()
    }

    render () {
        console.log(this.state)
        if (this.state.loaded) {
            return (
                <Weather
                    city={decodeURI(this.state.city_name)}
                    longitude={this.state.lng}
                    latitude={this.state.lat}
                />
            )
        } else return 'Loading'
    }
}

export default withRouter(Location)