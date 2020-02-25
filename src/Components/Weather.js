import React from 'react'
import Axios from 'axios'

import { FaLocationArrow } from 'react-icons/fa'

import {
    Col,
    Row
} from 'react-bootstrap'

import Skycons from 'react-skycons'

export default class Weather extends React.Component {

    constructor (props) {
        super()
        this.state = {
            Component: <h3>Got the location, checking weather ...</h3>,
            Carousel: 'left'
        }
        this.flipRef = React.createRef()
    }

    flip = (e) => {
        if (
            !this.flipRef.current.className.includes('left')
            && !this.flipRef.current.className.includes('right')
        ) return this.flipRef.current.className += ' right'
        // There is no less time-consuming way
        if (this.flipRef.current.className.includes('left')) {
            this.flipRef.current.className = this.flipRef.current.className.replace('left', 'right')
        } else this.flipRef.current.className = this.flipRef.current.className.replace('right', 'left')        
    }

    componentDidMount () {
        Axios.get(
            `/api/forecast/${this.props.latitude},${this.props.longitude}`
        ).then(res => {
            this.setState({
                Component:
                <Row className="action-row">
                    {/* Current */}
                    <Col id="Weather" sm="12">
                        <h4><FaLocationArrow /> {this.props.city || res.data.location}</h4>
                        <h5>{res.data.forecast.currently.summary}</h5>
                        <h4><Skycons className="skycon" icon={res.data.forecast.currently.icon.toUpperCase()} color="white" autoplay={true} /></h4>
                        <h2>{Math.round(res.data.forecast.currently.temperature)}</h2>
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
                                <Row><h4>Next 5 hours</h4></Row>
                                <Row>
                                    <Col
                                        sm="1"
                                        onClick={this.flip}
                                        className="Switcher"
                                    >
                                        {'>'}
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm="12">
                                <Row><h4>Next 5 Days</h4></Row>
                                <Row>
                                    <Col
                                        sm="1"
                                        onClick={this.flip}
                                        className="Switcher"
                                    >
                                        {'<'}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            })
        })
    }

    render () { return this.state.Component }
}