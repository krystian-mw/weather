import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import {
    Container,
    Row
} from 'react-bootstrap'

import NavBar from './Components/NavBar'
import Footer from './Components/Footer'

import Home from './Routes/Home'
import Location from './Routes/Location'

export default class App extends React.Component {
    render () {
        return (
            <Container>
                <Router>
                    <Row className="nav-row">
                        <NavBar />
                    </Row>
                    <Row className="action-row">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/location/:place_id" component={Location} />
                        </Switch>
                    </Row>
                    <Row>
                        <Footer />
                    </Row>
                </Router>
            </Container>
        )
    }
}