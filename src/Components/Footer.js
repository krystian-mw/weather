import React from 'react'

import { Col, Row } from 'react-bootstrap'

export default () => (
    <Col id="Footer">
        <Row>
            <Col sm="4" className="text-center">
                <p>Accreditations:</p>
            </Col>
            <Col sm="4" className="text-center">
                <a href="//darksky.com" style={{fontSize: `200%`}}>Dark Sky</a>
            </Col>
            <Col sm="4" className="text-center">
                <img src="/powered_by_google_on_non_white_hdpi.png" />
            </Col>
        </Row>
    </Col>
)