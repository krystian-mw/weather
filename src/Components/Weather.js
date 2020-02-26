import React from 'react'

import Axios from 'axios'

import { withRouter } from 'react-router-dom'

import {
    FaLocationArrow,
    FaWind,
    FaArrowRight,
    FaArrowLeft,
    FaTemperatureLow,
    FaTemperatureHigh
} from 'react-icons/fa'

import {
    Col,
    Row
} from 'react-bootstrap'

import Skycons from 'react-skycons'


const Hourly = (props) => {
    let out = []
    // From 1st for next 5
    for (let i = 1; i <= 5; i++) {
        const forecast = props.forecast.hourly.data[i];
        const time = new Date(forecast.time*1000).toTimeString().substring(0, 5)
        forecast.summary = forecast.summary.length < 20 ? forecast.summary : '-'
        out.push(
            <Col key={i} className="later text-center">
                <p>{time}</p>
                <p style={{height:`20%`}}>{forecast.summary}</p>
                <p><Skycons color="white" icon={forecast.icon.toUpperCase().replace(/-/g, '_')} /></p>
                <p>{Math.round(forecast.temperature)}&deg;</p>
                <p><FaWind /> {Math.round(forecast.windSpeed)} km/h</p>
            </Col>
        )
    }
    return out
}

const Daily = (props) => {
    let out = []
    // From 1st for next 5
    for (let i = 1; i <= 5; i++) {
        const forecast = props.forecast.daily.data[i];
        const time = new Date(forecast.time*1000).toString().substring(0, 10)
        forecast.summary = forecast.summary.length < 20 ? forecast.summary : '-'
        out.push(
            <Col key={i} className="later text-center">
                <p>{time}</p>
                {/*
                    A fixed height for the summary is required as sometimes
                    it is one line, and sometimes two. The fixed height will
                    maintain the linear horizontal layout
                */}
                <p style={{height:`20%`}}>{forecast.summary}</p>
                <p><Skycons color="white" icon={forecast.icon.toUpperCase().replace(/-/g, '_')} /></p>
                <p><FaTemperatureLow /> {Math.round(forecast.temperatureLow)}&deg;</p>
                <p><FaTemperatureHigh /> {Math.round(forecast.temperatureHigh)}&deg;</p>
            </Col>
        )
    }
    return out
}

class Weather extends React.Component {

    constructor (props) {
        super()
        this.state = {
            Component: <h3>Got the location, checking weather ...</h3>,
            Carousel: 'left'
        }
        this.flipRef = React.createRef()
    }

    flip = (e) => {
        // There is no less time-consuming way
        if (
            !this.flipRef.current.className.includes('left')
            && !this.flipRef.current.className.includes('right')
        ) return this.flipRef.current.className += ' right'
        if (this.flipRef.current.className.includes('left')) {
            this.flipRef.current.className = this.flipRef.current.className.replace('left', 'right')
        } else this.flipRef.current.className = this.flipRef.current.className.replace('right', 'left')        
    }

    // componentDidMount () { this.componentDidUpdate({ location: { pathname: 'NULL' } }) }

    componentDidUpdate (previous) {
        if (previous.latitude !== this.props.latitude) {
            this.getData()
        }
    }

    componentDidMount () {
        this.getData()
    }

    getData = (previous) => {
        Axios.get(
            `/api/forecast/${this.props.latitude},${this.props.longitude}`
        ).then(res => {
            this.setState({
                loaded: true,
                data: {
                    forecast: res.data.forecast,
                    location: res.data.location
                }
            })
        })
    }

    render () {
        if (this.state.loaded === true) { return (
            <Row className="action-row">
                {/* Current */}
                <Col id="Weather" sm="12">
                    <h4><FaLocationArrow /> {this.props.city || this.state.data.location}</h4>
                    <h5>{this.state.data.forecast.currently.summary}</h5>
                    <h4><Skycons className="skycon" icon={this.state.data.forecast.currently.icon.toUpperCase().replace(/-/g, '_')} color="white" autoplay={true} /></h4>
                    <h1>{Math.round(this.state.data.forecast.currently.temperature)}&deg;</h1>
                </Col>

                {/* Future */}
                {/* 
                    The way this works, is by creating two rows of full widths,
                    which will be next to each other, essentially meaning only
                    one will be visible at one time, and to switch between them,
                    just move both to the left or right.
                */}
                {/*
                    Initial className cannot be set here as this will animate
                    exposing the second slide
                */}
                <Col
                    id="Carousel"
                    ref={this.flipRef}
                    sm="12"
                >
                    <Row className="Slider">
                        <Col sm="12">
                            <Row>
                                <Col sm="12">
                                    <h4 className="text-center">Next 5 Hours</h4>
                                    <h3 className="text-center">{this.state.data.forecast.hourly.summary}</h3>                                        
                                </Col>
                            </Row>
                            <Row>
                                <Hourly forecast={this.state.data.forecast} />
                                <Col md="1" onClick={this.flip} className="Switcher">
                                    <FaArrowRight />
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="12">
                            <Row>
                                <Col sm="12">
                                    <h4 className="text-center">Next 5 Days</h4>
                                    <h3 className="text-center">{this.state.data.forecast.daily.summary}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="1" onClick={this.flip} className="Switcher">
                                    <FaArrowLeft />
                                </Col>
                                <Daily forecast={this.state.data.forecast} />
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
    ) }  else return <div className="LOAD"></div> }
}

export default withRouter(Weather)